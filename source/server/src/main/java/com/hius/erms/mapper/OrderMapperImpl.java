package com.hius.erms.mapper;

import com.hius.erms.entity.OrderEntity;
import com.hius.erms.entity.OrderItemEntity;
import com.hius.erms.io.OrderRequest;
import com.hius.erms.io.OrderResponse;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public OrderEntity toEntity(OrderRequest request) {
        if (request == null) {
            return null;
        }

        OrderEntity.OrderEntityBuilder builder = OrderEntity.builder();

        builder.customerName(request.getCustomerName());
        builder.customerPhone(request.getCustomerPhone());
        builder.customerEmail(request.getCustomerEmail());
        builder.customerAddress(request.getCustomerAddress());
        builder.city(request.getCity());
        builder.note(request.getNote());
        builder.promoCode(request.getPromoCode());
        builder.paymentMethod(request.getPaymentMethod());

        // Null-safe Double to BigDecimal conversions
        builder.subtotal(request.getSubtotal() != null ? BigDecimal.valueOf(
                request.getSubtotal()) : null);
        builder.shipping(request.getShipping() != null ? BigDecimal.valueOf(
                request.getShipping()) : null);
        builder.discount(request.getDiscount() != null ? BigDecimal.valueOf(
                request.getDiscount()) : null);
        builder.amount(request.getGrandTotal() != null ? BigDecimal.valueOf(
                request.getGrandTotal()) : null);

        // Map nested items
        if (request.getCartItems() != null) {
            List<OrderItemEntity> items = new ArrayList<>();
            for (OrderRequest.OrderItemRequest itemRequest : request.getCartItems()) {
                items.add(toItemEntity(itemRequest));
            }
            builder.items(items);
        }

        return builder.build();
    }

    @Override
    public OrderResponse toResponse(OrderEntity entity) {
        if (entity == null) {
            return null;
        }

        OrderResponse.OrderResponseBuilder builder = OrderResponse.builder();

        builder.orderId(entity.getOrderId());
        builder.customerName(entity.getCustomerName());
        builder.customerPhone(entity.getCustomerPhone());
        builder.customerEmail(entity.getCustomerEmail());
        builder.customerAddress(entity.getCustomerAddress());
        builder.subtotal(entity.getSubtotal());
        builder.shipping(entity.getShipping());
        builder.discount(entity.getDiscount());
        builder.amount(entity.getAmount());
        builder.promoCode(entity.getPromoCode());
        builder.paymentMethod(entity.getPaymentMethod());
        builder.status(
                entity.getStatus() != null ? entity.getStatus().name() : null);
        builder.momoTransId(entity.getMomoTransId());
        builder.createdAt(entity.getCreatedAt());

        // Map nested items
        if (entity.getItems() != null) {
            List<OrderResponse.OrderItemResponse> items = new ArrayList<>();
            for (OrderItemEntity itemEntity : entity.getItems()) {
                items.add(toItemResponse(itemEntity));
            }
            builder.items(items);
        }

        return builder.build();
    }

    @Override
    public OrderItemEntity toItemEntity(OrderRequest.OrderItemRequest request) {
        if (request == null) {
            return null;
        }

        OrderItemEntity.OrderItemEntityBuilder builder = OrderItemEntity.builder();

        builder.itemId(request.getItemId());
        builder.name(request.getName());
        builder.price(request.getPrice());
        builder.quantity(request.getQuantity());

        return builder.build();
    }

    @Override
    public OrderResponse.OrderItemResponse toItemResponse(
            OrderItemEntity entity) {
        if (entity == null) {
            return null;
        }

        OrderResponse.OrderItemResponse.OrderItemResponseBuilder builder = OrderResponse.OrderItemResponse.builder();

        builder.itemId(entity.getItemId());
        builder.name(entity.getName());
        builder.price(entity.getPrice());
        builder.quantity(entity.getQuantity());

        return builder.build();
    }
}
