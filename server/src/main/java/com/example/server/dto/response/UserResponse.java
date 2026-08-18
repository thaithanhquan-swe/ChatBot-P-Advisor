package com.example.server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;

    String email;
    String password;
    String phone;
    Instant created_at;
    Instant updated_at;

    Set<RoleResponse> roles;
}