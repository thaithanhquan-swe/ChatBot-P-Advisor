package com.example.server.service;

import com.example.server.dto.request.FaqRequest;
import com.example.server.dto.response.FaqResponse;
import com.example.server.dto.response.PageResponse;
import com.example.server.entity.Faq;
import com.example.server.entity.FaqCategory;
import com.example.server.entity.User;
import com.example.server.enums.FaqStatus;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.mapper.FaqMapper;
import com.example.server.repository.FaqCategoryRepository;
import com.example.server.repository.FaqRepository;
import com.example.server.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FaqService {
    FaqRepository faqRepository;
    FaqCategoryRepository faqCategoryRepository;
    UserRepository userRepository;
    FaqMapper faqMapper;

    @Transactional
    public FaqResponse create(FaqRequest request) {
        Faq faq = faqMapper.toFaq(request);
        faq.setFaqCategory(findCategory(request.getFaqCategoryId()));
        faq.setCreatedBy(getCurrentUser());
        LocalDateTime now = LocalDateTime.now();
        faq.setCreatedAt(now);
        faq.setUpdatedAt(now);
        return faqMapper.toFaqResponse(faqRepository.save(faq));
    }

    @Transactional(readOnly = true)
    public PageResponse<FaqResponse> getPublished(String faqCategoryId, int page, int size) {
        Pageable pageable = createPageable(page, size);
        Page<Faq> faqs = faqCategoryId == null
                ? faqRepository.findAllByStatus(FaqStatus.PUBLISHED, pageable)
                : faqRepository.findAllByStatusAndFaqCategoryId(
                        FaqStatus.PUBLISHED, faqCategoryId, pageable);
        return PageResponse.of(faqs.map(faqMapper::toFaqResponse));
    }

    @Transactional(readOnly = true)
    public FaqResponse getPublishedById(String id) {
        Faq faq = faqRepository.findByIdAndStatus(id, FaqStatus.PUBLISHED)
                .orElseThrow(() -> new AppException(ErrorCode.FAQ_NOT_FOUND));
        return faqMapper.toFaqResponse(faq);
    }

    @Transactional(readOnly = true)
    public PageResponse<FaqResponse> getForManagement(
            String keyword,
            FaqStatus status,
            String faqCategoryId,
            LocalDate updatedFrom,
            LocalDate updatedTo,
            String sortBy,
            Sort.Direction sortDirection,
            int page,
            int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, resolveSortField(sortBy)));
        Specification<Faq> specification = (root, query, criteriaBuilder) -> criteriaBuilder.conjunction();

        if (keyword != null && !keyword.isBlank()) {
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            specification = specification.and((root, query, criteriaBuilder) -> criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("question")), pattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("answer")), pattern)));
        }
        if (status != null) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("status"), status));
        }
        if (faqCategoryId != null && !faqCategoryId.isBlank()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("faqCategory").get("id"), faqCategoryId));
        }
        if (updatedFrom != null) {
            LocalDateTime from = updatedFrom.atStartOfDay();
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("updatedAt"), from));
        }
        if (updatedTo != null) {
            LocalDateTime toExclusive = updatedTo.plusDays(1).atStartOfDay();
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThan(root.get("updatedAt"), toExclusive));
        }

        Page<Faq> faqs = faqRepository.findAll(specification, pageable);
        return PageResponse.of(faqs.map(faqMapper::toFaqResponse));
    }

    @Transactional
    public FaqResponse update(String id, FaqRequest request) {
        Faq faq = findById(id);
        faqMapper.updateFaq(faq, request);
        faq.setFaqCategory(findCategory(request.getFaqCategoryId()));
        faq.setUpdatedAt(LocalDateTime.now());
        return faqMapper.toFaqResponse(faqRepository.save(faq));
    }

    @Transactional
    public void delete(String id) {
        faqRepository.delete(findById(id));
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    private String resolveSortField(String sortBy) {
        return switch (sortBy) {
            case "createdAt", "updatedAt", "question", "status" -> sortBy;
            default -> "updatedAt";
        };
    }

    private Faq findById(String id) {
        return faqRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.FAQ_NOT_FOUND));
    }

    private FaqCategory findCategory(String id) {
        return faqCategoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.FAQ_CATEGORY_NOT_FOUND));
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}
