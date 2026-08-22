package com.example.server.dto.response;

import com.example.server.enums.DocumentStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DocumentResponse {
    String id;
    String title;
    String description;
    String fileName;
    String fileUrl;
    String fileType;
    Long fileSize;
    DocumentStatus status;
    String uploadedBy;
    String uploaderUsername;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
