package com.hius.erms.service.impl;

import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.BlogPostRequest;
import com.hius.erms.io.BlogPostResponse;
import com.hius.erms.mapper.BlogPostMapper;
import com.hius.erms.repository.BlogPostRepository;
import com.hius.erms.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogPostRepository blogPostRepository;
    private final BlogPostMapper blogPostMapper;

    @Override
    public BlogPostResponse add(BlogPostRequest request) {
        if (request == null) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        if (request.getBlogId() == null || request.getBlogId().isBlank()) {
            throw new AppException(ErrorCode.VALIDATION_ERROR);
        }

        if (blogPostRepository.existsByBlogId(request.getBlogId())) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        return blogPostMapper.toResponse(
                blogPostRepository.save(blogPostMapper.toEntity(request))
        );
    }

    @Override
    public List<BlogPostResponse> read() {
        return blogPostRepository.findAll().stream()
                .map(blogPostMapper::toResponse)
                .toList();
    }

    @Override
    public BlogPostResponse getByBlogId(String blogId) {
        if (blogId == null || blogId.isBlank()) {
            throw new AppException(ErrorCode.VALIDATION_ERROR);
        }

        return blogPostRepository.findByBlogId(blogId)
                .map(blogPostMapper::toResponse)
                .orElseThrow(() -> new AppException(ErrorCode.BAD_REQUEST));
    }
}

