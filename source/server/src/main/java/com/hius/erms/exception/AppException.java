package com.hius.erms.exception;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private final ErrorCode errorCode;
    private final Object data;

    public AppException(ErrorCode errorCode, Object data) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.data = data;
    }

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.data = null;
    }
}
