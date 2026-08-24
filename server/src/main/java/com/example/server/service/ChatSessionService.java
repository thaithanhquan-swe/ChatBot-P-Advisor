package com.example.server.service;

import com.example.server.dto.request.ChatSessionCreateRequest;
import com.example.server.dto.response.ChatSessionResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.entity.ChatSession;
import com.example.server.entity.User;
import com.example.server.enums.ChatSessionStatus;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.repository.ChatSessionRepository;
import com.example.server.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatSessionService {
    static int GUEST_QUESTION_LIMIT = 2;
    static SecureRandom SECURE_RANDOM = new SecureRandom();

    ChatSessionRepository chatSessionRepository;
    UserRepository userRepository;

    @Transactional
    public ChatSessionResponse create(ChatSessionCreateRequest request) {
        ChatSession session = ChatSession.builder()
                .sessionToken(generateSessionToken())
                .title(normalizeTitle(request.getTitle()))
                .user(getCurrentUser().orElse(null))
                .build();
        return toResponse(chatSessionRepository.save(session));
    }

    @Transactional(readOnly = true)
    public ChatSessionResponse getByToken(String sessionToken) {
        ChatSession session = findByToken(sessionToken);
        Optional<User> currentUser = getCurrentUser();
        if (session.getUser() != null
                && currentUser.map(User::getId)
                            .filter(session.getUser().getId()::equals)
                            .isEmpty())
        {
            throw new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND);
        }
        return toResponse(session);
    }

    @Transactional(readOnly = true)
    public PageResponse<ChatSessionResponse> getCurrentUserHistory(int page, int size) {
        User user = requireCurrentUser();
        Page<ChatSession> sessions = chatSessionRepository.findAllByUserId(
                user.getId(),
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt")));
        return PageResponse.of(sessions.map(this::toResponse));
    }

    @Transactional
    public ChatSessionResponse attachGuestSession(String sessionToken) {
        User user = requireCurrentUser();
        ChatSession session = chatSessionRepository.findBySessionTokenForUpdate(sessionToken)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
        if (session.getUser() != null && !session.getUser().getId().equals(user.getId())) {
            throw new AppException(ErrorCode.CHAT_SESSION_ALREADY_ATTACHED);
        }
        session.setUser(user);
        return toResponse(chatSessionRepository.save(session));
    }

    @Transactional
    public ChatSessionResponse consumeQuestion(String sessionToken) {
        ChatSession session = findByToken(sessionToken);
        if (session.getUser() != null) {
            User user = requireCurrentUser();
            if (!session.getUser().getId().equals(user.getId())) {
                throw new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND);
            }
            return toResponse(session);
        }
        if (chatSessionRepository.consumeGuestQuestion(sessionToken, GUEST_QUESTION_LIMIT) == 0) {
            throw new AppException(ErrorCode.GUEST_QUESTION_LIMIT_REACHED);
        }
        return toResponse(findByToken(sessionToken));
    }

    @Transactional
    public ChatSessionResponse requestStaff(String sessionToken) {
        ChatSession session = chatSessionRepository.findBySessionTokenForUpdate(sessionToken)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
        validateSessionAccess(session);
        if (session.getStatus() != ChatSessionStatus.BOT_HANDLING) {
            throw new AppException(ErrorCode.INVALID_CHAT_SESSION_STATUS);
        }
        session.setStatus(ChatSessionStatus.WAITING_FOR_STAFF);
        session.setAssignedStaff(null);
        session.setAssignedAt(null);
        return toResponse(chatSessionRepository.save(session));
    }

    @Transactional(readOnly = true)
    public PageResponse<ChatSessionResponse> getWaitingForStaff(int page, int size) {
        Page<ChatSession> sessions = chatSessionRepository.findAllByStatus(
                ChatSessionStatus.WAITING_FOR_STAFF,
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "updatedAt")));
        return PageResponse.of(sessions.map(this::toResponse));
    }

    @Transactional(readOnly = true)
    public PageResponse<ChatSessionResponse> getAssignedToCurrentStaff(int page, int size) {
        User staff = requireCurrentUser();
        Page<ChatSession> sessions = chatSessionRepository.findAllByAssignedStaffId(
                staff.getId(),
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt")));
        return PageResponse.of(sessions.map(this::toResponse));
    }

    @Transactional
    public ChatSessionResponse assignToCurrentStaff(String sessionId) {
        User staff = requireCurrentUser();
        ChatSession session = chatSessionRepository.findByIdForUpdate(sessionId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
        if (session.getAssignedStaff() != null) {
            throw new AppException(ErrorCode.CHAT_SESSION_ALREADY_ASSIGNED);
        }
        if (session.getStatus() != ChatSessionStatus.WAITING_FOR_STAFF) {
            throw new AppException(ErrorCode.INVALID_CHAT_SESSION_STATUS);
        }
        session.setStatus(ChatSessionStatus.STAFF_HANDLING);
        session.setAssignedStaff(staff);
        session.setAssignedAt(LocalDateTime.now());
        return toResponse(chatSessionRepository.save(session));
    }

    @Transactional
    public ChatSessionResponse returnToBot(String sessionId) {
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
        session.setStatus(ChatSessionStatus.BOT_HANDLING);
        session.setAssignedStaff(null);
        session.setAssignedAt(null);
        return toResponse(chatSessionRepository.save(session));
    }

    @Transactional
    public void delete(String sessionToken) {
        ChatSession session = findByToken(sessionToken);
        if (session.getUser() != null) {
            User user = requireCurrentUser();
            if (!session.getUser().getId().equals(user.getId())) {
                throw new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND);
            }
        }
        chatSessionRepository.delete(session);
    }

    private ChatSession findByToken(String sessionToken) {
        return chatSessionRepository.findBySessionToken(sessionToken)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
    }

    private void validateSessionAccess(ChatSession session) {
        if (session.getUser() == null) {
            return;
        }
        User currentUser = requireCurrentUser();
        if (!session.getUser().getId().equals(currentUser.getId())) {
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

    private String generateSessionToken() {
        byte[] bytes = new byte[32];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String normalizeTitle(String title) {
        return title == null || title.isBlank() ? "Cuộc trò chuyện mới" : title.trim();
    }

    private ChatSessionResponse toResponse(ChatSession session) {
        int remainingQuestions = session.getUser() == null
                ? Math.max(0, GUEST_QUESTION_LIMIT - session.getGuestQuestionCount())
                : 0;
        return ChatSessionResponse.builder()
                .id(session.getId())
                .sessionToken(session.getSessionToken())
                .userId(session.getUser() == null ? null : session.getUser().getId())
                .title(session.getTitle())
                .status(session.getStatus())
                .assignedStaffId(session.getAssignedStaff() == null ? null : session.getAssignedStaff().getId())
                .assignedAt(session.getAssignedAt())
                .guestQuestionCount(session.getGuestQuestionCount())
                .remainingGuestQuestions(remainingQuestions)
                .createdAt(session.getCreatedAt())
                .updatedAt(session.getUpdatedAt())
                .build();
    }
}
