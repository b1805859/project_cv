import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { formatPrice } from "../utils/helpers";
import { LoyaltyWidget } from "../components/LoyaltyWidget/LoyaltyWidget";

export function CartPage() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (page, data) => {
    dispatch({ type: "SET_PAGE", page, data });
    window.scrollTo(0, 0);
  };
  const [promoInput, setPromoInput] = useState("");

  const subtotal = state.cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const baseShipping = subtotal > 5000000 ? 0 : 30000;

  // Calculate promo discount
  let promoDiscount = 0;
  let freeShip = false;
  if (state.promoCode) {
    const promo = (state.coupons || []).find((c) => c.code === state.promoCode);
    if (promo && promo.active) {
      if (promo.type === "percent")
        promoDiscount = Math.round((subtotal * promo.value) / 100);
      else if (promo.type === "fixed") promoDiscount = promo.value;
      else if (promo.type === "ship") freeShip = true;
    }
  }
  const shipping = freeShip ? 0 : baseShipping;
  const total = subtotal - promoDiscount + shipping;

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    const promo = (state.coupons || []).find((c) => c.code === code);
    if (!promo || !promo.active) {
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "error",
          title: "Mã không hợp lệ",
          msg: "Vui lòng kiểm tra lại mã khuyến mãi",
        },
      });
      return;
    }
    if (subtotal < promo.min) {
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "warning",
          title: "Chưa đủ điều kiện",
          msg: `Đơn tối thiểu ${formatPrice(promo.min)}`,
        },
      });
      return;
    }
    dispatch({ type: "SET_PROMO", code });
    dispatch({
      type: "ADD_TOAST",
      toast: {
        type: "success",
        title: `Áp dụng thành công!`,
        msg: promo.label,
      },
    });
    setPromoInput("");
  }

  if (state.cart.length === 0)
    return (
      <div className="page">
        <div className="page-header">
          <div className="page-header-inner">
            <h1 className="page-title">🛒 Giỏ hàng</h1>
          </div>
        </div>
        <div
          style={{
            maxWidth: 600,
            margin: "60px auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 24,
              marginBottom: 10,
            }}
          >
            Giỏ hàng trống
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>
            Hãy thêm sản phẩm vào giỏ hàng nhé!
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => nav("products")}
          >
            🛍️ Mua sắm ngay
          </button>
        </div>
      </div>
    );

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span
              onClick={() => nav("home")}
              style={{ cursor: "pointer", color: "var(--accent)" }}
            >
              Trang chủ
            </span>
            <span className="breadcrumb-sep">/</span>
            <span>Giỏ hàng</span>
          </div>
          <h1 className="page-title">
            🛒 Giỏ hàng ({state.cart.reduce((s, i) => s + i.qty, 0)} sản phẩm)
          </h1>
        </div>
      </div>
      <div className="cart-layout">
        <div>
          <div className="cart-items">
            {state.cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div
                  className="cart-item-img"
                  onClick={() => nav("product", { productId: item.product.id })}
                  style={{ cursor: "pointer" }}
                >
                  {item.product.emoji}
                </div>
                <div className="cart-item-info">
                  <div
                    className="cart-item-name"
                    onClick={() =>
                      nav("product", { productId: item.product.id })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {item.product.name}
                  </div>
                  <div className="cart-item-cat">
                    {item.product.category} · {item.product.brand}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 8,
                    }}
                  >
                    <div className="qty-selector">
                      <button
                        className="qty-btn"
                        style={{ width: 28, height: 28, fontSize: 14 }}
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_CART_QTY",
                            id: item.product.id,
                            qty: item.qty - 1,
                          })
                        }
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontFamily: "var(--font-head)",
                          fontWeight: 700,
                          minWidth: 24,
                          textAlign: "center",
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        className="qty-btn"
                        style={{ width: 28, height: 28, fontSize: 14 }}
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_CART_QTY",
                            id: item.product.id,
                            qty: item.qty + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          id: item.product.id,
                        });
                        dispatch({
                          type: "ADD_TOAST",
                          toast: {
                            type: "info",
                            title: "Đã xóa khỏi giỏ hàng",
                          },
                        });
                      }}
                    >
                      🗑️ Xóa
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        dispatch({
                          type: "TOGGLE_WISHLIST",
                          id: item.product.id,
                        });
                        dispatch({
                          type: "ADD_TOAST",
                          toast: {
                            type: "info",
                            title: "Đã lưu vào yêu thích",
                          },
                        });
                      }}
                    >
                      {state.wishlist.includes(item.product.id) ? "❤️" : "🤍"}{" "}
                      Yêu thích
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  {formatPrice(item.product.price * item.qty)}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button className="btn btn-ghost" onClick={() => nav("products")}>
              ← Tiếp tục mua sắm
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch({ type: "CLEAR_CART" });
                dispatch({
                  type: "ADD_TOAST",
                  toast: { type: "info", title: "Đã xóa tất cả sản phẩm" },
                });
              }}
            >
              🗑️ Xóa tất cả
            </button>
          </div>

          {/* PROMO HINTS */}
          <div
            style={{
              marginTop: 20,
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 16,
            }}
          >
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
              💡 Mã khuyến mãi gợi ý
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(state.coupons || [])
                .filter((c) => c.active)
                .map((promo) => (
                  <div
                    key={promo.code}
                    style={{
                      padding: "5px 12px",
                      background: "rgba(0,212,255,.08)",
                      border: "1px solid rgba(0,212,255,.2)",
                      borderRadius: 6,
                      fontSize: 12,
                      cursor: "pointer",
                      transition: ".15s",
                    }}
                    onClick={() => setPromoInput(promo.code)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(0,212,255,.15)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgba(0,212,255,.08)")
                    }
                  >
                    <strong
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                      }}
                    >
                      {promo.code}
                    </strong>
                    <span style={{ color: "var(--muted)", marginLeft: 6 }}>
                      {promo.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <div className="summary-title">Tóm tắt đơn hàng</div>
          <div className="summary-row">
            <span>
              Tạm tính ({state.cart.reduce((s, i) => s + i.qty, 0)} sản phẩm)
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span
              style={{ color: shipping === 0 ? "var(--green)" : "inherit" }}
            >
              {shipping === 0 ? "Miễn phí 🎉" : formatPrice(shipping)}
            </span>
          </div>

          {/* PROMO CODE INPUT */}
          <div
            style={{
              margin: "14px 0",
              background: "var(--card2)",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--muted)",
                marginBottom: 8,
              }}
            >
              🎟️ Mã khuyến mãi
            </div>
            {state.promoCode ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    flex: 1,
                    background: "rgba(0,230,118,.1)",
                    border: "1px solid rgba(0,230,118,.3)",
                    borderRadius: 6,
                    padding: "7px 12px",
                    fontSize: 13,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--green)",
                      fontWeight: 700,
                    }}
                  >
                    {state.promoCode}
                  </span>
                  <span
                    style={{
                      color: "var(--muted)",
                      marginLeft: 8,
                      fontSize: 11,
                    }}
                  >
                    {
                      (state.coupons || []).find(
                        (c) => c.code === state.promoCode,
                      )?.label
                    }
                  </span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    dispatch({ type: "SET_PROMO", code: null });
                    dispatch({
                      type: "ADD_TOAST",
                      toast: { type: "info", title: "Đã xóa mã giảm giá" },
                    });
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="promo-input" style={{ margin: 0 }}>
                <input
                  className="input"
                  placeholder="Nhập mã..."
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                  style={{ fontSize: 13, fontFamily: "var(--font-mono)" }}
                />
                <button className="btn btn-secondary" onClick={applyPromo}>
                  Áp dụng
                </button>
              </div>
            )}
          </div>

          {promoDiscount > 0 && (
            <div className="summary-row" style={{ color: "var(--green)" }}>
              <span>Giảm giá ({state.promoCode})</span>
              <span>-{formatPrice(promoDiscount)}</span>
            </div>
          )}
          {freeShip && (
            <div className="summary-row" style={{ color: "var(--green)" }}>
              <span>Miễn vận chuyển</span>
              <span>-{formatPrice(baseShipping)}</span>
            </div>
          )}

          <div
            style={{ height: 1, background: "var(--border)", margin: "8px 0" }}
          />
          <div className="summary-total">
            <span>Tổng cộng</span>
            <span>{formatPrice(Math.max(0, total))}</span>
          </div>
          {promoDiscount > 0 && (
            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "var(--green)",
                marginTop: 6,
              }}
            >
              🎉 Bạn tiết kiệm{" "}
              {formatPrice(promoDiscount + (freeShip ? baseShipping : 0))}!
            </div>
          )}
          <LoyaltyWidget total={Math.max(0, total)} />

          <button
            className="btn btn-primary btn-lg w-full"
            style={{ marginTop: 16, width: "100%" }}
            onClick={() => nav("checkout")}
          >
            Tiến hành thanh toán →
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginTop: 14,
              flexWrap: "wrap",
            }}
          >
            {["🔒 SSL", "📦 Đổi trả 7 ngày", "🛡️ Chính hãng"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  textAlign: "center",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
