package com.hius.erms.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.ItemRequest;
import com.hius.erms.io.ItemResponse;
import com.hius.erms.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing item resources.
 * <p>
 * Supports:
 * <ul>
 *     <li>Create item with image upload</li>
 *     <li>Fetch all items</li>
 *     <li>Delete item</li>
 * </ul>
 * Base path: /admin/items
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/items")
public class ItemController {

    private final ItemService itemService;
    private final ObjectMapper objectMapper;

    /**
     * Create a new item with file upload.
     *
     * @param request JSON ItemRequest
     * @return ApiResponse containing created item
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ItemResponse> addItem(
            @RequestBody ItemRequest request) {

        return ApiResponse.<ItemResponse>builder()
                .message("Item created successfully")
                .data(itemService.add(request))
                .build();
    }

    /**
     * Retrieve all items.
     *
     * @return ApiResponse containing list of items
     */
    @GetMapping
    public ApiResponse<List<ItemResponse>> readItems() {
        return ApiResponse.<List<ItemResponse>>builder()
                .message("Fetched items successfully")
                .data(itemService.fetchItems())
                .build();
    }

    /**
     * Delete item by ID.
     *
     * @param itemId item ID
     * @return ApiResponse with no data
     */
    @DeleteMapping("/{itemId}")
    public ApiResponse<Void> removeItem(@PathVariable String itemId) {
        itemService.deleteItem(itemId);

        return ApiResponse.<Void>builder()
                .message("Item deleted successfully")
                .build();
    }

    /**
     * Retrieve item details by ID for admin.
     *
     * @param itemId item ID
     * @return ApiResponse containing the item
     */
    @GetMapping("/{itemId}")
    public ApiResponse<ItemResponse> getItem(@PathVariable String itemId) {
        return ApiResponse.<ItemResponse>builder()
                .message("Fetched item details successfully")
                .data(itemService.getById(itemId))
                .build();
    }

    /**
     * Update item details.
     *
     * @param itemId item ID
     * @param request JSON ItemRequest payload
     * @return ApiResponse containing updated item
     */
    @PutMapping("/{itemId}")
    public ApiResponse<ItemResponse> updateItem(
            @PathVariable String itemId,
            @RequestBody ItemRequest request) {
        return ApiResponse.<ItemResponse>builder()
                .message("Item updated successfully")
                .data(itemService.update(itemId, request))
                .build();
    }
}