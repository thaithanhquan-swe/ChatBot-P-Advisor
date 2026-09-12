package com.example.server.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SystemConfigResponse {
    String id;
    String heroBadge;
    String heroTitle;
    String heroHighlightedTitle;
    String heroDescription;
    String footerAboutDescription;
    List<AdmissionLinkResponse> admissionLinks;
    List<HeroSlideResponse> heroSlides;
    String admissionHotline;
    String admissionEmail;
    String websiteUrl;
    String facebookUrl;
    String footerPhone;
    String footerEmail;
    String footerAddress;
    String weekdayWorkingHours;
    String saturdayWorkingHours;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
