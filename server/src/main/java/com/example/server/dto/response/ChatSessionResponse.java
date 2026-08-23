package com.example.server.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatSessionResponse {
    String id;
    String sessionToken;
    String userId;
    String title;
    int guestQuestionCount;
    int remainingGuestQuestions;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
