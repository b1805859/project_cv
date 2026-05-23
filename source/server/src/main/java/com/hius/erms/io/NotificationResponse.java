package com.hius.erms.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    /**
     * FE supports either notificationId or id
     */
    private String notificationId;

    private Long id;

    private String title;
    private String sub;

    private boolean unread;

    private String icon;
    private String iconBg;

    /** FE reads time/timeText/createAt */
    private String time;

    private Timestamp createAt;
    private Timestamp updateAt;
}

