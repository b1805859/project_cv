package com.hius.erms.repository;

import com.hius.erms.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {

    Optional<NotificationEntity> findByNotificationId(String notificationId);

    boolean existsByNotificationId(String notificationId);

    void deleteByNotificationId(String notificationId);

    List<NotificationEntity> findAllByOrderByCreateAtDesc();
}

