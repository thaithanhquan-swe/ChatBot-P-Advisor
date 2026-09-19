package com.example.server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    public StoredFile store(MultipartFile file, String storageLocation, String publicUrlPrefix)
            throws IOException {
        Path storageRoot = resolveStorageRoot(storageLocation);
        String originalName = sanitizeOriginalName(file.getOriginalFilename());
        String storedName = UUID.randomUUID() + "-" + originalName;
        Path target = resolve(storageRoot, storedName);

        try {
            Files.createDirectories(storageRoot);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, target, StandardCopyOption.REPLACE_EXISTING);
            }
            String normalizedPrefix = publicUrlPrefix.endsWith("/")
                    ? publicUrlPrefix.substring(0, publicUrlPrefix.length() - 1)
                    : publicUrlPrefix;
            return new StoredFile(
                    originalName,
                    storedName,
                    normalizedPrefix + "/" + storedName,
                    resolveContentType(file),
                    file.getSize());
        } catch (IOException | RuntimeException exception) {
            deleteQuietly(target);
            throw exception;
        }
    }

    public void delete(String storageLocation, String fileUrl) throws IOException {
        if (fileUrl == null || fileUrl.isBlank()) {
            return;
        }
        Path root = resolveStorageRoot(storageLocation);
        Files.deleteIfExists(resolve(root, extractStoredName(fileUrl)));
    }

    public void deleteQuietly(String storageLocation, String fileUrl) {
        try {
            delete(storageLocation, fileUrl);
        } catch (IOException ignored) {
            // Cleanup must not hide the original persistence or storage error.
        }
    }

    public Path resolveStorageRoot(String storageLocation) {
        Path configuredPath = Path.of(storageLocation);
        if (configuredPath.isAbsolute()) {
            return configuredPath.normalize();
        }

        Path workingDirectory = Path.of("").toAbsolutePath().normalize();
        if (workingDirectory.getFileName() != null
                && "server".equalsIgnoreCase(workingDirectory.getFileName().toString())
                && Files.exists(workingDirectory.resolve("pom.xml"))
                && workingDirectory.getParent() != null) {
            return workingDirectory.getParent().resolve(configuredPath).normalize();
        }
        return workingDirectory.resolve(configuredPath).normalize();
    }

    private Path resolve(Path storageRoot, String storedName) {
        Path resolved = storageRoot.resolve(storedName).normalize();
        if (!resolved.startsWith(storageRoot)) {
            throw new IllegalArgumentException("Invalid storage path");
        }
        return resolved;
    }

    private String sanitizeOriginalName(String originalName) {
        if (originalName == null || originalName.isBlank()) {
            return "file";
        }
        String fileName = originalName.replace('\\', '/');
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        fileName = fileName.replaceAll("[^a-zA-Z0-9._-]", "_");
        return fileName.isBlank() ? "file" : fileName;
    }

    private String resolveContentType(MultipartFile file) {
        return file.getContentType() == null || file.getContentType().isBlank()
                ? "application/octet-stream"
                : file.getContentType();
    }

    private String extractStoredName(String fileUrl) {
        String normalized = fileUrl.replace('\\', '/');
        return normalized.substring(normalized.lastIndexOf('/') + 1);
    }

    private void deleteQuietly(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException ignored) {
            // Preserve the original exception.
        }
    }

    public record StoredFile(
            String originalName,
            String storedName,
            String publicUrl,
            String contentType,
            long size) {
    }
}
