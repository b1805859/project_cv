package com.hius.erms.service.impl;

import com.hius.erms.client.MomoApi;
import com.hius.erms.io.MomoCreateRequest;
import com.hius.erms.io.MomoCreateResponse;
import com.hius.erms.service.MomoService;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MomoServiceImpl implements MomoService {

    @Value("${momo.partner-code}")
    private String PARTNER_CODE;

    @Value("${momo.access-key}")
    private String ACCESS_KEY;

    @Value("${momo.secret-key}")
    private String SECRET_KEY;

    @Value("${momo.return-url}")
    private String REDIRECT_URL;

    @Value("${momo.ipn-url}")
    private String IPN_URL;

    @Value("${momo.request-type}")
    private String REQUEST_TYPE;

    private final MomoApi momoApi;

    @Override
    public MomoCreateResponse createQR(){
        String orderId = UUID.randomUUID().toString();
        String orderInfo = "Thanh toan don hang " + orderId;
        String extraData = "";
        String requestId = UUID.randomUUID().toString();
        long amount = 10000;
        String rawSignature = String.format(
            "accessKey=%s&amount=%s&extraData=%s&ipnUrl=%s&orderId=%s&orderInfo=%s&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=%s",
            ACCESS_KEY, amount, extraData, IPN_URL, orderId, orderInfo, PARTNER_CODE, REDIRECT_URL, requestId, REQUEST_TYPE);

        String prettySignature = "";
        try{
            prettySignature = signHmacSHA256(rawSignature, SECRET_KEY);
        } catch (Exception e) {
            log.error("Co loi khi hash code: {}", e.getMessage());
        }

        if (prettySignature.isBlank()) {
            log.error("Signature is blank, cannot create MomoCreateRequest");
            return null;
        }

        MomoCreateRequest request = MomoCreateRequest.builder()
                .partnerCode(PARTNER_CODE)
                .requestId(requestId)
                .amount(10000)
                .orderId(orderId)
                .orderInfo(orderInfo)
                .redirectUrl(REDIRECT_URL)
                .ipnUrl(IPN_URL)
                .extraData(extraData)
                .requestType(REQUEST_TYPE)
                .lang("vi")
                .signature(prettySignature)
                .build();

        return momoApi.createMomoQR(request);
    }

    private String signHmacSHA256(String data, String key) throws Exception {
        Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        hmacSHA256.init(secretKey);
        byte[] hash = hmacSHA256.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}