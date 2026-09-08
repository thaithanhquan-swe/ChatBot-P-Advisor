package com.example.server.websocket;

import com.example.server.configuration.CustomJwtDecoder;
import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminChatWebSocketHandler extends TextWebSocketHandler {
    static int SEND_TIMEOUT_MILLIS = 5_000;
    static int BUFFER_SIZE_LIMIT = 64 * 1024;

    CustomJwtDecoder jwtDecoder;
    UserRepository userRepository;
    ObjectMapper objectMapper = new ObjectMapper();
    Map<String, WebSocketSession> authenticatedSessions = new ConcurrentHashMap<>();

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (authenticatedSessions.containsKey(session.getId())) {
            return;
        }

        JsonNode payload = objectMapper.readTree(message.getPayload());
        if (!"AUTHENTICATE".equals(payload.path("type").asText())) {
            session.close(CloseStatus.POLICY_VIOLATION.withReason("Authentication required"));
            return;
        }

        authenticate(session, payload.path("token").asText());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        authenticatedSessions.remove(session.getId());
        if (session.isOpen()) {
            session.close(CloseStatus.SERVER_ERROR);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        authenticatedSessions.remove(session.getId());
    }

    public void publishAfterCommit(String type, String sessionId) {
        ChatRealtimeEvent event = new ChatRealtimeEvent(type, sessionId);
        if (TransactionSynchronizationManager.isActualTransactionActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    publish(event);
                }
            });
            return;
        }
        publish(event);
    }

    private void authenticate(WebSocketSession session, String token) throws IOException {
        try {
            String username = jwtDecoder.decode(token).getSubject();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new JwtException("User not found"));
            boolean staff = user.getRoles().stream()
                    .anyMatch(role -> "ADMIN".equals(role.getName())
                            || "ADVISOR".equals(role.getName()));
            if (!staff) {
                session.close(CloseStatus.NOT_ACCEPTABLE.withReason("Staff role required"));
                return;
            }

            WebSocketSession safeSession = new ConcurrentWebSocketSessionDecorator(
                    session,
                    SEND_TIMEOUT_MILLIS,
                    BUFFER_SIZE_LIMIT);
            authenticatedSessions.put(session.getId(), safeSession);
            safeSession.sendMessage(new TextMessage("{\"type\":\"AUTHENTICATED\"}"));
        } catch (JwtException exception) {
            session.close(CloseStatus.POLICY_VIOLATION.withReason("Invalid access token"));
        }
    }

    private void publish(ChatRealtimeEvent event) {
        final String payload;
        try {
            payload = objectMapper.writeValueAsString(event);
        } catch (IOException exception) {
            return;
        }

        authenticatedSessions.forEach((id, session) -> {
            try {
                if (!session.isOpen()) {
                    authenticatedSessions.remove(id);
                    return;
                }
                session.sendMessage(new TextMessage(payload));
            } catch (IOException | IllegalStateException exception) {
                authenticatedSessions.remove(id);
                try {
                    session.close(CloseStatus.SERVER_ERROR);
                } catch (IOException ignored) {
                    // Connection is already unusable.
                }
            }
        });
    }
}
