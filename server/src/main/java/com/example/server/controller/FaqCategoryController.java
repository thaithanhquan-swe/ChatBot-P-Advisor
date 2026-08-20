package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.FaqCategoryRequest;
import com.example.server.dto.response.FaqCategoryResponse;
import com.example.server.service.FaqCategoryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/faq-categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FaqCategoryController {
    FaqCategoryService faqCategoryService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<FaqCategoryResponse> create(@RequestBody @Valid FaqCategoryRequest request) {
        return ApiResponse.<FaqCategoryResponse>builder()
                .result(faqCategoryService.create(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<FaqCategoryResponse>> getAll() {
        return ApiResponse.<List<FaqCategoryResponse>>builder()
                .result(faqCategoryService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<FaqCategoryResponse> getById(@PathVariable String id) {
        return ApiResponse.<FaqCategoryResponse>builder()
                .result(faqCategoryService.getById(id))
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<FaqCategoryResponse> update(
            @PathVariable String id,
            @RequestBody @Valid FaqCategoryRequest request) {
        return ApiResponse.<FaqCategoryResponse>builder()
                .result(faqCategoryService.update(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<Void> delete(@PathVariable String id) {
        faqCategoryService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Delete FAQ category successfully")
                .build();
    }
}
