package com.hius.erms.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String customerAddress;
    private String city;
    private String note;
    private List<OrderItemRequest> cartItems;
    private Double subtotal;
    private Double shipping;
    private Double discount;
    private Double grandTotal;
    private String promoCode;
    private String paymentMethod; // MOMO or COD

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemRequest {
        private String itemId;
        private String name;
        private Double price;
        private Integer quantity;
    }
}
