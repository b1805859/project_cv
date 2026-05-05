package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.FileUploadResponse;
import com.hius.erms.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {
    private final CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ApiResponse<FileUploadResponse> upload(@RequestParam("file") MultipartFile file) {
        return ApiResponse.<FileUploadResponse>builder()
                .data(cloudinaryService.upload(file))
                .build();
    }
}
