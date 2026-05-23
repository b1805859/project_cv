package com.hius.erms.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@lombok.RequiredArgsConstructor

public class DataInitializerNotificationAndChat {

    private final com.hius.erms.repository.NotificationRepository notificationRepository;


    @Bean
    public CommandLineRunner initNotifications() {
        return args -> {
            if (notificationRepository.count() > 0) return;

            // Seed minimal notification set so FE renders immediately
            var seeds = java.util.List.of(
                    com.hius.erms.entity.NotificationEntity.builder()
                            .notificationId("NOTIF-1")
                            .title("Ưu đãi hôm nay")
                            .sub("Giảm giá cho sản phẩm đang hot")
                            .unread(true)
                            .icon("🔥")
                            .iconBg("rgba(255, 107, 53, 0.12)")
                            .time("Vừa xong")
                            .build(),
                    com.hius.erms.entity.NotificationEntity.builder()
                            .notificationId("NOTIF-2")
                            .title("Đơn hàng của bạn")
                            .sub("Đang được xử lý")
                            .unread(true)
                            .icon("📦")
                            .iconBg("rgba(0, 212, 255, 0.15)")
                            .time("1 giờ trước")
                            .build(),
                    com.hius.erms.entity.NotificationEntity.builder()
                            .notificationId("NOTIF-3")
                            .title("Gợi ý cho bạn")
                            .sub("Sản phẩm phù hợp với nhu cầu của bạn")
                            .unread(false)
                            .icon("💡")
                            .iconBg("rgba(123, 47, 247, 0.15)")
                            .time("Hôm qua")
                            .build()
            );

            notificationRepository.saveAll(seeds);
        };
    }
}


