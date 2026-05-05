package com.hius.erms.exception;

import com.hius.erms.io.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<?>> handleAppException(AppException ex) {
        log.error("AppException occurred", ex);
        return ResponseEntity.status(ex.getErrorCode().getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getErrorCode().getMessage())
                        .build());

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleException(Exception ex) {
        log.error("GlobalException occurred", ex.getMessage(), ex);
        return ResponseEntity
                .status(ErrorCode.INTERNAL_ERROR.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ErrorCode.INTERNAL_ERROR.getMessage())
                        .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidation(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .orElse("Invalid input");

        return ResponseEntity
                .status(ErrorCode.VALIDATION_ERROR.getStatus())
                .body(ApiResponse.builder()
                        .success(false)
                        .message(message)
                        .build());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity
                .status(401)
                .body(ApiResponse.builder()
                        .success(false)
                        .message("Invalid username or password")
                        .build());
    }
}