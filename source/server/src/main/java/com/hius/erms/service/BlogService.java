package com.hius.erms.service;

import com.hius.erms.io.BlogPostRequest;
import com.hius.erms.io.BlogPostResponse;

import java.util.List;

public interface BlogService {
    BlogPostResponse add(BlogPostRequest request);

    List<BlogPostResponse> read();

    BlogPostResponse getByBlogId(String blogId);
}

