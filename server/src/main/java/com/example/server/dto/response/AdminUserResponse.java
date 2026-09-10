package com.example.server.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminUserResponse {
    String id;
    String username;
    String email;
    String phone;
    boolean emailVerified;
    Set<String> roles;
    long chatSessionCount;
    Instant createdAt;
    Instant updatedAt;
}
