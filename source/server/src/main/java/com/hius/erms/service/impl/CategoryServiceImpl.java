package com.hius.erms.service.impl;

import com.hius.erms.entity.CategoryEntity;
import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.CategoryRequest;
import com.hius.erms.io.CategoryResponse;
import com.hius.erms.mapper.CategoryMapper;
import com.hius.erms.repository.CategoryRepository;
import com.hius.erms.repository.ItemRepository;
import com.hius.erms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementation of {@link CategoryService} that handles business logic
 * related to category management such as create, read and delete operations.
 */
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    private final CategoryMapper categoryMapper;

    /**
     * Creates a new category.
     *
     * <p>Flow:
     * <ul>
     *     <li>Map request DTO to entity</li>
     *     <li>Check if category name already exists</li>
     *     <li>Generate unique ID</li>
     *     <li>Persist entity to database</li>
     *     <li>Map entity to response DTO</li>
     * </ul>
     *
     * @param request the category request containing input data
     * @return {@link CategoryResponse} containing created category information
     * @throws AppException if category name already exists
     */
    @Override
    @Transactional
    public CategoryResponse add(CategoryRequest request) {
        CategoryEntity newCategory = categoryMapper.toEntity(request);
        newCategory.setCategoryId(UUID.randomUUID().toString());
        try {
            newCategory = categoryRepository.save(newCategory);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.CATEGORY_ALREADY_EXISTS);
        }
        return categoryMapper.toResponse(newCategory);
    }

    /**
     * Retrieves all categories from the database.
     *
     * <p>Flow:
     * <ul>
     *     <li>Fetch all category entities</li>
     *     <li>Map each entity to response DTO</li>
     * </ul>
     *
     * @return list of {@link CategoryResponse}
     */
    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> read() {
        return categoryRepository.findAll().stream()
                .map(category -> {
                    CategoryResponse response = categoryMapper.toResponse(category);
                    response.setCount((int) itemRepository.countByCategory(category));
                    return response;
                }).collect(Collectors.toList());
    }

    /**
     * Deletes a category by its ID.
     *
     * <p>Flow:
     * <ul>
     *     <li>Find category by ID</li>
     *     <li>Throw exception if not found</li>
     *     <li>Delete category from database</li>
     * </ul>
     *
     * @param categoryId the unique identifier of the category
     * @throws AppException if category is not found
     */
    @Override
    @Transactional
    public void delete(String categoryId) {
        CategoryEntity category = categoryRepository.findByCategoryId(
                        categoryId)
                .orElseThrow(
                        () -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        if (itemRepository.existsByCategory(category)) {
            throw new AppException(ErrorCode.CATEGORY_IN_USE);
        }
        categoryRepository.delete(category);
    }
}