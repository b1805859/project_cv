package com.hius.erms.service;

import com.hius.erms.io.MomoCreateResponse;
import com.hius.erms.io.MomoIPNResponse;

public interface MomoService {

    MomoCreateResponse createQR(String orderId, long amount);

    void handleIPN(MomoIPNResponse ipnResponse);
}