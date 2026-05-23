import { orderApi } from "../api/orderApi";

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export const orderService = {
  normalizeOrder(order) {
    if (!order) return null;

    const rawItems = Array.isArray(order.items) ? order.items : [];
    const itemCount =
      typeof order.items === "number"
        ? order.items
        : rawItems.reduce((sum, item) => sum + toNumber(item.quantity ?? item.qty, 0), 0);

    return {
      ...order,
      id: order.orderId ?? order.id,
      date: order.createdAt ?? order.date,
      items: itemCount,
      total: toNumber(order.amount ?? order.total ?? order.grandTotal),
      subtotal: toNumber(order.subtotal),
      shipping: toNumber(order.shipping),
      promoDiscount: toNumber(order.discount ?? order.promoDiscount),
      promoCode: order.promoCode ?? null,
      status: order.status ?? "PENDING",
      payment: order.payment ?? order.paymentMethod ?? "",
      address: {
        name: order.customerName ?? order.address?.name ?? "",
        phone: order.customerPhone ?? order.address?.phone ?? "",
        email: order.customerEmail ?? order.address?.email ?? "",
        address: order.customerAddress ?? order.address?.address ?? "",
        city: order.city ?? order.address?.city ?? "",
      },
      products: rawItems.map((item) => ({
        product: {
          id: item.itemId ?? item.id,
          itemId: item.itemId ?? item.id,
          name: item.name ?? "",
          price: toNumber(item.price),
          emoji: item.emoji ?? "",
        },
        qty: toNumber(item.quantity ?? item.qty, 1),
      })),
    };
  },

  buildOrderPayload({ cart, form, subtotal, shipping, discount, grandTotal, promoCode, payment }) {
    return {
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
      customerAddress: form.address,
      city: form.city,
      note: form.note,
      cartItems: cart.map((item) => ({
        itemId: item.product.itemId ?? item.product.id,
        name: item.product.name,
        price: Number(item.product.price),
        quantity: Number(item.qty),
      })),
      subtotal: Number(subtotal),
      shipping: Number(shipping),
      discount: Number(discount),
      grandTotal: Number(grandTotal),
      promoCode,
      paymentMethod: payment === "momo" ? "MOMO" : "COD",
    };
  },

  async placeOrder(orderData) {
    const response = await orderApi.placeOrder(orderData);
    return this.normalizeOrder(response.data);
  },

  async getOrderDetails(orderId) {
    const response = await orderApi.getOrderDetails(orderId);
    return this.normalizeOrder(response.data);
  },

  async getAllOrders() {
    const response = await orderApi.fetchAllOrders();
    const rawList = response.data || [];
    return rawList.map((order) => this.normalizeOrder(order)).filter(Boolean);
  },

  async updateOrderStatus(orderId, status) {
    const response = await orderApi.updateOrderStatus(orderId, status);
    return this.normalizeOrder(response.data);
  },
};
