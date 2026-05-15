import { useContext } from "react";
import { PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice } from "../../utils/helpers";
import "./NotFoundPage.scss";

export function NotFoundPage() {
  const { dispatch } = useContext(AppContext);
  const nav = (p) => {
    dispatch({ type: "SET_PAGE", page: p });
    window.scrollTo(0, 0);
  };
  return (
    <div className="page not-found-page">
      <div className="not-found">
        <div className="not-found-code">404</div>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Trang không tồn tại
        </h2>
        <p
          style={{
            color: "var(--muted2)",
            fontSize: 15,
            marginBottom: 32,
            maxWidth: 400,
            lineHeight: 1.7,
          }}
        >
          Có vẻ bạn lạc vào không gian số. Trang bạn tìm đã bị xóa hoặc không
          tồn tại.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn-primary btn-lg"
            onClick={() => nav("home")}
          >
            🏠 Về trang chủ
          </button>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => nav("products")}
          >
            🛍️ Xem sản phẩm
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => nav("about")}>
            ℹ️ Về chúng tôi
          </button>
        </div>
        {/* Suggested products */}
        <div style={{ marginTop: 48, maxWidth: 800, width: "100%" }}>
          <div
            style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}
          >
            Bạn có thể quan tâm đến
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {PRODUCTS.filter((p) => p.isHot)
              .slice(0, 3)
              .map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: 14,
                    cursor: "pointer",
                    transition: ".2s",
                    textAlign: "center",
                    minWidth: 140,
                  }}
                  onClick={() => nav("product", { productId: p.id })}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(0,212,255,.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <div style={{ fontSize: 36, marginBottom: 6 }}>{p.emoji}</div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: 1.3,
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-head)",
                      color: "var(--accent)",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {formatPrice(p.price)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
