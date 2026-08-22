package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.DocumentCreateRequest;
import com.example.server.dto.request.DocumentUpdateRequest;
import com.example.server.dto.response.DocumentResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.enums.DocumentStatus;
import com.example.server.service.DocumentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DocumentController {
    DocumentService documentService;

    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<DocumentResponse> create(
            @RequestPart("file") MultipartFile file,
            @RequestPart("metadata") @Valid DocumentCreateRequest request) {
        return ApiResponse.<DocumentResponse>builder()
                .result(documentService.create(file, request))
                .build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    @GetMapping
    public ApiResponse<PageResponse<DocumentResponse>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) DocumentStatus status,
            @RequestParam(required = false) String fileType,
            @RequestParam(defaultValue = "updatedAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<DocumentResponse>>builder()
                .result(documentService.getAll(keyword, status, fileType, sortBy, sortDirection, page, size))
                .build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    @GetMapping("/{id}")
    public ApiResponse<DocumentResponse> getById(@PathVariable String id) {
        return ApiResponse.<DocumentResponse>builder()
                .result(documentService.getById(id))
                .build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    @PutMapping("/{id}")
    public ApiResponse<DocumentResponse> update(
            @PathVariable String id,
            @RequestBody @Valid DocumentUpdateRequest request) {
        return ApiResponse.<DocumentResponse>builder()
                .result(documentService.update(id, request))
                .build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable String id) {
        documentService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Delete document successfully")
                .build();
    }
}
