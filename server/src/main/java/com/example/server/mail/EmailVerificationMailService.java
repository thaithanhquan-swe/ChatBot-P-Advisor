package com.example.server.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class EmailVerificationMailService {
    private final SimpleMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void send(String email, String username, String token, long expirationMinutes) {
        String verificationUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                .path("/verify-email")
                .queryParam("token", token)
                .build().encode().toUriString();
        String content = """
                Xin chào %s,

                Cảm ơn bạn đã đăng ký ChatBot P-Advisor.
                Vui lòng xác thực email bằng liên kết sau:
                %s

                Liên kết có hiệu lực trong %d phút.
                """.formatted(username, verificationUrl, expirationMinutes);
        mailSender.send(email, "Xác thực email ChatBot P-Advisor", content);
    }
}
