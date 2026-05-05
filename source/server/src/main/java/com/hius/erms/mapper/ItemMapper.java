package com.hius.erms.mapper;

import com.hius.erms.entity.ItemEntity;
import com.hius.erms.io.ItemRequest;
import com.hius.erms.io.ItemResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ItemMapper {

    @Mapping(source = "category.categoryId", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    ItemResponse toResponse(ItemEntity entity);

    ItemEntity toEntity(ItemRequest request);
}
