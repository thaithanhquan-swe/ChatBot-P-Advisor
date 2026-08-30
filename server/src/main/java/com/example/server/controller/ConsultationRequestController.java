package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.ConsultationRequestCreateRequest;
import com.example.server.dto.response.ConsultationRequestResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.enums.ConsultationRequestStatus;
import com.example.server.service.ConsultationRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/consultation-requests")
@RequiredArgsConstructor
public class ConsultationRequestController {
    private final ConsultationRequestService consultationRequestService;

    @PostMapping
    public ApiResponse<ConsultationRequestResponse> create(
            @RequestBody @Valid ConsultationRequestCreateRequest request) {
        return ApiResponse.<ConsultationRequestResponse>builder()
                .message("Consultation request submitted successfully")
                .result(consultationRequestService.create(request))
                .build();
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<PageResponse<ConsultationRequestResponse>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) ConsultationRequestStatus status,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate createdFrom,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate createdTo,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<ConsultationRequestResponse>>builder()
                .result(consultationRequestService.getAll(
                        keyword,
                        status,
                        createdFrom,
                        createdTo,
                        sortBy,
                        sortDirection,
                        page,
                        size))
                .build();
    }

    @PostMapping("/{id}/assign")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<ConsultationRequestResponse> assign(@PathVariable String id) {
        return ApiResponse.<ConsultationRequestResponse>builder()
                .message("Consultation request assigned successfully")
                .result(consultationRequestService.assign(id))
                .build();
    }

    @PostMapping("/{id}/resolve")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<ConsultationRequestResponse> resolve(@PathVariable String id) {
        return ApiResponse.<ConsultationRequestResponse>builder()
                .message("Consultation request resolved successfully")
                .result(consultationRequestService.resolve(id))
                .build();
    }
}
