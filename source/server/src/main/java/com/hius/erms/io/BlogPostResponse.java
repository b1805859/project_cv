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
public class BlogPostResponse {
    private String blogId;
    private String title;
    private String content;
    private String excerpt;
    private String tag;
    private String emoji;
    private String author;
    private String date;
    private String readTime;
    private String views;
    private Timestamp createAt;
    private Timestamp updateAt;
}

