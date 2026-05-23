package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.CategoryResponse;
import com.hius.erms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryUserController {

    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> fetchCategories() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .message("Fetched categories successfully")
                .data(categoryService.read())
                .build();
    }
}
