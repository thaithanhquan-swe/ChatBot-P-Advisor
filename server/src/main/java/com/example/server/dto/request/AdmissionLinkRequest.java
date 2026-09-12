package com.example.server.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdmissionLinkRequest {
    @NotBlank(message = "SYSTEM_CONFIG_ADMISSION_LINK_INVALID")
    @Size(max = 255, message = "SYSTEM_CONFIG_ADMISSION_LINK_INVALID")
    String title;

    @NotBlank(message = "SYSTEM_CONFIG_ADMISSION_LINK_INVALID")
    @Size(max = 1000, message = "SYSTEM_CONFIG_ADMISSION_LINK_INVALID")
    String url;

    @NotNull(message = "SYSTEM_CONFIG_SLIDE_ORDER_INVALID")
    Integer displayOrder;
}
