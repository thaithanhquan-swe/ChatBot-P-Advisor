package com.example.server.controller;

import com.example.server.dto.ApiResponse;
import com.example.server.dto.request.ChatMessageRequest;
import com.example.server.dto.response.ChatExchangeResponse;
import com.example.server.dto.response.ChatMessageResponse;
import com.example.server.service.ChatMessageService;
import com.example.server.service.ChatAiService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/chat-messages")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatMessageController {
    ChatMessageService chatMessageService;
    ChatAiService chatAiService;

    @PostMapping(value = "/{sessionToken}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ChatExchangeResponse> sendUserMessage(
            @PathVariable String sessionToken,
            @RequestPart("content") String content,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return ApiResponse.<ChatExchangeResponse>builder()
                .result(chatAiService.chat(sessionToken, content, file))
                .build();
    }

    @GetMapping("/{sessionToken}")
    public ApiResponse<List<ChatMessageResponse>> getMessages(@PathVariable String sessionToken) {
        return ApiResponse.<List<ChatMessageResponse>>builder()
                .result(chatMessageService.getMessages(sessionToken))
                .build();
    }

    @PostMapping("/staff/{sessionId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ApiResponse<ChatMessageResponse> sendStaffMessage(
            @PathVariable String sessionId,
            @RequestBody @Valid ChatMessageRequest request) {
        return ApiResponse.<ChatMessageResponse>builder()
                .result(chatMessageService.sendStaffMessage(sessionId, request.getContent()))
                .build();
    }
}
