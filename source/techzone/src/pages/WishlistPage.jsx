import { useContext } from "react";
import { PRODUCTS } from "../data/mockData";
import { AppContext } from "../context/AppContext";
import { formatPrice, discount, stars } from "../utils/helpers";
import { Footer } from "../components/Footer/Footer";
import "./WishlistPage.scss";

export function WishlistPage() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p, d) => {
    dispatch({ type: "SET_PAGE", page: p, data: d });
    window.scrollTo(0, 0);
  };
  const wished = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

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
    <div className="page wishlist-page">
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
            <span>Yêu thích</span>
          </div>
          <h1 className="page-title">
            ❤️ Sản phẩm yêu thích ({wished.length})
          </h1>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "32px auto", padding: "0 24px" }}>
        {wished.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🤍</div>
            <div className="empty-text">Chưa có sản phẩm yêu thích</div>
            <div className="empty-sub">
              Nhấn vào ❤️ trên sản phẩm để lưu vào danh sách yêu thích
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: 20 }}
              onClick={() => nav("products")}
            >
              🛍️ Khám phá ngay
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                {wished.length} sản phẩm trong danh sách
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  wished.forEach((p) =>
                    dispatch({ type: "TOGGLE_WISHLIST", id: p.id }),
                  );
                  dispatch({
                    type: "ADD_TOAST",
                    toast: { type: "info", title: "Đã xóa tất cả yêu thích" },
                  });
                }}
              >
                🗑️ Xóa tất cả
              </button>
            </div>
            <div className="wishlist-grid">
              {wished.map((p) => (
                <div
                  key={p.id}
                  className="product-card"
                  style={{ position: "relative" }}
                >
                  <div
                    className="product-img"
                    onClick={() => nav("product", { productId: p.id })}
                  >
                    <span style={{ fontSize: 80 }}>{p.emoji}</span>
                    <div className="product-badges">
                      {p.isNew && <span className="label label-new">MỚI</span>}
                      {p.isHot && (
                        <span className="label label-hot">🔥 HOT</span>
                      )}
                      {p.oldPrice && (
                        <span className="label label-sale">
                          -{discount(p.price, p.oldPrice)}%
                        </span>
                      )}
                    </div>
                    <button
                      className="product-wishlist"
                      style={{
                        opacity: 1,
                        background: "rgba(255,71,87,.2)",
                        borderColor: "var(--red)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: "TOGGLE_WISHLIST", id: p.id });
                      }}
                    >
                      ❤️
                    </button>
                  </div>
                  <div className="product-info">
                    <div className="product-cat">{p.category}</div>
                    <div
                      className="product-name"
                      onClick={() => nav("product", { productId: p.id })}
                    >
                      {p.name}
                    </div>
                    <div className="product-rating">
                      <span className="stars">{stars(p.rating)}</span>
                      <span className="rating-count">({p.reviews})</span>
                    </div>
                    <div className="product-price">
                      <span className="price-current">
                        {formatPrice(p.price)}
                      </span>
                      {p.oldPrice && (
                        <>
                          <span className="price-old">
                            {formatPrice(p.oldPrice)}
                          </span>
                          <span className="price-discount">
                            -{discount(p.price, p.oldPrice)}%
                          </span>
                        </>
                      )}
                    </div>
                    <div className="product-actions">
                      <button
                        className="btn-cart"
                        onClick={() => {
                          dispatch({ type: "ADD_TO_CART", product: p });
                          dispatch({
                            type: "ADD_TOAST",
                            toast: {
                              type: "success",
                              title: "Đã thêm vào giỏ",
                              msg: p.name,
                            },
                          });
                        }}
                      >
                        🛒 Thêm vào giỏ
                      </button>
                      <button
                        className="btn btn-icon btn-secondary btn-sm"
                        onClick={() => nav("product", { productId: p.id })}
                      >
                        👁
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
