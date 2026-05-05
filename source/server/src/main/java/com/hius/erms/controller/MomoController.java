package com.hius.erms.controller;

import com.hius.erms.io.MomoCreateResponse;
import com.hius.erms.service.MomoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/momo")
@Slf4j
@RequiredArgsConstructor
public class MomoController {

  private final MomoService momoService;

  @PostMapping("/create")
  public MomoCreateResponse createQR() {
    return momoService.createQR();
  }

}