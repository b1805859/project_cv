package com.hius.erms.service;

import com.hius.erms.io.ItemRequest;
import com.hius.erms.io.ItemResponse;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request);

    List<ItemResponse> fetchItems();

    List<ItemResponse> searchItems(String keyword, String categoryId, String brand);

    ItemResponse getById(String itemId);

    ItemResponse update(String itemId, ItemRequest request);

    void deleteItem(String itemId);
}
