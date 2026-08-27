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
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatMessageService {
    static int GUEST_QUESTION_LIMIT = 2;

    ChatMessageRepository chatMessageRepository;
    ChatSessionRepository chatSessionRepository;
    UserRepository userRepository;

    @NonFinal
    Path storageRoot;

    @NonFinal
    @Value("${app.config.context-path}")
    String contextPath;

    @NonFinal
    @Value("${app.chat-message.storage-location}")
    String storageLocation;

    @PostConstruct
    void initializeStorageRoot() {
        storageRoot = Path.of(storageLocation).toAbsolutePath().normalize();
    }

    @Transactional
    public ChatMessageResponse sendUserMessage(String sessionToken, String content, MultipartFile file) {
        String normalizedContent = normalizeContent(content);
        if (file != null && !file.isEmpty()) {
            return saveUserMessageWithFile(sessionToken, normalizedContent, file);
        }

        UserMessageContext messageContext = validateUserMessage(sessionToken);
        return saveMessage(messageContext.session(), messageContext.senderId(), messageContext.sender(),
                ChatMessageType.TEXT, normalizedContent);
    }

    private ChatMessageResponse saveUserMessageWithFile(
            String sessionToken,
            String normalizedContent,
            MultipartFile file) {
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new AppException(ErrorCode.CHAT_MESSAGE_IMAGE_INVALID);
        }

        UserMessageContext messageContext = validateUserMessage(sessionToken);
        String originalName = sanitizeOriginalName(file.getOriginalFilename());
        String storedName = UUID.randomUUID() + "-" + originalName;
        Path target = resolveStoragePath(storedName);

        try {
            Files.createDirectories(storageRoot);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, target, StandardCopyOption.REPLACE_EXISTING);
            }

            ChatMessage message = ChatMessage.builder()
                    .chatSession(messageContext.session())
                    .senderId(messageContext.senderId())
                    .sender(messageContext.sender())
                    .messageType(ChatMessageType.FILE)
                    .content(normalizedContent)
                    .fileName(originalName)
                    .fileUrl(contextPath + "/uploads/chat-messages/" + storedName)
                    .fileType(resolveContentType(file))
                    .fileSize(file.getSize())
                    .build();
            messageContext.session().setUpdatedAt(LocalDateTime.now());
            chatSessionRepository.save(messageContext.session());
            return toResponse(chatMessageRepository.save(message));
        } catch (IOException exception) {
            deleteQuietly(target);
            throw new AppException(ErrorCode.CHAT_MESSAGE_FILE_STORAGE_ERROR);
        } catch (RuntimeException exception) {
            deleteQuietly(target);
            throw exception;
        }
    }

    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")
    public ChatMessageResponse sendStaffMessage(String sessionId, String content) {
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
        return saveMessage(session, staff.getId(), ChatMessageSender.STAFF,
                ChatMessageType.TEXT, normalizeContent(content));
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

    @Transactional(readOnly = true)
    public boolean isBotHandling(String sessionToken) {
        ChatSession session = findByToken(sessionToken);
        validateReadAccess(session);
        return session.getStatus() == ChatSessionStatus.BOT_HANDLING;
    }

    @Transactional
    public ChatMessageResponse saveBotMessage(String sessionToken, String content) {
        ChatSession session = findByToken(sessionToken);
        return saveMessage(session, null, ChatMessageSender.BOT, ChatMessageType.TEXT,
                normalizeContent(content));
    }

    @Transactional
    public ChatMessageResponse saveSystemMessage(String sessionToken, String content) {
        ChatSession session = findByToken(sessionToken);
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

    private ChatSession findByToken(String sessionToken) {
        return chatSessionRepository.findBySessionToken(sessionToken)
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
        if (!owner && !assignedStaff) {
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
        ChatSession session = findByToken(sessionToken);
        if (session.getUser() == null) {
            if (chatSessionRepository.consumeGuestQuestion(sessionToken, GUEST_QUESTION_LIMIT) == 0) {
                throw new AppException(ErrorCode.GUEST_QUESTION_LIMIT_REACHED);
            }
            return new UserMessageContext(session, null, ChatMessageSender.GUEST);
        }

        User user = getCurrentUser().orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        if (!session.getUser().getId().equals(user.getId())) {
            throw new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND);
        }
        return new UserMessageContext(session, user.getId(), ChatMessageSender.USER);
    }

    private Path resolveStoragePath(String storedName) {
        Path resolved = storageRoot.resolve(storedName).normalize();
        if (!resolved.startsWith(storageRoot)) {
            throw new AppException(ErrorCode.CHAT_MESSAGE_FILE_STORAGE_ERROR);
        }
        return resolved;
    }

    private String sanitizeOriginalName(String originalName) {
        if (originalName == null || originalName.isBlank()) {
            return "file";
        }
        String fileName = originalName.replace('\\', '/');
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        fileName = fileName.replaceAll("[^a-zA-Z0-9._-]", "_");
        return fileName.isBlank() ? "file" : fileName;
    }

    private String resolveContentType(MultipartFile file) {
        return file.getContentType() == null || file.getContentType().isBlank()
                ? "application/octet-stream"
                : file.getContentType();
    }

    private void deleteQuietly(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException ignored) {
            // Preserve the original exception.
        }
    }

    private record UserMessageContext(ChatSession session, String senderId, ChatMessageSender sender) {
    }
}
