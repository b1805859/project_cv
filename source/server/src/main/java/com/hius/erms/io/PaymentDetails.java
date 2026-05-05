package com.hius.erms.io;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private PaymentStatus status;

    public enum PaymentStatus{
        PENDING, COMPLETED, FAILED
    }
}
