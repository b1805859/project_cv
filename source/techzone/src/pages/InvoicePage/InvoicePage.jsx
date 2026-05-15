import { useContext } from "react";
import { PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice, formatDate } from "../../utils/helpers";
import "./InvoicePage.scss";

export function InvoicePage() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p) => {
    dispatch({ type: "SET_PAGE", page: p });
    window.scrollTo(0, 0);
  };
  const orderId = state.pageData?.orderId;
  const order = state.orders.find((o) => o.id === orderId) || state.orders[0];

  if (!order)
    return (
      <div className="page" style={{ padding: 100, textAlign: "center" }}>
        <div style={{ fontSize: 60 }}>📄</div>
        <h2>Không tìm thấy hóa đơn</h2>
      </div>
    );

  const items = order.products || [
    { product: PRODUCTS[0], qty: 1 },
    { product: PRODUCTS[2], qty: 2 },
  ];
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 5000000 ? 0 : 30000;
  const discount_val =
    order.payment === "MoMo" ? Math.round(subtotal * 0.01) : 0;
  const total = subtotal + shipping - discount_val;

  return (
    <div className="page invoice-page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span
              onClick={() => nav("orders")}
              style={{ cursor: "pointer", color: "var(--accent)" }}
            >
              Đơn hàng
            </span>
            <span className="breadcrumb-sep">/</span>
            <span>Hóa đơn</span>
          </div>
          <h1 className="page-title">🧾 Hóa đơn điện tử</h1>
        </div>
      </div>
      <div className="invoice-wrapper">
        <div className="invoice-card">
          {/* Header */}
          <div className="invoice-header">
            <div>
              <div className="invoice-logo">TechZone</div>
              <div className="invoice-id">#{order.id}</div>
              <div
                style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}
              >
                Ngày: {formatDate(order.date)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span
                className="badge badge-green"
                style={{ fontSize: 13, padding: "6px 16px" }}
              >
                ✓ ĐÃ THANH TOÁN
              </span>
              <div
                style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}
              >
                Mã GD: {order.id.replace("TZ", "INV")}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                PT: {order.payment}
              </div>
            </div>
          </div>

          {/* Parties */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                background: "var(--card2)",
                borderRadius: 10,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "var(--muted)",
                  marginBottom: 10,
                }}
              >
                Người bán
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                TechZone Vietnam
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted2)",
                  lineHeight: 1.8,
                }}
              >
                <div>123 Đường Công Nghệ, Q.1</div>
                <div>TP. Hồ Chí Minh</div>
                <div>MST: 0312345678</div>
                <div>hotline@techzone.vn</div>
              </div>
            </div>
            <div
              style={{
                background: "var(--card2)",
                borderRadius: 10,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "var(--muted)",
                  marginBottom: 10,
                }}
              >
                Người mua
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                {state.user?.name || "Khách hàng"}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted2)",
                  lineHeight: 1.8,
                }}
              >
                <div>{state.user?.email || "customer@email.com"}</div>
                <div>{order.address?.phone || "0912 345 678"}</div>
                <div>{order.address?.address || "456 Nguyễn Huệ"}</div>
                <div>{order.address?.city || "Hà Nội"}</div>
              </div>
            </div>
          </div>

          {/* Items */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Sản phẩm</th>
                <th style={{ textAlign: "right" }}>Đơn giá</th>
                <th style={{ textAlign: "center" }}>SL</th>
                <th style={{ textAlign: "right" }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ color: "var(--muted)" }}>{idx + 1}</td>
                  <td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span style={{ fontSize: 24 }}>{item.product.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          {item.product.name}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>
                          {item.product.brand} · {item.product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                    }}
                  >
                    {formatPrice(item.product.price)}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.qty}</td>
                  <td
                    style={{
                      textAlign: "right",
                      fontFamily: "var(--font-head)",
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {formatPrice(item.product.price * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div
            style={{
              marginTop: 16,
              borderTop: "1px solid var(--border)",
              paddingTop: 16,
            }}
          >
            {[
              ["Tạm tính", formatPrice(subtotal)],
              [
                "Phí vận chuyển",
                shipping === 0 ? "Miễn phí" : formatPrice(shipping),
              ],
            ].map(([k, v]) => (
              <div
                key={k}
                className="invoice-total-row"
                style={{ color: "var(--muted2)" }}
              >
                <span>{k}</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{v}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 12,
                borderTop: "1px solid var(--border)",
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Tổng cộng
              </span>
              <span className="invoice-grand">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: 28,
              padding: "16px 0",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              Cảm ơn bạn đã mua sắm tại TechZone! 🎉
              <br />
              Hóa đơn này có giá trị pháp lý cho mục đích bảo hành.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => window.print()}
              >
                🖨️ In hóa đơn
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  dispatch({
                    type: "ADD_TOAST",
                    toast: { type: "success", title: "Đã gửi email hóa đơn!" },
                  })
                }
              >
                📧 Gửi email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
