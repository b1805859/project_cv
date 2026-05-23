package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.BlogPostRequest;
import com.hius.erms.io.BlogPostResponse;
import com.hius.erms.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blogs")
public class BlogController {

    private final BlogService blogService;

    @PostMapping
    public ApiResponse<BlogPostResponse> add(@RequestBody BlogPostRequest request) {
        return ApiResponse.<BlogPostResponse>builder()
                .message("Blog post created successfully")
                .data(blogService.add(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<BlogPostResponse>> readAll() {
        return ApiResponse.<List<BlogPostResponse>>builder()
                .message("Fetched blog posts successfully")
                .data(blogService.read())
                .build();
    }

    @GetMapping("/{blogId}")
    public ApiResponse<BlogPostResponse> getById(@PathVariable String blogId) {
        return ApiResponse.<BlogPostResponse>builder()
                .message("Fetched blog post successfully")
                .data(blogService.getByBlogId(blogId))
                .build();
    }
}

