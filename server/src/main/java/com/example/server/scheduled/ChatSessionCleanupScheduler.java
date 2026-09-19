package com.example.server.scheduled;

import com.example.server.repository.ChatSessionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatSessionCleanupScheduler {
    final ChatSessionRepository chatSessionRepository;

    @Value("${app.chat-session.guest-expiration-hours}")
    int guestExpirationHours;

    @Scheduled(cron = "${app.chat-session.cleanup-cron}")
    @Transactional
    public void deleteExpiredGuestSessions() {
        LocalDateTime expiredBefore = LocalDateTime.now().minusHours(guestExpirationHours);
        int deletedCount = chatSessionRepository.deleteExpiredGuestSessions(expiredBefore);

        if (deletedCount > 0) {
            log.info("Deleted {} guest chat sessions inactive since before {}", deletedCount, expiredBefore);
        }
    }
}
