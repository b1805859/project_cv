package com.hius.erms.service.impl;

import com.hius.erms.entity.CategoryEntity;
import com.hius.erms.entity.ItemEntity;
import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.ItemRequest;
import com.hius.erms.io.ItemResponse;
import com.hius.erms.mapper.ItemMapper;
import com.hius.erms.repository.CategoryRepository;
import com.hius.erms.repository.ItemRepository;
import com.hius.erms.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service implementation for managing item-related operations.
 * <p>
 * This class handles business logic for creating, retrieving,
 * and deleting items in the system.
 */
@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    /**
     * Creates a new item.
     *
     * @param request the item request containing item details
     * @return the created item as {@link ItemResponse}
     * @throws AppException if the category is not found
     */
    @Override
    @Transactional
    public ItemResponse add(ItemRequest request) {
        CategoryEntity existingCategory = categoryRepository
                .findByCategoryId(request.getCategoryId())
                .orElseThrow(
                        () -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        ItemEntity newItem = itemMapper.toEntity(request);
        newItem.setItemId(UUID.randomUUID().toString());
        newItem.setCategory(existingCategory);
        try {
            newItem = itemRepository.save(newItem);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.ITEM_ALREADY_EXISTS);
        }
        return itemMapper.toResponse(newItem);
    }

    /**
     * Retrieves all items from the database.
     *
     * @return a list of {@link ItemResponse}
     */
    @Override
    @Transactional(readOnly = true)
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll().stream().map(itemMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Deletes an item by its ID.
     *
     * @param itemId the unique identifier of the item
     * @throws AppException if the item is not found
     */
    @Override
    @Transactional
    public void deleteItem(String itemId) {
        ItemEntity itemEntity = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new AppException(ErrorCode.ITEM_NOT_FOUND));
        itemRepository.delete(itemEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemResponse> searchItems(String keyword, String categoryId, String brand) {
        return itemRepository.searchItems(
                keyword != null && !keyword.isBlank() ? keyword : null,
                categoryId != null && !categoryId.isBlank() ? categoryId : null,
                brand != null && !brand.isBlank() ? brand : null
        ).stream().map(itemMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ItemResponse getById(String itemId) {
        ItemEntity item = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new AppException(ErrorCode.ITEM_NOT_FOUND));
        return itemMapper.toResponse(item);
    }

    @Override
    @Transactional
    public ItemResponse update(String itemId, ItemRequest request) {
        ItemEntity item = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new AppException(ErrorCode.ITEM_NOT_FOUND));

        CategoryEntity existingCategory = categoryRepository
                .findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        item.setName(request.getName());
        item.setPrice(request.getPrice());
        item.setOldPrice(request.getOldPrice());
        item.setCategory(existingCategory);
        item.setDescription(request.getDescription());
        item.setImgUrl(request.getImgUrl());
        item.setEmoji(request.getEmoji());
        item.setSold(request.getSold());
        item.setStock(request.getStock());
        item.setBrand(request.getBrand());
        item.setSpecs(request.getSpecs());
        item.setIsNew(request.getIsNew());
        item.setIsHot(request.getIsHot());
        item.setRating(request.getRating());
        item.setReviews(request.getReviews());

        item = itemRepository.save(item);
        return itemMapper.toResponse(item);
    }
}