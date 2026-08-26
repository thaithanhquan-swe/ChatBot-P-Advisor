package com.example.server.entity;

import com.example.server.enums.ChatMessageSender;
import com.example.server.enums.ChatMessageType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(
        name = "chat_messages",
        indexes = @Index(
                name = "idx_chat_messages_session_created",
                columnList = "chat_session_id, created_at"
        )
)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chat_session_id", nullable = false)
    ChatSession chatSession;

    @Column(name = "sender_id")
    String senderId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    ChatMessageSender sender;

    @Enumerated(EnumType.STRING)
    @Column(name = "message_type", nullable = false, length = 16)
    ChatMessageType messageType;

    @Column(nullable = false, columnDefinition = "TEXT")
    String content;

    @Column(name = "file_name", length = 255)
    String fileName;

    @Column(name = "file_url", length = 1000)
    String fileUrl;

    @Column(name = "file_type", length = 255)
    String fileType;

    @Column(name = "file_size")
    Long fileSize;

    @Column(name = "confidence_score", precision = 5, scale = 4)
    BigDecimal confidenceScore;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;
}
