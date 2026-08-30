package com.example.server.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FirebaseAuthenticationRequest {
    @NotBlank(message = "FIREBASE_AUTH_FAILED")
    private String idToken;
}
