package com.hius.erms.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {
    private String itemId;
    private String name;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private String categoryId;
    private String description;
    private String categoryName;
    private String imgUrl;
    private String emoji;
    private Integer sold;
    private Integer stock;
    private String brand;
    private String specs;
    private Boolean isNew;
    private Boolean isHot;
    private Double rating;
    private Integer reviews;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
