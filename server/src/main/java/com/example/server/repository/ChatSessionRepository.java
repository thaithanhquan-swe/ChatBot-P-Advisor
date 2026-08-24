package com.example.server.repository;

import com.example.server.entity.ChatSession;
import com.example.server.enums.ChatSessionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.time.LocalDateTime;
import jakarta.persistence.LockModeType;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, String> {
    Optional<ChatSession> findBySessionToken(String sessionToken);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select session from ChatSession session where session.sessionToken = :sessionToken")
    Optional<ChatSession> findBySessionTokenForUpdate(@Param("sessionToken") String sessionToken);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select session from ChatSession session where session.id = :id")
    Optional<ChatSession> findByIdForUpdate(@Param("id") String id);

    Page<ChatSession> findAllByUserId(String userId, Pageable pageable);

    Page<ChatSession> findAllByStatus(ChatSessionStatus status, Pageable pageable);

    Page<ChatSession> findAllByAssignedStaffId(String assignedStaffId, Pageable pageable);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
            update ChatSession session
            set session.guestQuestionCount = session.guestQuestionCount + 1,
                session.updatedAt = CURRENT_TIMESTAMP
            where session.sessionToken = :sessionToken
              and session.user is null
              and session.guestQuestionCount < :limit
            """)
    int consumeGuestQuestion(@Param("sessionToken") String sessionToken, @Param("limit") int limit);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
            delete from ChatSession session
            where session.user is null
              and session.updatedAt < :expiredBefore
            """)
    int deleteExpiredGuestSessions(@Param("expiredBefore") LocalDateTime expiredBefore);
}
