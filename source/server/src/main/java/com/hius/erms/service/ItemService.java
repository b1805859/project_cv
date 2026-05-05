package com.hius.erms.service;

import com.hius.erms.io.ItemRequest;
import com.hius.erms.io.ItemResponse;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
