package com.example.server.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User exited", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    PHONE_INVALID(1004, "Phone must be at least {min} characters", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1009, "Email is invalid", HttpStatus.BAD_REQUEST),
    INVALID_RESET_TOKEN(1010, "Reset token is invalid or expired", HttpStatus.BAD_REQUEST),
    EMAIL_SEND_FAILED(1011, "Could not send password reset email", HttpStatus.BAD_GATEWAY),
    INVALID_VERIFICATION_TOKEN(1019, "Verification link is invalid or expired", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_VERIFIED(1020, "Email has not been verified", HttpStatus.FORBIDDEN),
    FAQ_CATEGORY_NOT_FOUND(1012, "FAQ category not found", HttpStatus.NOT_FOUND),
    FAQ_CATEGORY_NAME_INVALID(1013, "FAQ category name is required and must not exceed 100 characters", HttpStatus.BAD_REQUEST),
    FAQ_CATEGORY_DESCRIPTION_INVALID(1014, "FAQ category description must not exceed 255 characters", HttpStatus.BAD_REQUEST),
    FAQ_NOT_FOUND(1015, "FAQ not found", HttpStatus.NOT_FOUND),
    FAQ_QUESTION_INVALID(1016, "FAQ question is required and must not exceed 500 characters", HttpStatus.BAD_REQUEST),
    FAQ_ANSWER_INVALID(1017, "FAQ answer is required", HttpStatus.BAD_REQUEST),
    FAQ_CATEGORY_REQUIRED(1018, "FAQ category is required", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not exited", HttpStatus.NOT_FOUND),
    ROLE_NOT_EXISTED(1005, "Role not exited", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
