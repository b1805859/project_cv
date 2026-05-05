package com.hius.erms.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // ================= AUTH =================
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Unauthorized"),
    INVALID_CREDENTIALS(HttpStatus.BAD_REQUEST, "Invalid username or password"),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Token expired"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "Access denied"),
    LOGIN_FAILED(HttpStatus.BAD_REQUEST, "Login failed"),

    // ================= USER =================
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    USER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "User already exists"),
    USERNAME_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Username already exists"),
    EMAIL_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Email already exists"),
    INVALID_USER_DATA(HttpStatus.BAD_REQUEST, "Invalid user data"),
    EMAIL_OR_PASSWORD_IS_INCORRECT(HttpStatus.BAD_REQUEST, "Email or password is incorrect"),

    // ================= CATEGORY =================
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Category not found"),
    CATEGORY_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Category already exists"),
    INVALID_CATEGORY_DATA(HttpStatus.BAD_REQUEST, "Invalid category data"),
    CATEGORY_IN_USE(HttpStatus.BAD_REQUEST,
            "Category is in use and cannot be deleted"),

    // ================= ITEM =================
    ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "Item not found"),
    ITEM_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Item already exists"),
    INVALID_ITEM_DATA(HttpStatus.BAD_REQUEST, "Invalid item data"),
    OUT_OF_STOCK(HttpStatus.BAD_REQUEST, "Item out of stock"),

    // ================= MOMO =================
    MOMO_PAYMENT_FAILED(HttpStatus.BAD_REQUEST, "MoMo payment failed"),
    MOMO_INVALID_SIGNATURE(HttpStatus.BAD_REQUEST, "MoMo signature verification failed"),
    MOMO_INVALID_REQUEST(HttpStatus.BAD_REQUEST, "Invalid MoMo request data"),
    MOMO_DUPLICATE_ORDER(HttpStatus.BAD_REQUEST, "Duplicate MoMo order ID"),
    MOMO_ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "MoMo order not found"),
    MOMO_REFUND_FAILED(HttpStatus.BAD_REQUEST, "MoMo refund failed"),
    MOMO_QUERY_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "MoMo query transaction failed"),
    MOMO_CONFIG_INVALID(HttpStatus.INTERNAL_SERVER_ERROR, "MoMo configuration invalid"),
    MOMO_NETWORK_ERROR(HttpStatus.SERVICE_UNAVAILABLE, "MoMo service unavailable"),
    MOMO_INSUFFICIENT_BALANCE(HttpStatus.BAD_REQUEST, "Insufficient balance in MoMo wallet"),

    // ================= COMMON =================
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Bad request"),
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Validation error"),

    // ================= SYSTEM =================
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),

    // ================= FILE =================
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed"),
    FILE_EMPTY(HttpStatus.BAD_REQUEST, "File is empty"),
    FILE_TOO_LARGE(HttpStatus.BAD_REQUEST, "File size exceeds limit"),
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "Invalid file type"),
    FILE_NOT_FOUND(HttpStatus.NOT_FOUND, "File not found"),
    FILE_DELETE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "File delete failed");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
