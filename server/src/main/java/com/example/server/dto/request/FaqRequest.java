package com.example.server.dto.request;

import com.example.server.enums.FaqStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class FaqRequest {
    @NotBlank(message = "FAQ_QUESTION_INVALID")
    @Size(max = 500, message = "FAQ_QUESTION_INVALID")
    String question;

    @NotBlank(message = "FAQ_ANSWER_INVALID")
    String answer;

    FaqStatus status;

    @NotNull(message = "FAQ_CATEGORY_REQUIRED")
    String faqCategoryId;
}
