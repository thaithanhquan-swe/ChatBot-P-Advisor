package com.example.server.repository;

import com.example.server.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findAllByChatSessionIdOrderByCreatedAtAscIdAsc(String chatSessionId);

    @Query("""
            select message.fileUrl from ChatMessage message
            where message.chatSession.id = :sessionId
              and message.fileUrl is not null
            """)
    List<String> findFileUrlsBySessionId(@Param("sessionId") String sessionId);

    @Modifying(flushAutomatically = true)
    @Query("delete from ChatMessage message where message.chatSession.id = :sessionId")
    int deleteAllBySessionId(@Param("sessionId") String sessionId);
}
