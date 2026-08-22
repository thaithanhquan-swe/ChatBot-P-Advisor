package com.example.server.dto.request;

import com.example.server.enums.DocumentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DocumentCreateRequest {
    @NotBlank(message = "DOCUMENT_TITLE_INVALID")
    @Size(max = 255, message = "DOCUMENT_TITLE_INVALID")
    String title;

    String description;

    DocumentStatus status;
}
