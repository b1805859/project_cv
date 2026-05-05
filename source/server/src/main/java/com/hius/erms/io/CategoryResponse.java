package com.hius.erms.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class CategoryResponse {
    private String categoryId;
    private String name;
    private String description;
    private String bgColor;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String imgUrl;
    private Integer items;
}
