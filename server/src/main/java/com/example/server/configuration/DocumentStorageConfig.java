package com.example.server.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
public class DocumentStorageConfig implements WebMvcConfigurer {
    private final String storageLocation;

    public DocumentStorageConfig(
            @Value("${app.document.storage-location}") String storageLocation) {
        this.storageLocation = storageLocation;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String resourceLocation = Path.of(storageLocation).toAbsolutePath().normalize().toUri().toString();
        registry.addResourceHandler("/uploads/documents/**")
                .addResourceLocations(resourceLocation);
    }
}
