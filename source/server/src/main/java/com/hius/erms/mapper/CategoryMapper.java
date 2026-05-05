package com.hius.erms.mapper;

import com.hius.erms.entity.CategoryEntity;
import com.hius.erms.io.CategoryRequest;
import com.hius.erms.io.CategoryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toResponse(CategoryEntity entity);

    CategoryEntity toEntity(CategoryRequest request);

}
