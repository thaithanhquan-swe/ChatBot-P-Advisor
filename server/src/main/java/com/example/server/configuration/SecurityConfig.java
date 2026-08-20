package com.example.server.configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Đánh dấu đây là class cấu hình của Spring
@EnableWebSecurity // Bật cơ chế bảo mật của Spring Security
@EnableMethodSecurity // Phân quyền trực tiếp trên các hàm trong Service hoặc Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {

    CustomJwtDecoder customJwtDecoder;
    CorsConfig corsConfig;
    JwtAuthenticationConfig jwtAuthenticationConfig;
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean // Đăng ký cấu hình bảo mật cho Spring
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        // Cấu hình quyền truy cập API
        httpSecurity.authorizeHttpRequests(request ->request
                .requestMatchers(HttpMethod.POST,
                        "/auth/register",
                        "/auth/verify-email",
                        "/auth/login",
                        "/auth/refresh_token",
                        "/auth/introspect",
                        "/auth/logout",
                        "/auth/forgot-password",
                        "/auth/reset-password"
                ).permitAll()

                .requestMatchers(
                        HttpMethod.GET,
                        "/faq-categories",
                        "/faq-categories/{id}",
                        "/faqs",
                        "/faqs/{id}"
                ).permitAll()
                .anyRequest()
                .authenticated());


        // Cấu hình xác thực JWT
        httpSecurity.oauth2ResourceServer(
                oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer
                                .decoder(customJwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConfig.jwtAuthenticationConverter())) // Kiểm tra các quyền hạn
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint) // xử lý những lỗi liên quan đến việc xác thực
        );

        // Cấu hình CORS
        httpSecurity.cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()));

        // Tắt CSRF (vì đang làm REST API dùng JWT, không dùng session)
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        return httpSecurity.build();
    }

}
