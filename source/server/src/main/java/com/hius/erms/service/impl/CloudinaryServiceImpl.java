package com.hius.erms.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.FileUploadResponse;
import com.hius.erms.mapper.FileMapper;
import com.hius.erms.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService{

    private final Cloudinary cloudinary;
    private final FileMapper fileMapper;

    public FileUploadResponse upload(MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                throw new AppException(ErrorCode.FILE_EMPTY);
            }

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.emptyMap()
            );
            return fileMapper.toResponse(uploadResult.get("url").toString());
        } catch (IOException e) {
            throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
        }
    }
}
