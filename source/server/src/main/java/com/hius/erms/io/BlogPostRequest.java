package com.hius.erms.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostRequest {
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
}

