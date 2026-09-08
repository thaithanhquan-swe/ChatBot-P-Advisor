package com.example.server.service;

import com.example.server.dto.response.ChatMessageResponse;
import com.example.server.entity.ChatMessage;
import com.example.server.entity.ChatSession;
import com.example.server.entity.User;
import com.example.server.enums.ChatMessageSender;
import com.example.server.enums.ChatMessageType;
import com.example.server.enums.ChatSessionStatus;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.repository.ChatMessageRepository;
import com.example.server.repository.ChatSessionRepository;
import com.example.server.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatMessageService {
    static int GUEST_QUESTION_LIMIT = 2;

    ChatMessageRepository chatMessageRepository;
    ChatSessionRepository chatSessionRepository;
    UserRepository userRepository;
    FileStorageService fileStorageService;

    @NonFinal
    @Value("${app.config.context-path}")
    String contextPath;

    @NonFinal
    @Value("${app.chat-message.storage-location}")
    String storageLocation;

    @Transactional
    public ChatMessageResponse sendUserMessage(String sessionToken, String content, MultipartFile file) {
        String normalizedContent = normalizeContent(content);
        if (file != null && !file.isEmpty()) {
            if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
                throw new AppException(ErrorCode.CHAT_MESSAGE_IMAGE_INVALID);
            }
        }
        UserMessageContext messageContext = validateUserMessage(sessionToken);
        if (file != null && !file.isEmpty()) {
            return saveMessageWithFile(
                    messageContext.session(),
                    messageContext.senderId(),
                    messageContext.sender(),
                    normalizedContent,
                    file);
        }

        return saveMessage(messageContext.session(), messageContext.senderId(), messageContext.sender(),
                ChatMessageType.TEXT, normalizedContent);
    }

    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ChatMessageResponse sendStaffMessage(String sessionId, String content, MultipartFile file) {
        User staff = requireCurrentUser();
        ChatSession session = chatSessionRepository.findByIdForUpdate(sessionId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
        if (session.getStatus() != ChatSessionStatus.STAFF_HANDLING) {
            throw new AppException(ErrorCode.INVALID_CHAT_SESSION_STATUS);
        }
        if (session.getAssignedStaff() == null
                || !session.getAssignedStaff().getId().equals(staff.getId())) {
            throw new AppException(ErrorCode.CHAT_SESSION_NOT_ASSIGNED_TO_YOU);
        }
        String normalizedContent = normalizeContentOrFile(content, file);
        if (file != null && !file.isEmpty()) {
            return saveMessageWithFile(
                    session,
                    staff.getId(),
                    ChatMessageSender.STAFF,
                    normalizedContent,
                    file);
        }
        return saveMessage(session, staff.getId(), ChatMessageSender.STAFF,
                ChatMessageType.TEXT, normalizedContent);
    }

    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getMessages(String sessionToken) {
        ChatSession session = findByToken(sessionToken);
        validateReadAccess(session);
        return chatMessageRepository.findAllByChatSessionIdOrderByCreatedAtAscIdAsc(session.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void deleteBySession(String sessionId) {
        List<String> fileUrls = chatMessageRepository.findFileUrlsBySessionId(sessionId);
        chatMessageRepository.deleteAllBySessionId(sessionId);
        fileUrls.stream()
                .filter(fileUrl -> !fileUrl.isBlank())
                .forEach(fileUrl -> fileStorageService.deleteQuietly(storageLocation, fileUrl));
    }

    @Transactional(readOnly = true)
    public boolean isBotHandling(String sessionToken) {
        ChatSession session = findByToken(sessionToken);
        validateReadAccess(session);
        return session.getStatus() == ChatSessionStatus.BOT_HANDLING;
    }

    @Transactional
    public ChatMessageResponse saveBotMessage(String sessionToken, String content) {
        ChatSession session = findByTokenForUpdate(sessionToken);
        return saveMessage(session, null, ChatMessageSender.BOT, ChatMessageType.TEXT,
                normalizeContent(content));
    }

    @Transactional
    public ChatMessageResponse saveSystemMessage(String sessionToken, String content) {
        ChatSession session = findByTokenForUpdate(sessionToken);
        return saveMessage(session, null, ChatMessageSender.BOT, ChatMessageType.SYSTEM,
                normalizeContent(content));
    }

    private ChatMessageResponse saveMessage(ChatSession session, String senderId,
                                            ChatMessageSender sender, ChatMessageType messageType,
                                            String content) {
        ChatMessage message = ChatMessage.builder()
                .chatSession(session)
                .senderId(senderId)
                .sender(sender)
                .messageType(messageType)
                .content(content)
                .build();
        session.setUpdatedAt(LocalDateTime.now());
        chatSessionRepository.save(session);
        return toResponse(chatMessageRepository.save(message));
    }

    private ChatMessageResponse saveMessageWithFile(
            ChatSession session,
            String senderId,
            ChatMessageSender sender,
            String content,
            MultipartFile file) {
        FileStorageService.StoredFile storedFile = null;
        try {
            storedFile = fileStorageService.store(
                    file,
                    storageLocation,
                    contextPath + "/uploads/chat-messages");
            ChatMessage message = ChatMessage.builder()
                    .chatSession(session)
                    .senderId(senderId)
                    .sender(sender)
                    .messageType(ChatMessageType.FILE)
                    .content(content)
                    .fileName(storedFile.originalName())
                    .fileUrl(storedFile.publicUrl())
                    .fileType(storedFile.contentType())
                    .fileSize(storedFile.size())
                    .build();
            session.setUpdatedAt(LocalDateTime.now());
            chatSessionRepository.save(session);
            return toResponse(chatMessageRepository.save(message));
        } catch (IOException exception) {
            throw new AppException(ErrorCode.CHAT_MESSAGE_FILE_STORAGE_ERROR);
        } catch (RuntimeException exception) {
            if (storedFile != null) {
                fileStorageService.deleteQuietly(storageLocation, storedFile.publicUrl());
            }
            throw exception;
        }
    }

    private ChatSession findByToken(String sessionToken) {
        return chatSessionRepository.findBySessionToken(sessionToken)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
    }

    private ChatSession findByTokenForUpdate(String sessionToken) {
        return chatSessionRepository.findBySessionTokenForUpdate(sessionToken)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
    }

    private void validateReadAccess(ChatSession session) {
        if (session.getUser() == null) {
            return;
        }
        User currentUser = requireCurrentUser();
        boolean owner = session.getUser().getId().equals(currentUser.getId());
        boolean assignedStaff = session.getAssignedStaff() != null
                && session.getAssignedStaff().getId().equals(currentUser.getId());
        boolean staff = currentUser.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()) || "ADVISOR".equals(role.getName()));
        if (!owner && !assignedStaff && !staff) {
            throw new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND);
        }
    }

    private Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        return userRepository.findByUsername(authentication.getName());
    }

    private User requireCurrentUser() {
        return getCurrentUser().orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
    }

    private String normalizeContent(String content) {
        if (content == null || content.isBlank()) {
            throw new AppException(ErrorCode.CHAT_MESSAGE_CONTENT_INVALID);
        }
        return content.trim();
    }

    private String normalizeContentOrFile(String content, MultipartFile file) {
        if (content != null && !content.isBlank()) {
            return content.trim();
        }
        if (file != null && !file.isEmpty()) {
            return "";
        }
        throw new AppException(ErrorCode.CHAT_MESSAGE_CONTENT_INVALID);
    }

    private ChatMessageResponse toResponse(ChatMessage message) {
        return ChatMessageResponse.builder()
                .id(message.getId())
                .chatSessionId(message.getChatSession().getId())
                .senderId(message.getSenderId())
                .sender(message.getSender())
                .messageType(message.getMessageType())
                .content(message.getContent())
                .fileName(message.getFileName())
                .fileUrl(message.getFileUrl())
                .fileType(message.getFileType())
                .fileSize(message.getFileSize())
                .createdAt(message.getCreatedAt())
                .build();
    }

    private UserMessageContext validateUserMessage(String sessionToken) {
        ChatSession session = findByTokenForUpdate(sessionToken);
        if (session.getUser() == null) {
            if (chatSessionRepository.consumeGuestQuestion(sessionToken, GUEST_QUESTION_LIMIT) == 0) {
                throw new AppException(ErrorCode.GUEST_QUESTION_LIMIT_REACHED);
            }
            // The bulk update clears the persistence context. Reload the incremented count
            // so saving the message cannot merge the old count back into the session.
            return new UserMessageContext(findByToken(sessionToken), null, ChatMessageSender.GUEST);
        }

        User user = getCurrentUser().orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        if (!session.getUser().getId().equals(user.getId())) {
            throw new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND);
        }
        return new UserMessageContext(session, user.getId(), ChatMessageSender.USER);
    }

    private record UserMessageContext(ChatSession session, String senderId, ChatMessageSender sender) {
    }
}
