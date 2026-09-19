package com.example.server.configuration;

import com.example.server.websocket.AdminChatWebSocketHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final AdminChatWebSocketHandler adminChatWebSocketHandler;

    @Value("${app.config.frontend-url}")
    private String frontendUrl;

    public WebSocketConfig(
            AdminChatWebSocketHandler adminChatWebSocketHandler
    ) {
        this.adminChatWebSocketHandler = adminChatWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(adminChatWebSocketHandler, "/ws/admin-chat")
                .setAllowedOrigins(frontendUrl);
    }
}
