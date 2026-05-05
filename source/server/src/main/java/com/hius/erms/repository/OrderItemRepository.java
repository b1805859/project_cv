package com.hius.erms.repository;

import com.hius.erms.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {

}
