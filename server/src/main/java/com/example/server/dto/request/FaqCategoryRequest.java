package com.example.server.dto.request;

import com.example.server.enums.FaqCategoryStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FaqCategoryRequest {
    @NotBlank(message = "FAQ_CATEGORY_NAME_INVALID")
    @Size(max = 100, message = "FAQ_CATEGORY_NAME_INVALID")
    String name;

    @Size(max = 255, message = "FAQ_CATEGORY_DESCRIPTION_INVALID")
    String description;

    FaqCategoryStatus status;
}
