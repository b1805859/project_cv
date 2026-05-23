package com.hius.erms.mapper;

import com.hius.erms.entity.OrderEntity;
import com.hius.erms.entity.OrderItemEntity;
import com.hius.erms.io.OrderRequest;
import com.hius.erms.io.OrderResponse;

public interface OrderMapper {

    OrderEntity toEntity(OrderRequest request);

    OrderResponse toResponse(OrderEntity entity);

    OrderItemEntity toItemEntity(OrderRequest.OrderItemRequest request);

    OrderResponse.OrderItemResponse toItemResponse(OrderItemEntity entity);
}
