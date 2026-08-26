package com.example.server.repository;

import com.example.server.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findAllByChatSessionIdOrderByCreatedAtAscIdAsc(String chatSessionId);
}
