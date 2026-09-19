package com.example.server.service;

import com.example.server.exception.AppException;
import com.example.server.exception.ErrorCode;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Slf4j
public class FirebaseTokenVerifier {
    @Value("${app.firebase.project-id}")
    private String projectId;

    @Value("${app.firebase.service-account-path}")
    private String serviceAccountPath;

    private FirebaseAuth firebaseAuth;

    public FirebaseToken verify(String idToken) {
        try {
            return getFirebaseAuth().verifyIdToken(idToken, true);
        } catch (FirebaseAuthException | IOException exception) {
            log.warn("Firebase ID token verification failed: {}", exception.getMessage(), exception);
            throw new AppException(ErrorCode.FIREBASE_AUTH_FAILED);
        }
    }

    private synchronized FirebaseAuth getFirebaseAuth() throws IOException {
        if (firebaseAuth != null) return firebaseAuth;
        if (!StringUtils.hasText(projectId)) {
            throw new AppException(ErrorCode.FIREBASE_AUTH_FAILED);
        }

        GoogleCredentials credentials;
        if (StringUtils.hasText(serviceAccountPath)) {
            try (InputStream input = openServiceAccount()) {
                credentials = GoogleCredentials.fromStream(input);
            }
        } else {
            credentials = GoogleCredentials.getApplicationDefault();
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(credentials)
                .setProjectId(projectId)
                .build();
        FirebaseApp app = FirebaseApp.getApps().isEmpty()
                ? FirebaseApp.initializeApp(options)
                : FirebaseApp.getInstance();
        firebaseAuth = FirebaseAuth.getInstance(app);
        return firebaseAuth;
    }

    private InputStream openServiceAccount() throws IOException {
        if (serviceAccountPath.startsWith("classpath:")) {
            String resourcePath = serviceAccountPath.substring("classpath:".length());
            return new ClassPathResource(resourcePath).getInputStream();
        }
        return Files.newInputStream(Path.of(serviceAccountPath));
    }
}
