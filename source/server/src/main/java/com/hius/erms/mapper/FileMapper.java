package com.hius.erms.mapper;

import com.hius.erms.io.FileUploadResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FileMapper {

    default FileUploadResponse toResponse(String imgUrl) {
        return new FileUploadResponse(imgUrl);
    }
}
