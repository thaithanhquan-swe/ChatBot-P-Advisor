package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.response.AdminUserResponse;
import com.example.server.dto.response.CurrentUserResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.dto.response.UserStatisticsResponse;
import com.example.server.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping("/me")
    public ApiResponse<CurrentUserResponse> getCurrentUser() {
        return ApiResponse.<CurrentUserResponse>builder()
                .result(userService.getCurrentUser())
                .build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<AdminUserResponse>> getUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) Boolean emailVerified,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate createdFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate createdTo,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.<PageResponse<AdminUserResponse>>builder()
                .result(userService.getUsers(
                        keyword, role, emailVerified, createdFrom, createdTo,
                        sortBy, direction, page, size))
                .build();
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<UserStatisticsResponse> getStatistics() {
        return ApiResponse.<UserStatisticsResponse>builder()
                .result(userService.getStatistics())
                .build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<AdminUserResponse> getUserById(@PathVariable String id) {
        return ApiResponse.<AdminUserResponse>builder()
                .result(userService.getUserById(id))
                .build();
    }
}
