package com.example.server.dto.response;

import com.example.server.enums.FaqCategoryStatus;
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
public class FaqCategoryResponse {
    String id;
    String name;
    String description;
    FaqCategoryStatus status;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
