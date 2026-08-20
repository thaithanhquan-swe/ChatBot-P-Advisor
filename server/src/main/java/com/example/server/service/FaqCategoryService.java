package com.example.server.service;

import com.example.server.dto.request.FaqCategoryRequest;
import com.example.server.dto.response.FaqCategoryResponse;
import com.example.server.entity.FaqCategory;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.mapper.FaqCategoryMapper;
import com.example.server.repository.FaqCategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FaqCategoryService {
    FaqCategoryRepository faqCategoryRepository;
    FaqCategoryMapper faqCategoryMapper;

    @Transactional
    public FaqCategoryResponse create(FaqCategoryRequest request) {
        FaqCategory category = faqCategoryMapper.toFaqCategory(request);
        return faqCategoryMapper.toFaqCategoryResponse(faqCategoryRepository.save(category));
    }

    @Transactional(readOnly = true)
    public List<FaqCategoryResponse> getAll() {
        return faqCategoryRepository.findAll().stream()
                .map(faqCategoryMapper::toFaqCategoryResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public FaqCategoryResponse getById(String id) {
        return faqCategoryMapper.toFaqCategoryResponse(findById(id));
    }

    @Transactional
    public FaqCategoryResponse update(String id, FaqCategoryRequest request) {
        FaqCategory category = findById(id);
        faqCategoryMapper.updateFaqCategory(category, request);
        return faqCategoryMapper.toFaqCategoryResponse(faqCategoryRepository.save(category));
    }

    @Transactional
    public void delete(String id) {
        FaqCategory category = findById(id);
        faqCategoryRepository.delete(category);
    }

    private FaqCategory findById(String id) {
        return faqCategoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.FAQ_CATEGORY_NOT_FOUND));
    }
}
