package com.example.server.mail;

import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendVerificationEmail(String email, String username, String token, long expirationMinutes) {
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
        send(email, "Xác thực email ChatBot P-Advisor", content);
    }

    public void sendResetPasswordEmail(String email, String username, String token, long expirationMinutes) {
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

        send(email, "Đặt lại mật khẩu ChatBot P-Advisor", content);
    }

    private void send(String email, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(email);
            message.setSubject(subject);
            message.setText(content);
            mailSender.send(message);
        } catch (MailException exception) {
            throw new AppException(ErrorCode.EMAIL_SEND_FAILED);
        }
    }
}
