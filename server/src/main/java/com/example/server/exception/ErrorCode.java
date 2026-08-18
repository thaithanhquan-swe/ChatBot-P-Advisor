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
