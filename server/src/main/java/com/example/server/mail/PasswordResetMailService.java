package com.example.server.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class PasswordResetMailService {
    private final SimpleMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void send(String email, String username, String token, long expirationMinutes) {
        String resetUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                .path("/reset-password")
                .queryParam("token", token)
                .buildAndExpand()
                .encode()
                .toUriString();
        String content = """
                Xin chào %s,

                Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.

                Đặt lại mật khẩu tại:
                %s

                Liên kết có hiệu lực trong %d phút và chỉ sử dụng được một lần.
                Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
                """.formatted(username, resetUrl, expirationMinutes);
        mailSender.send(email, "Đặt lại mật khẩu ChatBot P-Advisor", content);
    }
}
