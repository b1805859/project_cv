import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";
import { formatPrice, stars } from "../../utils/helpers";
import { ProductCard } from "../ProductCard/ProductCard";
import { Footer } from "../Footer/Footer";
import { CountdownDisplay } from "../CountdownDisplay/CountdownDisplay";
import { RecommendationStrip } from "../RecommendationStrip/RecommendationStrip";
import { BlogSection } from "../BlogSection/BlogSection";
import "./HomePage.scss";

function HomeDataState({ title, onRetry }) {
  return (
    <div className="home-data-state">
      <div>{title}</div>
      {onRetry && (
        <button className="btn btn-ghost btn-sm" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export function HomePage() {
  const { dispatch } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const nav = (page, data) => {
    dispatch({ type: "SET_PAGE", page, data });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let cancelled = false;

    async function loadHomeData() {
      setLoading(true);
      setError(null);

      try {
        const productList = await productService.getProductsList();
        const categoryList = await categoryService.getCategories(productList);

        if (cancelled) return;
        setProducts(productList);
        setCategories(categoryList);
      } catch (err) {
        if (cancelled) return;
        setProducts([]);
        setCategories([]);
        setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadHomeData();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retryLoad = () => setReloadKey((key) => key + 1);
  const errorMessage = error?.message || "Unable to load homepage data.";

  const featured = useMemo(
    () => products.filter((p) => p.isHot || p.isNew).slice(0, 4),
    [products],
  );
  const trending = useMemo(
    () =>
      [...products]
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, 5),
    [products],
  );
  const newProducts = useMemo(
    () => products.filter((p) => p.isNew).slice(0, 5),
    [products],
  );
  const moreProducts = useMemo(() => products.slice(4, 8), [products]);
  const heroProduct = featured[0] || products[0];

  const renderProductsGrid = (items, emptyTitle) => {
    if (loading) return <HomeDataState title="Loading products..." />;
    if (error) return <HomeDataState title={errorMessage} onRetry={retryLoad} />;
    if (items.length === 0) return <HomeDataState title={emptyTitle} />;

    return (
      <div className="products-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  };

  return (
    <div className="page home-page-v2-container">
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
              <div className="hero-product-img">
                {heroProduct?.emoji || "\uD83D\uDCE6"}
              </div>
              <div className="info-row">
                <div className="label-sub">Nổi bật hôm nay</div>
                <div className="product-title">
                  {heroProduct?.name || "TechZone"}
                </div>
                <div className="price-row">
                  <span className="price-val">
                    {formatPrice(heroProduct?.price || 0)}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={!heroProduct}
                    onClick={() =>
                      heroProduct &&
                      nav("product", { productId: heroProduct.id })
                    }
                  >
                    Xem ngay →
                  </button>
                </div>
              </div>
              <div className="hero-floating hero-floating-1">
                <div className="stat-label">Đã bán tuần này</div>
                <div className="stat-val">
                  +{(heroProduct?.sold || 0).toLocaleString()} ✓
                </div>
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
          {loading ? (
            <HomeDataState title="Loading categories..." />
          ) : error ? (
            <HomeDataState title={errorMessage} onRetry={retryLoad} />
          ) : categories.length === 0 ? (
            <HomeDataState title="No categories available." />
          ) : (
            <div className="categories-grid">
              {categories.map((cat) => (
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
          )}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
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
          {renderProductsGrid(featured, "No featured products available.")}
        </div>
      </section>

      {/* FLASH SALE BANNER WITH REAL COUNTDOWN */}
      <section className="flash-sale-section">
        <div className="section-inner">
          <div className="banner-wrapper">
            <div className="glow-orb" />
            <div className="banner-content">
              <div className="tag">// FLASH SALE</div>
              <h3 className="title">Giảm thêm 10% với MoMo</h3>
              <p className="desc">Áp dụng cho đơn hàng từ 500.000đ. Số lượng có hạn!</p>
            </div>
            <div className="banner-actions">
              <div className="timer-box">
                <div className="label">⏰ Kết thúc sau</div>
                <CountdownDisplay />
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

      {/* RECOMMENDATION STRIP */}
      <RecommendationStrip title="🔥 Xu hướng & Gợi ý" products={products} />

      {/* TRENDING + NEW */}
      <section className="section trending-section">
        <div className="section-inner">
          <div className="grid-split">
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>// Xu hướng</div>
              <h2 className="col-title">🔥 Bán chạy nhất</h2>
              {loading ? (
                <HomeDataState title="Loading products..." />
              ) : error ? (
                <HomeDataState title={errorMessage} onRetry={retryLoad} />
              ) : trending.length === 0 ? (
                <HomeDataState title="No trending products available." />
              ) : (
                trending.map((p, i) => (
                  <div
                    key={p.id}
                    className="trending-item"
                    onClick={() => nav("product", { productId: p.id })}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={`trending-rank${i < 3 ? " top" : ""}`}>
                      0{i + 1}
                    </span>
                    <span style={{ fontSize: 24, marginRight: 4 }}>{p.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div className="trending-name">{p.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>
                        Đã bán: {p.sold.toLocaleString()}
                      </div>
                    </div>
                    <span style={{ fontFamily: "var(--font-head)", color: "var(--accent)", fontSize: 14, fontWeight: 700 }}>
                      {formatPrice(p.price)}
                    </span>
                  </div>
                ))
              )}
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>// Mới nhất</div>
              <h2 className="col-title">✨ Sản phẩm mới</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {loading ? (
                  <HomeDataState title="Loading products..." />
                ) : error ? (
                  <HomeDataState title={errorMessage} onRetry={retryLoad} />
                ) : newProducts.length === 0 ? (
                  <HomeDataState title="No new products available." />
                ) : (
                  newProducts.map((p) => (
                      <div
                        key={p.id}
                        className="new-product-item"
                        onClick={() => nav("product", { productId: p.id })}
                      >
                        <div className="img-box">{p.emoji}</div>
                        <div className="info-pane">
                          <div className="name">{p.name}</div>
                          <div className="stars" style={{ fontSize: 11 }}>
                            {stars(p.rating)}
                          </div>
                        </div>
                        <div className="price-pane">
                          <div className="price-val">{formatPrice(p.price)}</div>
                          {p.oldPrice && (
                            <div className="old-price">{formatPrice(p.oldPrice)}</div>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <div className="section-label">// Tất cả</div>
              <h2 className="section-title">
                Xem thêm <span>sản phẩm</span>
              </h2>
            </div>
            <button className="btn btn-ghost" onClick={() => nav("products")}>
              Xem tất cả ({products.length}) →
            </button>
          </div>
          {renderProductsGrid(moreProducts, "No more products available.")}
        </div>
      </section>

      <BlogSection />
      <Footer />
    </div>
  );
}
