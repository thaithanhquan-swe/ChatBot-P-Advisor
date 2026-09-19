package com.example.server.mail;

import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SimpleMailSender {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String from;

    public void send(String email, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(email);
            message.setSubject(subject);
            message.setText(content);
            javaMailSender.send(message);
        } catch (MailException exception) {
            throw new AppException(ErrorCode.EMAIL_SEND_FAILED);
        }
    }
}
