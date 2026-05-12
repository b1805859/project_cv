import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { formatPrice, formatDate } from "../utils/helpers";
import { OrderTimeline } from "../components/OrderTimeline/OrderTimeline";

export function OrdersPage() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p, d) => {
    dispatch({ type: "SET_PAGE", page: p, data: d });
    window.scrollTo(0, 0);
  };
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statusConfig = {
    PENDING: { label: "Chờ xử lý", class: "badge-orange" },
    PAID: { label: "Đã thanh toán", class: "badge-cyan" },
    SHIPPING: { label: "Đang giao", class: "badge-purple" },
    COMPLETED: { label: "Hoàn thành", class: "badge-green" },
    CANCELLED: { label: "Đã hủy", class: "badge-red" },
  };

  if (!state.user)
    return (
      <div
        className="page"
        style={{ padding: "100px 24px", textAlign: "center" }}
      >
        <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 24,
            marginBottom: 10,
          }}
        >
          Cần đăng nhập
        </h2>
        <button className="btn btn-primary" onClick={() => nav("login")}>
          Đăng nhập
        </button>
      </div>
    );

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-title">📦 Đơn hàng của tôi</h1>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
            {state.orders.length} đơn hàng
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 24px" }}>
        {state.orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <div className="empty-text">Chưa có đơn hàng nào</div>
            <button
              className="btn btn-primary"
              style={{ marginTop: 16 }}
              onClick={() => nav("products")}
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {state.orders.map((order) => {
              const cfg = statusConfig[order.status] || {
                label: order.status,
                class: "badge-cyan",
              };
              const isExpanded = expandedOrder === order.id;
              return (
                <div key={order.id} className="card" style={{ padding: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 6,
                          flexWrap: "wrap",
                        }}
                      >
                        <strong
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--accent)",
                          }}
                        >
                          {order.id}
                        </strong>
                        <span className={`badge ${cfg.class}`}>
                          {cfg.label}
                        </span>
                        <span className="badge badge-purple">
                          {order.payment}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>
                        Ngày đặt: {formatDate(order.date)} · {order.items} sản
                        phẩm
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-head)",
                          fontSize: 20,
                          fontWeight: 800,
                          color: "var(--accent)",
                        }}
                      >
                        {formatPrice(order.total)}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() =>
                            setExpandedOrder(isExpanded ? null : order.id)
                          }
                        >
                          {isExpanded ? "▲ Ẩn" : "▼ Chi tiết"}
                        </button>
                        {(order.status === "PAID" ||
                          order.status === "COMPLETED" ||
                          order.status === "SHIPPING") && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() =>
                              nav("invoice", { orderId: order.id })
                            }
                          >
                            🧾 Hóa đơn
                          </button>
                        )}
                        {order.status === "PENDING" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              dispatch({
                                type: "UPDATE_ORDER_STATUS",
                                id: order.id,
                                status: "CANCELLED",
                              });
                              dispatch({
                                type: "ADD_TOAST",
                                toast: {
                                  type: "info",
                                  title: "Đã hủy đơn hàng",
                                },
                              });
                            }}
                          >
                            Hủy đơn
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TIMELINE */}
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: 16,
                        paddingTop: 16,
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <OrderTimeline status={order.status} />
                      {order.products && order.products.length > 0 && (
                        <div style={{ marginTop: 16 }}>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "var(--muted)",
                              textTransform: "uppercase",
                              letterSpacing: 1,
                              marginBottom: 10,
                            }}
                          >
                            Sản phẩm
                          </div>
                          {order.products.map((item, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 8,
                                padding: "8px 12px",
                                background: "var(--card2)",
                                borderRadius: 8,
                              }}
                            >
                              <span style={{ fontSize: 24 }}>
                                {item.product.emoji}
                              </span>
                              <div style={{ flex: 1, fontSize: 13 }}>
                                {item.product.name}
                              </div>
                              <span
                                style={{ fontSize: 12, color: "var(--muted)" }}
                              >
                                ×{item.qty}
                              </span>
                              <strong
                                style={{
                                  fontFamily: "var(--font-head)",
                                  color: "var(--accent)",
                                  fontSize: 14,
                                }}
                              >
                                {formatPrice(item.product.price * item.qty)}
                              </strong>
                            </div>
                          ))}
                        </div>
                      )}
                      {order.address && (
                        <div
                          style={{
                            marginTop: 12,
                            padding: "10px 14px",
                            background: "var(--card2)",
                            borderRadius: 8,
                            fontSize: 12,
                            color: "var(--muted2)",
                          }}
                        >
                          📍 Giao đến: {order.address.address},{" "}
                          {order.address.city} · 📞 {order.address.phone}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
