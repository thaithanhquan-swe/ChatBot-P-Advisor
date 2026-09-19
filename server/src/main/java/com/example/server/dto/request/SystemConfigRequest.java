package com.example.server.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SystemConfigRequest {
    @NotBlank(message = "SYSTEM_CONFIG_SLOGAN_INVALID")
    @Size(max = 100, message = "SYSTEM_CONFIG_SLOGAN_INVALID")
    String heroBadge;

    @NotBlank(message = "SYSTEM_CONFIG_SLOGAN_INVALID")
    @Size(max = 255, message = "SYSTEM_CONFIG_SLOGAN_INVALID")
    String heroTitle;

    @Size(max = 255, message = "SYSTEM_CONFIG_SLOGAN_INVALID")
    String heroHighlightedTitle;

    @NotBlank(message = "SYSTEM_CONFIG_SLOGAN_INVALID")
    @Size(max = 2000, message = "SYSTEM_CONFIG_SLOGAN_INVALID")
    String heroDescription;

    @NotBlank(message = "SYSTEM_CONFIG_FOOTER_DESCRIPTION_INVALID")
    @Size(max = 2000, message = "SYSTEM_CONFIG_FOOTER_DESCRIPTION_INVALID")
    String footerAboutDescription;

    @NotNull(message = "SYSTEM_CONFIG_ADMISSION_LINKS_INVALID")
    List<@Valid AdmissionLinkRequest> admissionLinks;

    @NotNull(message = "SYSTEM_CONFIG_SLIDES_INVALID")
    List<@Valid HeroSlideRequest> heroSlides;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 50, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String admissionHotline;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 255, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String admissionEmail;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 1000, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String websiteUrl;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 1000, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String facebookUrl;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 50, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String footerPhone;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 255, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String footerEmail;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 500, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String footerAddress;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 255, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String weekdayWorkingHours;

    @NotBlank(message = "SYSTEM_CONFIG_CONTACT_INVALID")
    @Size(max = 255, message = "SYSTEM_CONFIG_CONTACT_INVALID")
    String saturdayWorkingHours;
}
