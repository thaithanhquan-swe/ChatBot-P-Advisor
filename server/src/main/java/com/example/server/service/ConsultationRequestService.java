package com.example.server.service;

import com.example.server.dto.request.ConsultationRequestCreateRequest;
import com.example.server.dto.response.ConsultationRequestResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.entity.ChatSession;
import com.example.server.entity.ConsultationRequest;
import com.example.server.entity.User;
import com.example.server.enums.ConsultationRequestStatus;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.mail.ConsultationRequestMailService;
import com.example.server.repository.ChatSessionRepository;
import com.example.server.repository.ConsultationRequestRepository;
import com.example.server.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ConsultationRequestService {
    ConsultationRequestRepository consultationRequestRepository;
    ChatSessionRepository chatSessionRepository;
    UserRepository userRepository;
    ConsultationRequestMailService consultationRequestMailService;

    @Transactional
    public ConsultationRequestResponse create(ConsultationRequestCreateRequest request) {
        String email = normalize(request.getEmail());
        String phone = normalize(request.getPhone());
        if (email == null && phone == null) {
            throw new AppException(ErrorCode.CONSULTATION_CONTACT_REQUIRED);
        }

        ConsultationRequest entity = ConsultationRequest.builder()
                .user(currentUser())
                .chatSession(findChatSession(request.getChatSessionId()))
                .email(email == null ? null : email.toLowerCase())
                .phone(phone)
                .question(request.getQuestion().trim())
                .build();
        entity = consultationRequestRepository.save(entity);
        if (entity.getEmail() != null) {
            consultationRequestMailService.sendCreated(entity.getEmail(), entity.getId());
        }
        return toResponse(entity);
    }

    @Transactional(readOnly = true)
    public PageResponse<ConsultationRequestResponse> getAll(
            String keyword,
            ConsultationRequestStatus status,
            LocalDate createdFrom,
            LocalDate createdTo,
            String sortBy,
            Sort.Direction sortDirection,
            int page,
            int size) {
        var pageable = PageRequest.of(page, size,
                Sort.by(sortDirection, resolveSortField(sortBy)));
        Specification<ConsultationRequest> specification =
                (root, query, builder) -> builder.conjunction();

        if (keyword != null && !keyword.isBlank()) {
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            specification = specification.and((root, query, builder) -> builder.or(
                    builder.like(builder.lower(root.get("question")), pattern),
                    builder.like(builder.lower(root.get("email")), pattern),
                    builder.like(builder.lower(root.get("phone")), pattern)));
        }
        if (status != null) {
            specification = specification.and((root, query, builder) ->
                    builder.equal(root.get("status"), status));
        }
        if (createdFrom != null) {
            LocalDateTime from = createdFrom.atStartOfDay();
            specification = specification.and((root, query, builder) ->
                    builder.greaterThanOrEqualTo(root.get("createdAt"), from));
        }
        if (createdTo != null) {
            LocalDateTime toExclusive = createdTo.plusDays(1).atStartOfDay();
            specification = specification.and((root, query, builder) ->
                    builder.lessThan(root.get("createdAt"), toExclusive));
        }

        Page<ConsultationRequest> result = consultationRequestRepository.findAll(specification, pageable);
        return PageResponse.of(result.map(this::toResponse));
    }

    private String resolveSortField(String sortBy) {
        return switch (sortBy) {
            case "status", "createdAt", "updatedAt", "resolvedAt", "email", "phone" -> sortBy;
            default -> "createdAt";
        };
    }

    @Transactional
    public ConsultationRequestResponse assign(String id) {
        ConsultationRequest entity = consultationRequestRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new AppException(ErrorCode.CONSULTATION_REQUEST_NOT_FOUND));
        if (entity.getStatus() != ConsultationRequestStatus.PENDING || entity.getAssignedStaff() != null) {
            throw new AppException(ErrorCode.CONSULTATION_REQUEST_ALREADY_ASSIGNED);
        }
        entity.setAssignedStaff(requireCurrentUser());
        entity.setStatus(ConsultationRequestStatus.IN_PROGRESS);
        entity = consultationRequestRepository.save(entity);
        if (entity.getEmail() != null) {
            consultationRequestMailService.sendStatusChanged(
                    entity.getEmail(), entity.getId(), entity.getStatus());
        }
        return toResponse(entity);
    }

    @Transactional
    public ConsultationRequestResponse resolve(String id) {
        ConsultationRequest entity = consultationRequestRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new AppException(ErrorCode.CONSULTATION_REQUEST_NOT_FOUND));
        User currentUser = requireCurrentUser();
        if (entity.getAssignedStaff() == null
                || !entity.getAssignedStaff().getId().equals(currentUser.getId())) {
            throw new AppException(ErrorCode.CONSULTATION_REQUEST_NOT_ASSIGNED_TO_YOU);
        }
        if (entity.getStatus() != ConsultationRequestStatus.IN_PROGRESS) {
            throw new AppException(ErrorCode.INVALID_CONSULTATION_REQUEST_STATUS);
        }
        entity.setStatus(ConsultationRequestStatus.RESOLVED);
        entity.setResolvedAt(LocalDateTime.now());
        entity = consultationRequestRepository.save(entity);
        if (entity.getEmail() != null) {
            consultationRequestMailService.sendStatusChanged(
                    entity.getEmail(), entity.getId(), entity.getStatus());
        }
        return toResponse(entity);
    }

    private User currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) return null;
        return userRepository.findByUsername(authentication.getName()).orElse(null);
    }

    private ChatSession findChatSession(String id) {
        if (normalize(id) == null) return null;
        return chatSessionRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CHAT_SESSION_NOT_FOUND));
    }

    private User requireCurrentUser() {
        User user = currentUser();
        if (user == null) throw new AppException(ErrorCode.UNAUTHENTICATED);
        return user;
    }

    private String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private ConsultationRequestResponse toResponse(ConsultationRequest entity) {
        return ConsultationRequestResponse.builder()
                .id(entity.getId())
                .userId(entity.getUser() == null ? null : entity.getUser().getId())
                .chatSessionId(entity.getChatSession() == null ? null : entity.getChatSession().getId())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .question(entity.getQuestion())
                .status(entity.getStatus())
                .assignedStaffId(entity.getAssignedStaff() == null ? null : entity.getAssignedStaff().getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .resolvedAt(entity.getResolvedAt())
                .build();
    }
}
