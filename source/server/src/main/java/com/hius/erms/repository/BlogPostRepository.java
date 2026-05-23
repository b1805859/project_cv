package com.hius.erms.repository;

import com.hius.erms.entity.BlogPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPostEntity, Long> {
    Optional<BlogPostEntity> findByBlogId(String blogId);
    boolean existsByBlogId(String blogId);
}

