package com.example.server.dto.response;

import com.example.server.enums.ConsultationRequestStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ConsultationRequestResponse {
    String id;
    String userId;
    String chatSessionId;
    String email;
    String phone;
    String question;
    ConsultationRequestStatus status;
    String assignedStaffId;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    LocalDateTime resolvedAt;
}
