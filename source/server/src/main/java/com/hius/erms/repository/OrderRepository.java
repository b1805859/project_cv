package com.hius.erms.repository;

import com.hius.erms.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    Optional<OrderEntity> findByOrderId(String orderId);

    Optional<OrderEntity> findByMomoOrderId(String momoOrderId);
}