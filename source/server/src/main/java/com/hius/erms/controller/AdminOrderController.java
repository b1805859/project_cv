package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.OrderResponse;
import com.hius.erms.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ApiResponse<List<OrderResponse>> getAllOrders() {
        return ApiResponse.<List<OrderResponse>>builder()
                .message("Fetched all orders successfully")
                .data(orderService.fetchAllOrders())
                .build();
    }

    @PutMapping("/{orderId}/status")
    public ApiResponse<OrderResponse> updateStatus(
            @PathVariable String orderId,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return ApiResponse.<OrderResponse>builder()
                .message("Updated order status successfully")
                .data(orderService.updateOrderStatus(orderId, status))
                .build();
    }
}
