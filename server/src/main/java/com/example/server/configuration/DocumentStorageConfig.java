package com.example.server.configuration;

import com.example.server.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class DocumentStorageConfig implements WebMvcConfigurer {
    private final String storageLocation;
    private final String chatMessageStorageLocation;
    private final String systemConfigStorageLocation;
    private final FileStorageService fileStorageService;

    public DocumentStorageConfig(
            @Value("${app.document.storage-location}") String storageLocation,
            @Value("${app.chat-message.storage-location}") String chatMessageStorageLocation,
            @Value("${app.system-config.storage-location}") String systemConfigStorageLocation,
            FileStorageService fileStorageService) {
        this.storageLocation = storageLocation;
        this.chatMessageStorageLocation = chatMessageStorageLocation;
        this.systemConfigStorageLocation = systemConfigStorageLocation;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String resourceLocation = fileStorageService.resolveStorageRoot(storageLocation).toUri().toString();
        registry.addResourceHandler("/uploads/documents/**")
                .addResourceLocations(resourceLocation);
        String chatMessageResourceLocation = fileStorageService
                .resolveStorageRoot(chatMessageStorageLocation).toUri().toString();
        registry.addResourceHandler("/uploads/chat-messages/**")
                .addResourceLocations(chatMessageResourceLocation);
        String systemConfigResourceLocation = fileStorageService
                .resolveStorageRoot(systemConfigStorageLocation).toUri().toString();
        registry.addResourceHandler("/uploads/system-config/**")
                .addResourceLocations(systemConfigResourceLocation);
    }
}
