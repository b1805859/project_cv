package com.hius.erms.service;

import com.hius.erms.io.CategoryRequest;
import com.hius.erms.io.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request);

    List<CategoryResponse> read();

    void delete(String categoryCode);
}
