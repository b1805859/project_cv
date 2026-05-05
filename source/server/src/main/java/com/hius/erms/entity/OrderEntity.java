package com.hius.erms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "tbl_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private BigDecimal amount;
    private String description;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    private String momoTransId;
    private String momoOrderId;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    public enum OrderStatus {
        PENDING, PAID, FAILED, CANCELLED
    }
}