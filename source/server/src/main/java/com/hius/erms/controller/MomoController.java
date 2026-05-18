package com.hius.erms.controller;

import com.hius.erms.io.MomoCreateResponse;
import com.hius.erms.io.MomoIPNResponse;
import com.hius.erms.service.MomoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/momo")
@Slf4j
@RequiredArgsConstructor
public class MomoController {

    private final MomoService momoService;

    @PostMapping("/create")
    public MomoCreateResponse createQR(
            @RequestParam String orderId,
            @RequestParam long amount) {
        log.info("Request to create MoMo QR for order ID: {}, amount: {}", orderId, amount);
        return momoService.createQR(orderId, amount);
    }

    @PostMapping("/ipn-handler")
    public void handleIPN(@RequestBody MomoIPNResponse ipnResponse) {
        log.info("Received MoMo IPN notification payload: {}", ipnResponse);
        momoService.handleIPN(ipnResponse);
    }
}