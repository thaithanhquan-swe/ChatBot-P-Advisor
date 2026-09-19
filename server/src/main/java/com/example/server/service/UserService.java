package com.example.server.service;

import com.example.server.dto.request.UserUpdateRequest;
import com.example.server.dto.response.*;
import com.example.server.entity.User;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.mapper.UserMapper;
import com.example.server.repository.ChatSessionRepository;
import com.example.server.repository.RoleRepository;
import com.example.server.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    static Map<String, String> SORT_FIELDS = Map.of(
            "createdAt", "createdAt",
            "updatedAt", "updatedAt",
            "username", "username",
            "email", "email");

    UserRepository userRepository;
    RoleRepository roleRepository;
    ChatSessionRepository chatSessionRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public CurrentUserResponse getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .map(userMapper::toCurrentUserResponse)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public PageResponse<AdminUserResponse> getUsers(
            String keyword,
            String role,
            Boolean emailVerified,
            LocalDate createdFrom,
            LocalDate createdTo,
            String sortBy,
            String direction,
            int page,
            int size) {
        Specification<User> specification = (root, query, builder) -> builder.conjunction();

        if (keyword != null && !keyword.isBlank()) {
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            specification = specification.and((root, query, builder) -> builder.or(
                    builder.like(builder.lower(root.get("username")), pattern),
                    builder.like(builder.lower(root.get("email")), pattern),
                    builder.like(builder.lower(root.get("phone")), pattern)));
        }
        if (role != null && !role.isBlank()) {
            specification = specification.and((root, query, builder) -> {
                query.distinct(true);
                return builder.equal(root.join("roles").get("name"), role.trim().toUpperCase());
            });
        }
        if (emailVerified != null) {
            specification = specification.and((root, query, builder) ->
                    builder.equal(root.get("emailVerified"), emailVerified));
        }

        ZoneId zone = ZoneId.systemDefault();
        if (createdFrom != null) {
            specification = specification.and((root, query, builder) -> builder.greaterThanOrEqualTo(
                    root.get("createdAt"), createdFrom.atStartOfDay(zone).toInstant()));
        }
        if (createdTo != null) {
            specification = specification.and((root, query, builder) -> builder.lessThan(
                    root.get("createdAt"), createdTo.plusDays(1).atStartOfDay(zone).toInstant()));
        }

        String property = SORT_FIELDS.getOrDefault(sortBy, "createdAt");
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(direction)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        Page<User> users = userRepository.findAll(
                specification,
                PageRequest.of(
                        Math.max(0, page),
                        Math.min(Math.max(size, 1), 100),
                        Sort.by(sortDirection, property)));

        return PageResponse.of(users.map(this::toAdminResponse));
    }

    public AdminUserResponse getUserById(String id) {
        return userRepository.findById(id)
                .map(this::toAdminResponse)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public UserStatisticsResponse getStatistics() {
        return UserStatisticsResponse.builder()
                .totalUsers(userRepository.count())
                .verifiedUsers(userRepository.countByEmailVerifiedTrue())
                .userCount(userRepository.countDistinctByRolesName("USER"))
                .advisorCount(userRepository.countDistinctByRolesName("ADVISOR"))
                .adminCount(userRepository.countDistinctByRolesName("ADMIN"))
                .build();
    }

    private AdminUserResponse toAdminResponse(User user) {
        return AdminUserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .emailVerified(user.isEmailVerified())
                .roles(user.getRoles() == null
                        ? Set.of()
                        : user.getRoles().stream()
                                .map(role -> role.getName())
                                .collect(Collectors.toSet()))
                .chatSessionCount(chatSessionRepository.countByUserId(user.getId()))
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public UserResponse adminUpdateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);

        if (request.getRoles() != null) {
            var roles = roleRepository.findAllByNameIn(request.getRoles());
            user.setRoles(new HashSet<>(roles));
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }
}
