package com.example.server.dto.response;

public record SystemConfigImageResponse(
        String url,
        String fileName,
        String contentType,
        long size) {
}
