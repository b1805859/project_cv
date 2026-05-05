package com.hius.erms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_order_items")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String itemId;
    private String name;
    private Double price;
    private Integer quantity;
}
