package com.example.server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CurrentUserResponse {
    String id;
    String username;
    String email;
    String phone;
    Set<RoleResponse> roles;
}
