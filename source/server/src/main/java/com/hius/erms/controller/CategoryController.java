package com.hius.erms.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.CategoryRequest;
import com.hius.erms.io.CategoryResponse;
import com.hius.erms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing category resources.
 */
@RestController
@RequestMapping("/admin/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final ObjectMapper objectMapper;

    /**
     * Create a new category.
     */
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<CategoryResponse> addCategory(
            @RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .message("Category created successfully")
                .data(categoryService.add(request))
                .build();
    }

    /**
     * Retrieve all categories.
     */
    @GetMapping
    public ApiResponse<List<CategoryResponse>> fetchCategories() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .message("Fetched categories successfully")
                .data(categoryService.read())
                .build();
    }

    /**
     * Delete a category by its ID.
     */
    @DeleteMapping("/{categoryId}")
    public ApiResponse<Void> remove(@PathVariable String categoryId) {
        categoryService.delete(categoryId);

        return ApiResponse.<Void>builder()
                .message("Category deleted successfully")
                .build();
    }
}