package com.hius.erms.service;

import com.hius.erms.io.OrderRequest;
import com.hius.erms.io.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(OrderRequest request);

    List<OrderResponse> fetchAllOrders();

    OrderResponse getOrderById(String orderId);

    OrderResponse updateOrderStatus(String orderId, String status);
}
