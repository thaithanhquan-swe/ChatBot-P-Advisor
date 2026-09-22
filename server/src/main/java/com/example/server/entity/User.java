package com.example.server.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(unique = true)
    String username;

    @Column(unique = true)
    String email;

    @Column(unique = true)
    String firebaseUid;

    String password;
    String phone;

    @Builder.Default
    @Column(nullable = false)
    boolean emailVerified = false;

    @Builder.Default
    @Column(name = "ai_chat_request_in_progress", nullable = false)
    boolean aiChatRequestInProgress = false;

    @Column(name = "ai_chat_request_lock_token", length = 64)
    String aiChatRequestLockToken;

    @Column(name = "ai_chat_request_locked_at")
    Instant aiChatRequestLockedAt;

    @Builder.Default
    @Column(name = "ai_chat_question_count", nullable = false)
    int aiChatQuestionCount = 0;

    @Column(name = "ai_chat_question_window_started_at")
    Instant aiChatQuestionWindowStartedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    Instant updatedAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    Set<Role> roles;
}

