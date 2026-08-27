package com.example.server.service;

import com.example.server.dto.request.DocumentCreateRequest;
import com.example.server.dto.request.DocumentUpdateRequest;
import com.example.server.dto.response.DocumentResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.entity.Document;
import com.example.server.entity.User;
import com.example.server.enums.DocumentStatus;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.mapper.DocumentMapper;
import com.example.server.repository.DocumentRepository;
import com.example.server.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DocumentService {
    DocumentRepository documentRepository;
    UserRepository userRepository;
    DocumentMapper documentMapper;
    KnowledgeRetrievalService knowledgeRetrievalService;

    @NonFinal
    Path storageRoot;

    @NonFinal
    @Value("${app.config.context-path}")
    String contextPath;

    @NonFinal
    @Value("${app.document.storage-location}")
    String storageLocation;

    @PostConstruct
    void initializeStorageRoot() {
        this.storageRoot = Path.of(storageLocation).toAbsolutePath().normalize();
    }

    @Transactional
    public DocumentResponse create(MultipartFile file, DocumentCreateRequest request) {
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.DOCUMENT_FILE_REQUIRED);
        }

        String originalName = sanitizeOriginalName(file.getOriginalFilename());
        String storedName = UUID.randomUUID() + "-" + originalName;
        Path target = resolveStoragePath(storedName);

        try {
            Files.createDirectories(storageRoot);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, target, StandardCopyOption.REPLACE_EXISTING);
            }

            Document document = Document.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .fileName(originalName)
                    .fileUrl(contextPath + "/uploads/documents/" + storedName)
                    .fileType(resolveContentType(file))
                    .fileSize(file.getSize())
                    .status(request.getStatus() == null ? DocumentStatus.DRAFT : request.getStatus())
                    .uploadedBy(getCurrentUser())
                    .build();

            document = documentRepository.save(document);
            knowledgeRetrievalService.indexDocument(document);
            return documentMapper.toDocumentResponse(document);
        } catch (IOException exception) {
            deleteQuietly(target);
            throw new AppException(ErrorCode.DOCUMENT_STORAGE_ERROR);
        } catch (RuntimeException exception) {
            deleteQuietly(target);
            throw exception;
        }
    }

    @Transactional(readOnly = true)
    public PageResponse<DocumentResponse> getAll(
            String keyword,
            DocumentStatus status,
            String fileType,
            String sortBy,
            Sort.Direction sortDirection,
            int page,
            int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, resolveSortField(sortBy)));
        Specification<Document> specification = (root, query, builder) -> builder.conjunction();

        if (keyword != null && !keyword.isBlank()) {
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            specification = specification.and((root, query, builder) -> builder.or(
                    builder.like(builder.lower(root.get("title")), pattern),
                    builder.like(builder.lower(root.get("description")), pattern),
                    builder.like(builder.lower(root.get("fileName")), pattern)));
        }
        if (status != null) {
            specification = specification.and((root, query, builder) -> builder.equal(root.get("status"), status));
        }
        if (fileType != null && !fileType.isBlank()) {
            specification = specification.and((root, query, builder) ->
                    builder.equal(builder.lower(root.get("fileType")), fileType.trim().toLowerCase()));
        }

        Page<Document> documents = documentRepository.findAll(specification, pageable);
        return PageResponse.of(documents.map(documentMapper::toDocumentResponse));
    }

    @Transactional(readOnly = true)
    public DocumentResponse getById(String id) {
        return documentMapper.toDocumentResponse(findById(id));
    }

    @Transactional
    public DocumentResponse update(String id, DocumentUpdateRequest request) {
        Document document = findById(id);
        documentMapper.updateDocument(document, request);
        return documentMapper.toDocumentResponse(documentRepository.save(document));
    }

    @Transactional
    public void delete(String id) {
        Document document = findById(id);
        Path filePath = resolveStoragePath(extractStoredName(document.getFileUrl()));

        try {
            Files.deleteIfExists(filePath);
            documentRepository.delete(document);
        } catch (IOException exception) {
            throw new AppException(ErrorCode.DOCUMENT_STORAGE_ERROR);
        }
    }

    private Document findById(String id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DOCUMENT_NOT_FOUND));
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    private Path resolveStoragePath(String storedName) {
        Path resolved = storageRoot.resolve(storedName).normalize();
        if (!resolved.startsWith(storageRoot)) {
            throw new AppException(ErrorCode.DOCUMENT_STORAGE_ERROR);
        }
        return resolved;
    }

    private String sanitizeOriginalName(String originalName) {
        if (originalName == null || originalName.isBlank()) {
            return "document";
        }
        String fileName = originalName.replace('\\', '/');
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        fileName = fileName.replaceAll("[^a-zA-Z0-9._-]", "_");
        return fileName.isBlank() ? "document" : fileName;
    }

    private String resolveContentType(MultipartFile file) {
        return file.getContentType() == null || file.getContentType().isBlank()
                ? "application/octet-stream"
                : file.getContentType();
    }

    private String extractStoredName(String fileUrl) {
        int separator = fileUrl.lastIndexOf('/');
        return separator >= 0 ? fileUrl.substring(separator + 1) : fileUrl;
    }

    private String resolveSortField(String sortBy) {
        return switch (sortBy) {
            case "title", "fileName", "fileType", "fileSize", "status", "createdAt", "updatedAt" -> sortBy;
            default -> "updatedAt";
        };
    }

    private void deleteQuietly(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException ignored) {
            // Preserve the original exception; orphan cleanup can be handled separately.
        }
    }
}
