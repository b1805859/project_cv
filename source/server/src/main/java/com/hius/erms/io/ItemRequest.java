package com.hius.erms.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemRequest {
    private String name;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private String categoryId;
    private String description;
    private String imgUrl;
    private String emoji;
    private Integer sold;
    private Integer stock;
    private String brand;
    private String specs; // JSON string
    private Boolean isNew;
    private Boolean isHot;
    private Double rating;
    private Integer reviews;
}

