package com.example.server.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ConsultationRequestCreateRequest {
    String chatSessionId;

    @Email(message = "EMAIL_INVALID")
    @Size(max = 255, message = "EMAIL_INVALID")
    String email;

    @Pattern(regexp = "^(?:\\+?84|0)[35789][0-9]{8}$", message = "PHONE_INVALID")
    String phone;

    @NotBlank(message = "CONSULTATION_QUESTION_INVALID")
    String question;
}
