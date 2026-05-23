package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.ItemResponse;
import com.hius.erms.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemUserController {

    private final ItemService itemService;

    @GetMapping
    public ApiResponse<List<ItemResponse>> fetchItems(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String brand) {

        List<ItemResponse> data;
        if ((keyword != null && !keyword.isBlank()) ||
                (categoryId != null && !categoryId.isBlank()) ||
                (brand != null && !brand.isBlank())) {
            data = itemService.searchItems(keyword, categoryId, brand);
        } else {
            data = itemService.fetchItems();
        }

        return ApiResponse.<List<ItemResponse>>builder()
                .message("Fetched items successfully")
                .data(data)
                .build();
    }

    @GetMapping("/{itemId}")
    public ApiResponse<ItemResponse> getById(@PathVariable String itemId) {
        return ApiResponse.<ItemResponse>builder()
                .message("Fetched item details successfully")
                .data(itemService.getById(itemId))
                .build();
    }
}
