package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.RoleRequest;
import com.example.server.dto.response.RoleResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoleController {
    RoleService roleService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<RoleResponse> create(@RequestBody RoleRequest request){
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<RoleResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        return ApiResponse.<PageResponse<RoleResponse>>builder()
                .result(roleService.getAll(page, size))
                .build();
    }

    @DeleteMapping("/{roleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> delete(@PathVariable String roleId){
        roleService.delete(roleId);
        return ApiResponse.<Void>builder()
                .message("Delete role successfully")
                .build();
    }


}
