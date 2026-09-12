package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.SystemConfigRequest;
import com.example.server.dto.response.SystemConfigResponse;
import com.example.server.service.SystemConfigService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/systems-config")
@RequiredArgsConstructor
public class SystemConfigController {
    private final SystemConfigService systemConfigService;

    @GetMapping
    public ApiResponse<SystemConfigResponse> get() {
        return ApiResponse.<SystemConfigResponse>builder()
                .result(systemConfigService.getPublicConfig())
                .build();
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<SystemConfigResponse> update(@RequestBody @Valid SystemConfigRequest request) {
        return ApiResponse.<SystemConfigResponse>builder()
                .result(systemConfigService.update(request))
                .build();
    }
}
