package com.example.server.service;

import com.example.server.dto.response.ChatExchangeResponse;
import com.example.server.dto.response.ChatMessageResponse;
import com.example.server.enums.ChatMessageSender;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.extern.slf4j.Slf4j;
import lombok.experimental.FieldDefaults;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatAiService {
    static int MAX_HISTORY_MESSAGES = 20;
    static String SYSTEM_PROMPT = """
            Bạn là trợ lý tư vấn tuyển sinh của ChatBot P-Advisor. Hãy trả lời bằng tiếng Việt, rõ ràng và chính xác.
            Nếu không đủ dữ liệu để khẳng định, hãy nói rõ điều đó và đề nghị người dùng
            liên hệ advisor thay vì tự bịa thông tin.
            """;

    ChatMessageService chatMessageService;
    ChatClient chatClient;

    public ChatAiService(ChatMessageService chatMessageService, ChatClient.Builder chatClientBuilder) {
        this.chatMessageService = chatMessageService;
        this.chatClient = chatClientBuilder.build();
    }

    public ChatExchangeResponse chat(String sessionToken, String content, MultipartFile file) {
        MultipartFile image = file == null || file.isEmpty() ? null : file;
        ChatMessageResponse userMessage = chatMessageService.sendUserMessage(sessionToken, content, image);

        return reply(sessionToken, userMessage, image);
    }

    private ChatExchangeResponse reply(
            String sessionToken,
            ChatMessageResponse userMessage,
            MultipartFile image) {

        if (!chatMessageService.isBotHandling(sessionToken)) {
            return ChatExchangeResponse.builder()
                    .userMessage(userMessage)
                    .build();
        }

        try {
            List<ChatMessageResponse> messages = chatMessageService.getMessages(sessionToken);
            String conversation = buildConversation(messages);
            String answer;
            if (image == null) {
                answer = chatClient.prompt()
                        .system(SYSTEM_PROMPT)
                        .user(conversation)
                        .call()
                        .content();
            } else {
                MimeType mimeType = MimeTypeUtils.parseMimeType(image.getContentType());
                answer = chatClient.prompt()
                        .system(SYSTEM_PROMPT)
                        .user(user -> user
                                .text(conversation)
                                .media(mimeType, image.getResource()))
                        .call()
                        .content();
            }

            ChatMessageResponse botMessage = chatMessageService.saveBotMessage(sessionToken, answer);
            return ChatExchangeResponse.builder()
                    .userMessage(userMessage)
                    .botMessage(botMessage)
                    .build();
        } catch (AppException exception) {
            throw exception;
        } catch (Exception exception) {
            log.error("Spring AI request failed for chat session {}", userMessage.getChatSessionId(), exception);
            chatMessageService.saveSystemMessage(
                    sessionToken,
                    "Không thể kết nối trợ lý AI lúc này. Vui lòng thử lại sau.");
            throw new AppException(ErrorCode.AI_SERVICE_UNAVAILABLE);
        }
    }

    private String buildConversation(List<ChatMessageResponse> messages) {
        int fromIndex = Math.max(0, messages.size() - MAX_HISTORY_MESSAGES);
        StringBuilder conversation = new StringBuilder("Lịch sử hội thoại:\n");
        for (ChatMessageResponse message : messages.subList(fromIndex, messages.size())) {
            if (message.getSender() == ChatMessageSender.USER
                    || message.getSender() == ChatMessageSender.GUEST) {
                conversation.append("Người dùng: ");
            } else if (message.getSender() == ChatMessageSender.STAFF) {
                conversation.append("Advisor: ");
            } else {
                conversation.append("Trợ lý: ");
            }
            if (message.getMessageType() == com.example.server.enums.ChatMessageType.FILE) {
                conversation.append(message.getContent())
                        .append(" [Tệp đính kèm: ")
                        .append(message.getFileName())
                        .append("]\n");
            } else {
                conversation.append(message.getContent()).append('\n');
            }
        }
        conversation.append("\nHãy trả lời tin nhắn cuối cùng của người dùng.");
        return conversation.toString();
    }
}
