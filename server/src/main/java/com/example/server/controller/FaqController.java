package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.FaqRequest;
import com.example.server.dto.response.FaqResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.enums.FaqStatus;
import com.example.server.service.FaqService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FaqController {
    FaqService faqService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<FaqResponse> create(@RequestBody @Valid FaqRequest request) {
        return ApiResponse.<FaqResponse>builder()
                .result(faqService.create(request))
                .build();
    }

    @GetMapping
    public ApiResponse<PageResponse<FaqResponse>> getPublished(
            @RequestParam(required = false) String faqCategoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<FaqResponse>>builder()
                .result(faqService.getPublished(faqCategoryId, page, size))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<FaqResponse> getPublishedById(@PathVariable String id) {
        return ApiResponse.<FaqResponse>builder()
                .result(faqService.getPublishedById(id))
                .build();
    }

    @GetMapping("/management")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<PageResponse<FaqResponse>> getForManagement(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) FaqStatus status,
            @RequestParam(required = false) String faqCategoryId,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate updatedFrom,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate updatedTo,

            @RequestParam(defaultValue = "updatedAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<FaqResponse>>builder()
                .result(faqService.getForManagement(
                        keyword,
                        status,
                        faqCategoryId,
                        updatedFrom,
                        updatedTo,
                        sortBy,
                        sortDirection,
                        page,
                        size))
                .build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<FaqResponse> update(
            @PathVariable String id,
            @RequestBody @Valid FaqRequest request) {
        return ApiResponse.<FaqResponse>builder()
                .result(faqService.update(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<Void> delete(@PathVariable String id) {
        faqService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Delete FAQ successfully")
                .build();
    }
}
