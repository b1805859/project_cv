package com.hius.erms.service;

import com.hius.erms.io.NotificationResponse;

import java.util.List;

public interface NotificationService {

    List<NotificationResponse> getAll();

    NotificationResponse markAsRead(String notificationId);

    void markAllAsRead();

    void delete(String notificationId);

    void clearAll();
}

