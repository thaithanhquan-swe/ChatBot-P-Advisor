package com.example.server.service;

import com.example.server.dto.request.HeroSlideRequest;
import com.example.server.dto.request.AdmissionLinkRequest;
import com.example.server.dto.request.SystemConfigRequest;
import com.example.server.dto.response.HeroSlideResponse;
import com.example.server.dto.response.AdmissionLinkResponse;
import com.example.server.dto.response.SystemConfigResponse;
import com.example.server.dto.response.SystemConfigImageResponse;
import com.example.server.entity.SystemConfig;
import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.example.server.repository.SystemConfigRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemConfigService {
    private final SystemConfigRepository systemConfigRepository;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @NonFinal
    @Value("${app.config.context-path}")
    String contextPath;

    @NonFinal
    @Value("${app.system-config.storage-location}")
    String storageLocation;

    @Transactional
    public SystemConfigResponse getPublicConfig() {
        return systemConfigRepository.findById(SystemConfig.DEFAULT_ID)
                .map(this::toResponse)
                .orElse(null);
    }

    @Transactional
    public SystemConfigResponse update(SystemConfigRequest request) {
        SystemConfig config = systemConfigRepository.findById(SystemConfig.DEFAULT_ID)
                .orElseGet(() -> SystemConfig.builder().id(SystemConfig.DEFAULT_ID).build());
        config.setHeroBadge(request.getHeroBadge());
        config.setHeroTitle(request.getHeroTitle());
        config.setHeroHighlightedTitle(request.getHeroHighlightedTitle());
        config.setHeroDescription(request.getHeroDescription());
        config.setFooterAboutDescription(request.getFooterAboutDescription());
        config.setAdmissionLinks(serializeAdmissionLinks(request.getAdmissionLinks()));
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

    public SystemConfigImageResponse uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty() || file.getContentType() == null
                || !file.getContentType().toLowerCase().startsWith("image/")) {
            throw new AppException(ErrorCode.SYSTEM_CONFIG_IMAGE_INVALID);
        }

        try {
            FileStorageService.StoredFile storedFile = fileStorageService.store(
                    file,
                    storageLocation,
                    contextPath + "/uploads/system-config");
            return new SystemConfigImageResponse(
                    storedFile.publicUrl(),
                    storedFile.originalName(),
                    storedFile.contentType(),
                    storedFile.size());
        } catch (IOException exception) {
            throw new AppException(ErrorCode.SYSTEM_CONFIG_IMAGE_STORAGE_ERROR);
        }
    }

    private SystemConfigResponse toResponse(SystemConfig config) {
        return SystemConfigResponse.builder()
                .id(config.getId())
                .heroBadge(config.getHeroBadge())
                .heroTitle(config.getHeroTitle())
                .heroHighlightedTitle(config.getHeroHighlightedTitle())
                .heroDescription(config.getHeroDescription())
                .footerAboutDescription(config.getFooterAboutDescription())
                .admissionLinks(deserializeAdmissionLinks(config.getAdmissionLinks()))
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

    private String serializeAdmissionLinks(List<AdmissionLinkRequest> links) {
        try {
            return objectMapper.writeValueAsString(links);
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Cannot serialize admission links", exception);
        }
    }

    private List<AdmissionLinkResponse> deserializeAdmissionLinks(String serializedLinks) {
        if (serializedLinks == null || serializedLinks.isBlank()) {
            return List.of();
        }
        try {
            return objectMapper.readValue(serializedLinks, new TypeReference<List<AdmissionLinkResponse>>() {})
                    .stream()
                    .sorted(Comparator.comparing(AdmissionLinkResponse::getDisplayOrder))
                    .toList();
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Stored admission links are invalid", exception);
        }
    }
}
