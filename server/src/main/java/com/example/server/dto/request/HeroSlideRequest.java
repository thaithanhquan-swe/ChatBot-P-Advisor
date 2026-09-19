package com.example.server.dto.request;

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
public class HeroSlideRequest {
    @NotBlank(message = "SYSTEM_CONFIG_SLIDE_IMAGE_INVALID")
    @Size(max = 1000, message = "SYSTEM_CONFIG_SLIDE_IMAGE_INVALID")
    String imageUrl;

    @Size(max = 100, message = "SYSTEM_CONFIG_SLIDE_TEXT_INVALID")
    String eyebrow;

    @NotBlank(message = "SYSTEM_CONFIG_SLIDE_TEXT_INVALID")
    @Size(max = 255, message = "SYSTEM_CONFIG_SLIDE_TEXT_INVALID")
    String caption;

    @NotNull(message = "SYSTEM_CONFIG_SLIDE_ORDER_INVALID")
    Integer displayOrder;
}
