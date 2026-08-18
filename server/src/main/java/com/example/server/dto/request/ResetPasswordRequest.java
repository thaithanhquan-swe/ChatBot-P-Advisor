package com.example.server.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotBlank(message = "INVALID_RESET_TOKEN")
    private String token;

    @NotBlank(message = "PASSWORD_INVALID")
    @Size(min = 8, message = "PASSWORD_INVALID")
    private String newPassword;
}
