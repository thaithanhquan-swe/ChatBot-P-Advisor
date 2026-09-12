package com.example.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "systems_config")
public class SystemConfig {
    public static final String DEFAULT_ID = "default";

    @Id
    @Column(length = 50)
    String id;

    @Column(name = "hero_badge", nullable = false, length = 100)
    String heroBadge;

    @Column(name = "hero_title", nullable = false, length = 255)
    String heroTitle;

    @Column(name = "hero_highlighted_title", length = 255)
    String heroHighlightedTitle;

    @Column(name = "hero_description", nullable = false, columnDefinition = "TEXT")
    String heroDescription;

    @Column(name = "hero_slides", nullable = false, columnDefinition = "LONGTEXT")
    String heroSlides;

    @Column(name = "admission_hotline", nullable = false, length = 50)
    String admissionHotline;

    @Column(name = "admission_email", nullable = false, length = 255)
    String admissionEmail;

    @Column(name = "website_url", nullable = false, length = 1000)
    String websiteUrl;

    @Column(name = "facebook_url", nullable = false, length = 1000)
    String facebookUrl;

    @Column(name = "footer_phone", nullable = false, length = 50)
    String footerPhone;

    @Column(name = "footer_email", nullable = false, length = 255)
    String footerEmail;

    @Column(name = "footer_address", nullable = false, length = 500)
    String footerAddress;

    @Column(name = "weekday_working_hours", nullable = false, length = 255)
    String weekdayWorkingHours;

    @Column(name = "saturday_working_hours", nullable = false, length = 255)
    String saturdayWorkingHours;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    LocalDateTime updatedAt;
}
