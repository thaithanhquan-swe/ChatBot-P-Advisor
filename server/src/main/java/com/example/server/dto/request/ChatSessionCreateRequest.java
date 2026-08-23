package com.example.server.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatSessionCreateRequest {
    @Size(max = 255, message = "CHAT_SESSION_TITLE_INVALID")
    String title;
}
