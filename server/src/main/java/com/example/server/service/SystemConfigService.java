package com.example.server.service;

import com.example.server.dto.request.HeroSlideRequest;
import com.example.server.dto.request.SystemConfigRequest;
import com.example.server.dto.response.HeroSlideResponse;
import com.example.server.dto.response.SystemConfigResponse;
import com.example.server.entity.SystemConfig;
import com.example.server.repository.SystemConfigRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemConfigService {
    private final SystemConfigRepository systemConfigRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Transactional
    public SystemConfigResponse getPublicConfig() {
        return toResponse(getOrCreate());
    }

    @Transactional
    public SystemConfigResponse update(SystemConfigRequest request) {
        SystemConfig config = getOrCreate();
        config.setHeroBadge(request.getHeroBadge());
        config.setHeroTitle(request.getHeroTitle());
        config.setHeroHighlightedTitle(request.getHeroHighlightedTitle());
        config.setHeroDescription(request.getHeroDescription());
        config.setHeroSlides(serializeSlides(request.getHeroSlides()));
        config.setAdmissionHotline(request.getAdmissionHotline());
        config.setAdmissionEmail(request.getAdmissionEmail());
        config.setWebsiteUrl(request.getWebsiteUrl());
        config.setFacebookUrl(request.getFacebookUrl());
        config.setFooterPhone(request.getFooterPhone());
        config.setFooterEmail(request.getFooterEmail());
        config.setFooterAddress(request.getFooterAddress());
        config.setWeekdayWorkingHours(request.getWeekdayWorkingHours());
        config.setSaturdayWorkingHours(request.getSaturdayWorkingHours());
        return toResponse(systemConfigRepository.save(config));
    }

    private SystemConfig getOrCreate() {
        return systemConfigRepository.findById(SystemConfig.DEFAULT_ID)
                .orElseGet(() -> systemConfigRepository.save(defaultConfig()));
    }

    private SystemConfig defaultConfig() {
        return SystemConfig.builder()
                .id(SystemConfig.DEFAULT_ID)
                .heroBadge("TRỢ LÝ TUYỂN SINH PTIT")
                .heroTitle("Chọn đúng hướng đi,")
                .heroHighlightedTitle("bắt đầu từ một câu hỏi.")
                .heroDescription("P-Advisor giúp thí sinh và phụ huynh tìm hiểu ngành học, học phí, học bổng và quy trình tuyển sinh PTIT bằng những câu trả lời dễ hiểu, nhanh chóng.")
                .heroSlides(serializeSlides(List.of(HeroSlideRequest.builder()
                        .imageUrl("/images/hero-placeholder.jpg")
                        .eyebrow("HỌC VIỆN PTIT")
                        .caption("Đổi mới · Sáng tạo · Chất lượng")
                        .displayOrder(1)
                        .build())))
                .admissionHotline("024 3773 1861")
                .admissionEmail("tuyensinh@ptit.edu.vn")
                .websiteUrl("https://ptit.edu.vn")
                .facebookUrl("https://fb.com/HocvienPTIT")
                .footerPhone("(024) 3756 2468")
                .footerEmail("tuyensinh@ptit.edu.vn")
                .footerAddress("11 Đường Nguyễn Đình Chiểu, Sài Gòn, Hồ Chí Minh, Việt Nam")
                .weekdayWorkingHours("Thứ 2 – Thứ 6: 7h30 – 17h00")
                .saturdayWorkingHours("Thứ 7: 7h30 – 11h30")
                .build();
    }

    private SystemConfigResponse toResponse(SystemConfig config) {
        return SystemConfigResponse.builder()
                .id(config.getId())
                .heroBadge(config.getHeroBadge())
                .heroTitle(config.getHeroTitle())
                .heroHighlightedTitle(config.getHeroHighlightedTitle())
                .heroDescription(config.getHeroDescription())
                .heroSlides(deserializeSlides(config.getHeroSlides()))
                .admissionHotline(config.getAdmissionHotline())
                .admissionEmail(config.getAdmissionEmail())
                .websiteUrl(config.getWebsiteUrl())
                .facebookUrl(config.getFacebookUrl())
                .footerPhone(config.getFooterPhone())
                .footerEmail(config.getFooterEmail())
                .footerAddress(config.getFooterAddress())
                .weekdayWorkingHours(config.getWeekdayWorkingHours())
                .saturdayWorkingHours(config.getSaturdayWorkingHours())
                .createdAt(config.getCreatedAt())
                .updatedAt(config.getUpdatedAt())
                .build();
    }

    private String serializeSlides(List<HeroSlideRequest> slides) {
        try {
            return objectMapper.writeValueAsString(slides);
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Cannot serialize hero slides", exception);
        }
    }

    private List<HeroSlideResponse> deserializeSlides(String serializedSlides) {
        try {
            return objectMapper.readValue(serializedSlides, new TypeReference<List<HeroSlideResponse>>() {})
                    .stream()
                    .sorted(Comparator.comparing(HeroSlideResponse::getDisplayOrder))
                    .toList();
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Stored hero slides are invalid", exception);
        }
    }
}
