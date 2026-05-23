package com.hius.erms.mapper;

import com.hius.erms.entity.BlogPostEntity;
import com.hius.erms.io.BlogPostRequest;
import com.hius.erms.io.BlogPostResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BlogPostMapper {

    @Mapping(source = "blogId", target = "blogId")
    @Mapping(source = "createAt", target = "createAt")
    @Mapping(source = "updateAt", target = "updateAt")
    BlogPostResponse toResponse(BlogPostEntity entity);

    BlogPostEntity toEntity(BlogPostRequest request);
}

