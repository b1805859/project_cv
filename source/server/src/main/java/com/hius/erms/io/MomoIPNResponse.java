package com.hius.erms.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MomoIPNResponse {
    private String partnerCode;
    private String orderId;
    private String orderInfo;
    private String orderType;
    private String transId;
    private String resultCode;
    private String message;
    private String payType;
    private String amount;
    private String responseTime;
    private String extraData;
    private String signature;
}
