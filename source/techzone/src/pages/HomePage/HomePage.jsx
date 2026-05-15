import { useContext } from "react";
import { CATEGORIES, PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice, stars } from "../../utils/helpers";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Footer } from "../../components/Footer/Footer";
import "./HomePage.scss";

export function HomePage() {
  const { dispatch } = useContext(AppContext);
  const nav = (page, data) => {
    dispatch({ type: "SET_PAGE", page, data });
    window.scrollTo(0, 0);
  };
  const featured = PRODUCTS.filter((p) => p.isHot || p.isNew).slice(0, 4);
  const trending = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 5);

  return (
    <div className="page home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">🔥 SALE THÁNG 1 – GIẢM ĐẾN 30%</div>
            <h1 className="hero-title">
              Thiết bị điện tử
              <br />
              <span>đỉnh cao công nghệ</span>
            </h1>
            <p className="hero-desc">
              Khám phá hàng nghìn sản phẩm điện tử chính hãng từ các thương hiệu
              hàng đầu thế giới. Bảo hành chính hãng, giao hàng toàn quốc.
            </p>
            <div className="hero-cta">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => nav("products")}
              >
                🛍️ Mua sắm ngay
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => nav("products")}
              >
                Xem danh mục
              </button>
            </div>
            <div className="hero-stats">
              {[
                ["10K+", "Sản phẩm"],
                ["500K+", "Khách hàng"],
                ["99%", "Hài lòng"],
                ["24/7", "Hỗ trợ"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-main">
              <div className="hero-product-img">💻</div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  Nổi bật hôm nay
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 18,
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                >
                  MacBook Pro M3 14"
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-head)",
                      color: "var(--accent)",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    {formatPrice(42990000)}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => nav("product", { productId: 1 })}
                  >
                    Xem ngay →
                  </button>
                </div>
              </div>
              <div className="hero-floating hero-floating-1">
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  Đã bán tuần này
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--green)",
                  }}
                >
                  +1,203 ✓
                </div>
              </div>
              <div className="hero-floating hero-floating-2">
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  Đánh giá
                </div>
                <div style={{ color: "#ffd32a", fontSize: 14 }}>★★★★★ 4.9</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">// Danh mục</div>
            <h2 className="section-title">
              Khám phá theo <span>danh mục</span>
            </h2>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="cat-card"
                onClick={() => {
                  dispatch({ type: "SET_SEARCH", query: "" });
                  nav("products", { catId: cat.id });
                }}
              >
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{cat.count} sản phẩm</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="section-inner">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <div>
              <div className="section-label">// Nổi bật</div>
              <h2 className="section-title">
                Sản phẩm <span>hot nhất</span>
              </h2>
            </div>
            <button className="btn btn-ghost" onClick={() => nav("products")}>
              Xem tất cả →
            </button>
          </div>
          <div className="products-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="section-inner">
          <div
            style={{
              background:
                "linear-gradient(135deg,rgba(0,212,255,.1),rgba(123,47,247,.1))",
              border: "1px solid rgba(0,212,255,.2)",
              borderRadius: 20,
              padding: "40px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 10,
                }}
              >
                // FLASH SALE
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  marginBottom: 8,
                }}
              >
                Giảm thêm 10% với MoMo
              </h3>
              <p style={{ fontSize: 14, color: "var(--muted2)" }}>
                Áp dụng cho đơn hàng từ 500.000đ. Số lượng có hạn!
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 36,
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  02:14:38
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  Còn lại hôm nay
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => nav("products")}
              >
                Mua ngay 🎉
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING + NEW */}
      <section
        className="section"
        style={{ background: "var(--surface)", paddingTop: 60 }}
      >
        <div className="section-inner">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>
                // Xu hướng
              </div>
              <h2
                className="section-title"
                style={{ marginBottom: 20, fontSize: 22 }}
              >
                🔥 Bán chạy nhất
              </h2>
              {trending.map((p, i) => (
                <div
                  key={p.id}
                  className="trending-item"
                  onClick={() => nav("product", { productId: p.id })}
                  style={{ cursor: "pointer" }}
                >
                  <span className={`trending-rank${i < 3 ? " top" : ""}`}>
                    0{i + 1}
                  </span>
                  <span style={{ fontSize: 24, marginRight: 4 }}>
                    {p.emoji}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div className="trending-name">{p.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>
                      Đã bán: {p.sold.toLocaleString()}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-head)",
                      color: "var(--accent)",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {formatPrice(p.price)}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>
                // Mới nhất
              </div>
              <h2
                className="section-title"
                style={{ marginBottom: 20, fontSize: 22 }}
              >
                ✨ Sản phẩm mới
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {PRODUCTS.filter((p) => p.isNew).map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      cursor: "pointer",
                      transition: ".2s",
                    }}
                    onClick={() => nav("product", { productId: p.id })}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(0,212,255,.25)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  >
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        background: "var(--card2)",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        flexShrink: 0,
                      }}
                    >
                      {p.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          marginBottom: 3,
                        }}
                      >
                        {p.name}
                      </div>
                      <div className="stars" style={{ fontSize: 11 }}>
                        {stars(p.rating)}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-head)",
                          color: "var(--accent)",
                          fontWeight: 700,
                          fontSize: 15,
                        }}
                      >
                        {formatPrice(p.price)}
                      </div>
                      {p.oldPrice && (
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--muted)",
                            textDecoration: "line-through",
                            textAlign: "right",
                          }}
                        >
                          {formatPrice(p.oldPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="section">
        <div className="section-inner">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <div>
              <div className="section-label">// Tất cả</div>
              <h2 className="section-title">
                Xem thêm <span>sản phẩm</span>
              </h2>
            </div>
            <button className="btn btn-ghost" onClick={() => nav("products")}>
              Xem tất cả ({PRODUCTS.length}) →
            </button>
          </div>
          <div className="products-grid">
            {PRODUCTS.slice(4, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
