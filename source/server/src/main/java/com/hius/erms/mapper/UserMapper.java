package com.hius.erms.mapper;

import com.hius.erms.entity.UserEntity;
import com.hius.erms.io.UserRequest;
import com.hius.erms.io.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(UserEntity entity);

    UserEntity toEntity(UserRequest request);
}
