package com.example.server.dto.response;

import com.example.server.enums.FaqStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FaqResponse {
    String id;
    String question;
    String answer;
    FaqStatus status;
    String faqCategoryId;
    String categoryName;
    String createdBy;
    String creatorUsername;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
