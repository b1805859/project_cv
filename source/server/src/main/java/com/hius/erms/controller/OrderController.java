package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.OrderRequest;
import com.hius.erms.io.OrderResponse;
import com.hius.erms.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrderResponse> placeOrder(
            @RequestBody OrderRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .message("Order placed successfully")
                .data(orderService.placeOrder(request))
                .build();
    }

    @GetMapping("/{orderId}")
    public ApiResponse<OrderResponse> getOrder(@PathVariable String orderId) {
        return ApiResponse.<OrderResponse>builder()
                .message("Fetched order successfully")
                .data(orderService.getOrderById(orderId))
                .build();
    }
}
