package com.hius.erms.service;

import com.hius.erms.io.FileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    FileUploadResponse upload(MultipartFile file);
}
