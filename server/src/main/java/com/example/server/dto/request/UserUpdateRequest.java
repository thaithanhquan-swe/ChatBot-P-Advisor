package com.example.server.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    @Size(min = 5, message = "USERNAME_INVALID")
    String username;

    @Email(message = "EMAIL_INVALID")
    String email;

    @Size(min = 5, message = "PASSWORD_INVALID")
    String password;

    @Size(min = 5, message = "PHONE_INVALID")
    String phone;
    List<String> roles;
}