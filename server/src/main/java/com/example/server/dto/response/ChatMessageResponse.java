package com.example.server.dto.response;

import com.example.server.enums.ChatMessageSender;
import com.example.server.enums.ChatMessageType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatMessageResponse {
    String id;
    String chatSessionId;
    String senderId;
    ChatMessageSender sender;
    ChatMessageType messageType;
    String content;
    String fileName;
    String fileUrl;
    String fileType;
    Long fileSize;
    BigDecimal confidenceScore;
    LocalDateTime createdAt;
}
