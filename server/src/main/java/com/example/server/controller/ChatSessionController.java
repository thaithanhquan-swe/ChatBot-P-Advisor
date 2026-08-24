package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.ChatSessionCreateRequest;
import com.example.server.dto.response.ChatSessionResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.service.ChatSessionService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/chat-sessions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatSessionController {
    ChatSessionService chatSessionService;

    @PostMapping
    public ApiResponse<ChatSessionResponse> create(
            @RequestBody(required = false) @Valid ChatSessionCreateRequest request) {
        ChatSessionCreateRequest safeRequest = request == null ? new ChatSessionCreateRequest() : request;
        return ApiResponse.<ChatSessionResponse>builder()
                .result(chatSessionService.create(safeRequest))
                .build();
    }

    @GetMapping("/{sessionToken}")
    public ApiResponse<ChatSessionResponse> getByToken(@PathVariable String sessionToken) {
        return ApiResponse.<ChatSessionResponse>builder()
                .result(chatSessionService.getByToken(sessionToken))
                .build();
    }

    @GetMapping("/me/history")
    public ApiResponse<PageResponse<ChatSessionResponse>> getCurrentUserHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.<PageResponse<ChatSessionResponse>>builder()
                .result(chatSessionService.getCurrentUserHistory(page, size))
                .build();
    }

    @PostMapping("/{sessionToken}/attach")
    public ApiResponse<ChatSessionResponse> attach(@PathVariable String sessionToken) {
        return ApiResponse.<ChatSessionResponse>builder()
                .result(chatSessionService.attachGuestSession(sessionToken))
                .build();
    }

    @PostMapping("/{sessionToken}/questions")
    public ApiResponse<ChatSessionResponse> consumeQuestion(@PathVariable String sessionToken) {
        return ApiResponse.<ChatSessionResponse>builder()
                .result(chatSessionService.consumeQuestion(sessionToken))
                .build();
    }

    @PostMapping("/{sessionToken}/request-staff")
    public ApiResponse<ChatSessionResponse> requestStaff(@PathVariable String sessionToken) {
        return ApiResponse.<ChatSessionResponse>builder()
                .result(chatSessionService.requestStaff(sessionToken))
                .build();
    }

    @GetMapping("/staff/waiting")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<PageResponse<ChatSessionResponse>> getWaitingForStaff(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.<PageResponse<ChatSessionResponse>>builder()
                .result(chatSessionService.getWaitingForStaff(page, size))
                .build();
    }

    @GetMapping("/staff/assigned-to-me")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<PageResponse<ChatSessionResponse>> getAssignedToMe(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.<PageResponse<ChatSessionResponse>>builder()
                .result(chatSessionService.getAssignedToCurrentStaff(page, size))
                .build();
    }

    @PostMapping("/staff/{sessionId}/assign")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<ChatSessionResponse> assign(@PathVariable String sessionId) {
        return ApiResponse.<ChatSessionResponse>builder()
                .result(chatSessionService.assignToCurrentStaff(sessionId))
                .build();
    }

    @PostMapping("/staff/{sessionId}/return-to-bot")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<ChatSessionResponse> returnToBot(@PathVariable String sessionId) {
        return ApiResponse.<ChatSessionResponse>builder()
                .result(chatSessionService.returnToBot(sessionId))
                .build();
    }

    @DeleteMapping("/{sessionToken}")
    public ApiResponse<Void> delete(@PathVariable String sessionToken) {
        chatSessionService.delete(sessionToken);
        return ApiResponse.<Void>builder().message("Delete chat session successfully").build();
    }
}
