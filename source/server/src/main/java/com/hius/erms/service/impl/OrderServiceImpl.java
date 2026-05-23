package com.hius.erms.service.impl;

import com.hius.erms.entity.ItemEntity;
import com.hius.erms.entity.OrderEntity;
import com.hius.erms.entity.OrderItemEntity;
import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.OrderRequest;
import com.hius.erms.io.OrderResponse;
import com.hius.erms.mapper.OrderMapper;
import com.hius.erms.repository.ItemRepository;
import com.hius.erms.repository.OrderRepository;
import com.hius.erms.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;
    private final OrderMapper orderMapper;
    private final Random random = new Random();

    @Override
    @Transactional
    public OrderResponse placeOrder(OrderRequest request) {
        log.info("Placing order for customer: {}", request.getCustomerName());

        // Validate and update stock for each item
        if (request.getCartItems() == null ||
                request.getCartItems().isEmpty()) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        // Map request to Entity
        OrderEntity orderEntity = orderMapper.toEntity(request);

        // Generate unique order ID
        String orderId = "TZ-" + LocalDate.now().getYear() + "-" +
                String.format("%04d", random.nextInt(10000)) + "-" +
                UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        orderEntity.setOrderId(orderId);
        orderEntity.setStatus(OrderEntity.OrderStatus.PENDING);

        // Process item references and adjust stock
        for (OrderItemEntity item : orderEntity.getItems()) {
            ItemEntity dbItem = itemRepository.findByItemId(item.getItemId())
                    .orElseThrow(
                            () -> new AppException(ErrorCode.ITEM_NOT_FOUND));

            if (dbItem.getStock() < item.getQuantity()) {
                log.warn("Item {} out of stock. Requested: {}, Available: {}",
                        dbItem.getName(), item.getQuantity(),
                        dbItem.getStock());
                throw new AppException(ErrorCode.OUT_OF_STOCK);
            }

            // Deduct stock
            dbItem.setStock(dbItem.getStock() - item.getQuantity());
            dbItem.setSold(dbItem.getSold() + item.getQuantity());
            itemRepository.save(dbItem);

            // Populate item details to be safe
            item.setName(dbItem.getName());
            item.setPrice(dbItem.getPrice().doubleValue());
        }

        OrderEntity savedOrder = orderRepository.save(orderEntity);
        log.info("Order placed successfully with ID: {}",
                savedOrder.getOrderId());
        return orderMapper.toResponse(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> fetchAllOrders() {
        log.info("Fetching all orders");
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(String orderId) {
        log.info("Getting order by ID: {}", orderId);
        OrderEntity order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(String orderId, String status) {
        log.info("Updating order status for order: {} to {}", orderId, status);
        OrderEntity order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        try {
            OrderEntity.OrderStatus orderStatus = OrderEntity.OrderStatus.valueOf(
                    status.toUpperCase());
            order.setStatus(orderStatus);
        } catch (IllegalArgumentException e) {
            log.error("Invalid status value: {}", status);
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }

        OrderEntity updatedOrder = orderRepository.save(order);
        log.info("Order status updated successfully");
        return orderMapper.toResponse(updatedOrder);
    }
}
