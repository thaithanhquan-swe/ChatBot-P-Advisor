package com.example.server.dto.response;

import com.example.server.enums.ChatSessionStatus;
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
    ChatSessionStatus status;
    String assignedStaffId;
    LocalDateTime assignedAt;
    int guestQuestionCount;
    int remainingGuestQuestions;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
