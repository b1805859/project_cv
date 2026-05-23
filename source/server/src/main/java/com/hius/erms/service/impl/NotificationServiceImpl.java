package com.hius.erms.service.impl;

import com.hius.erms.entity.NotificationEntity;
import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.NotificationResponse;
import com.hius.erms.repository.NotificationRepository;
import com.hius.erms.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<NotificationResponse> getAll() {
        return notificationRepository.findAllByOrderByCreateAtDesc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public NotificationResponse markAsRead(String notificationId) {
        NotificationEntity entity = notificationRepository.findByNotificationId(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.BAD_REQUEST));
        entity.setUnread(false);
        return toResponse(notificationRepository.save(entity));
    }

    @Override
    public void markAllAsRead() {
        List<NotificationEntity> all = notificationRepository.findAllByOrderByCreateAtDesc();
        all.forEach(n -> n.setUnread(false));
        notificationRepository.saveAll(all);
    }

    @Override
    public void delete(String notificationId) {
        if (notificationId == null || notificationId.isBlank()) {
            throw new AppException(ErrorCode.VALIDATION_ERROR);
        }
        notificationRepository.findByNotificationId(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.BAD_REQUEST));
        notificationRepository.deleteByNotificationId(notificationId);
    }

    @Override
    public void clearAll() {
        notificationRepository.deleteAll();
    }

    private NotificationResponse toResponse(NotificationEntity entity) {
        if (entity == null) return null;
        return NotificationResponse.builder()
                .notificationId(entity.getNotificationId())
                .id(entity.getId())
                .title(entity.getTitle())
                .sub(entity.getSub())
                .unread(entity.isUnread())
                .icon(entity.getIcon())
                .iconBg(entity.getIconBg())
                .time(entity.getTime())
                .createAt(entity.getCreateAt())
                .updateAt(entity.getUpdateAt())
                .build();
    }
}

