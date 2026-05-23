package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.NotificationResponse;
import com.hius.erms.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ApiResponse<List<NotificationResponse>> getAll() {
        return ApiResponse.<List<NotificationResponse>>builder()
                .message("Fetched notifications successfully")
                .data(notificationService.getAll())
                .build();
    }

    @PatchMapping("/{notificationId}/read")
    public ApiResponse<NotificationResponse> markAsRead(@PathVariable String notificationId) {
        return ApiResponse.<NotificationResponse>builder()
                .message("Notification marked as read")
                .data(notificationService.markAsRead(notificationId))
                .build();
    }

    @PatchMapping("/read-all")
    public ApiResponse<Void> markAllAsRead() {
        notificationService.markAllAsRead();
        return ApiResponse.<Void>builder()
                .message("All notifications marked as read")
                .data(null)
                .build();
    }

    @DeleteMapping("/{notificationId}")
    public ApiResponse<Void> delete(@PathVariable String notificationId) {
        notificationService.delete(notificationId);
        return ApiResponse.<Void>builder()
                .message("Notification deleted")
                .data(null)
                .build();
    }

    @DeleteMapping
    public ApiResponse<Void> clearAll() {
        notificationService.clearAll();
        return ApiResponse.<Void>builder()
                .message("All notifications cleared")
                .data(null)
                .build();
    }
}

