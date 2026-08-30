package com.example.server.mail;

import com.example.server.enums.ConsultationRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsultationRequestMailService {
    private final SimpleMailSender mailSender;

    public void sendCreated(String email, String requestId) {
        String content = """
                Xin chào,

                Chúng tôi đã nhận được yêu cầu tư vấn của bạn (mã: %s).
                Trạng thái hiện tại: Chờ tiếp nhận.

                Bộ phận tư vấn sẽ liên hệ với bạn trong thời gian sớm nhất.
                """.formatted(requestId);
        mailSender.send(email, "Đã nhận yêu cầu tư vấn - ChatBot P-Advisor", content);
    }

    public void sendStatusChanged(String email, String requestId,
                                  ConsultationRequestStatus status) {
        String statusLabel = switch (status) {
            case PENDING -> "Chờ tiếp nhận";
            case IN_PROGRESS -> "Đang xử lý";
            case RESOLVED -> "Đã xử lý";
            case CANCELLED -> "Đã hủy";
        };
        String content = """
                Xin chào,

                Yêu cầu tư vấn %s đã được cập nhật sang trạng thái: %s.

                Cảm ơn bạn đã sử dụng ChatBot P-Advisor.
                """.formatted(requestId, statusLabel);
        mailSender.send(email, "Cập nhật yêu cầu tư vấn - ChatBot P-Advisor", content);
    }
}
