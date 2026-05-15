import { useState, useContext } from "react";
import { PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice, formatDate, stars } from "../../utils/helpers";
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Footer } from "../../components/Footer/Footer";
import { RecentlyViewedStrip } from "../../components/RecentlyViewedStrip/RecentlyViewedStrip";
import "./ProductDetailPage.scss";

export function ProductDetailPage() {
  const { state, dispatch } = useContext(AppContext);
  const productId = state.pageData?.productId;
  const product =
    (state.adminProducts || PRODUCTS).find((p) => p.id === productId) ||
    (state.adminProducts || PRODUCTS)[0];
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Nguyễn Minh Khoa",
      rating: 5,
      date: "2024-01-10",
      text: "Sản phẩm tuyệt vời, đúng như mô tả! Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng với chất lượng.",
      replies: [],
    },
    {
      id: 2,
      user: "Trần Thị Lan",
      rating: 4,
      date: "2024-01-12",
      text: "Chất lượng tốt, hiệu suất ổn định. Chỉ tiếc là không có phụ kiện đi kèm nhiều hơn.",
      replies: [
        {
          id: 21,
          user: "TechZone Support",
          date: "2024-01-12",
          text: "Cảm ơn bạn đã tin tưởng! Nếu cần thêm phụ kiện, bạn tham khảo danh mục phụ kiện nhé.",
        },
      ],
    },
  ]);

  const related = (state.adminProducts || PRODUCTS)
    .filter((p) => p.catId === product.catId && p.id !== product.id)
    .slice(0, 4);
  const nav = (page, data) => {
    dispatch({ type: "SET_PAGE", page, data });
    window.scrollTo(0, 0);
  };

  function addToCart() {
    dispatch({ type: "ADD_TO_CART", product, qty });
    dispatch({
      type: "TRACK_ACTIVITY",
      productId: product.id,
      catId: product.catId,
      actType: "CART",
    });
    dispatch({
      type: "ADD_TOAST",
      toast: {
        type: "success",
        title: "Đã thêm vào giỏ hàng",
        msg: `${qty}x ${product.name}`,
      },
    });
  }

  function addComment() {
    if (!comment.trim()) return;
    if (!state.user) {
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "warning",
          title: "Cần đăng nhập",
          msg: "Vui lòng đăng nhập để bình luận",
        },
      });
      return;
    }
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: state.user.name,
        rating: userRating,
        date: new Date().toISOString().slice(0, 10),
        text: comment,
        replies: [],
      },
    ]);
    setComment("");
    dispatch({
      type: "ADD_TOAST",
      toast: { type: "success", title: "Bình luận đã được đăng!" },
    });
  }

  return (
    <div className="page product-detail-page">
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
            <span
              onClick={() => nav("products")}
              style={{ cursor: "pointer", color: "var(--accent)" }}
            >
              Sản phẩm
            </span>
            <span className="breadcrumb-sep">/</span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="product-detail-layout">
        {/* GALLERY */}
        <div className="product-gallery">
          <div className="gallery-main">
            <span style={{ fontSize: 120 }}>{product.emoji}</span>
            <div style={{ position: "absolute", top: 12, right: 12 }}>
              {product.isNew && <span className="badge badge-cyan">NEW</span>}
              {product.isHot && (
                <span className="badge badge-orange">🔥 HOT</span>
              )}
            </div>
          </div>
          <div className="gallery-thumbs">
            {[product.emoji, "📦", "🏷️", "✨"].map((e, i) => (
              <div
                key={i}
                className={`gallery-thumb${i === 0 ? " active" : ""}`}
              >
                {e}
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="product-detail-info">
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: 10 }}>
              {product.category}
            </span>
            <h1 className="product-detail-title">{product.name}</h1>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
              Thương hiệu:{" "}
              <strong style={{ color: "var(--text)" }}>{product.brand}</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span className="stars" style={{ fontSize: 18 }}>
              {stars(product.rating)}
            </span>
            <span style={{ fontSize: 13, color: "var(--muted2)" }}>
              {product.rating}/5 ({product.reviews} đánh giá)
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              Đã bán:{" "}
              <strong style={{ color: "var(--green)" }}>
                {product.sold.toLocaleString()}
              </strong>
            </span>
          </div>

          <div className="product-detail-price">
            <span className="detail-price-main">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="detail-price-old">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="badge badge-red">
                  Tiết kiệm {formatPrice(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* SPECS */}
          <div className="detail-specs">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="spec-row">
                <span className="spec-key">{k}</span>
                <span className="spec-val">{v}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="stock-badge">
              <span className="stock-dot" />
              Còn {product.stock} sản phẩm
            </div>
            <div className="badge badge-green">✓ Bảo hành chính hãng</div>
            <div className="badge badge-cyan">🚚 Miễn phí vận chuyển</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>
              Số lượng:
            </span>
            <div className="qty-selector">
              <button
                className="qty-btn"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                −
              </button>
              <span className="qty-val">{qty}</span>
              <button
                className="qty-btn"
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="btn btn-primary btn-lg"
              style={{ flex: 1 }}
              onClick={addToCart}
            >
              🛒 Thêm vào giỏ hàng
            </button>
            <button
              className="btn btn-success btn-lg"
              style={{ flex: 1 }}
              onClick={() => {
                addToCart();
                nav("cart");
              }}
            >
              ⚡ Mua ngay
            </button>
            <button
              className="btn btn-icon btn-secondary"
              onClick={() =>
                dispatch({ type: "TOGGLE_WISHLIST", id: product.id })
              }
            >
              {state.wishlist.includes(product.id) ? "❤️" : "🤍"}
            </button>
          </div>

          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 16,
              display: "flex",
              gap: 20,
            }}
          >
            {[
              ["🛡️", "Bảo hành 12–24 tháng"],
              ["🔄", "Đổi trả 7 ngày"],
              ["📦", "Giao hàng 2–5 ngày"],
              ["💳", "Hỗ trợ trả góp 0%"],
            ].map(([icon, text]) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: "var(--muted2)",
                }}
              >
                <span>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ maxWidth: 1280, margin: "32px auto", padding: "0 24px" }}>
        <div className="tabs">
          {[
            ["desc", "Mô tả"],
            ["specs", "Thông số"],
            ["reviews", "Đánh giá (" + comments.length + ")"],
          ].map(([t, l]) => (
            <div
              key={t}
              className={`tab${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
            >
              {l}
            </div>
          ))}
        </div>

        {tab === "desc" && (
          <div
            style={{ color: "var(--muted2)", lineHeight: 1.8, maxWidth: 700 }}
          >
            {product.description}
          </div>
        )}
        {tab === "specs" && (
          <div className="detail-specs" style={{ maxWidth: 600 }}>
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="spec-row">
                <span className="spec-key">{k}</span>
                <span className="spec-val">{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab === "reviews" && (
          <div>
            <div
              style={{
                display: "flex",
                gap: 32,
                marginBottom: 28,
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 48,
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  {product.rating}
                </div>
                <div
                  className="stars"
                  style={{ fontSize: 20, margin: "4px 0" }}
                >
                  {stars(product.rating)}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {product.reviews} đánh giá
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map((r) => (
                  <div
                    key={r}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        minWidth: 12,
                      }}
                    >
                      {r}
                    </span>
                    <span style={{ color: "#ffd32a", fontSize: 11 }}>★</span>
                    <div className="progress" style={{ flex: 1 }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 7 : 2}%`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        minWidth: 24,
                      }}
                    >
                      {r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 7 : 2}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {comments.map((c) => (
              <div key={c.id} className="comment-card">
                <div className="comment-header">
                  <div className="comment-avatar">{c.user[0]}</div>
                  <div className="comment-meta">
                    <div className="comment-user">{c.user}</div>
                    <div className="comment-date">
                      {formatDate(c.date)} ·{" "}
                      <span className="stars" style={{ fontSize: 11 }}>
                        {"★".repeat(c.rating) + "☆".repeat(5 - c.rating)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="comment-body">{c.text}</div>
                {c.replies.map((r) => (
                  <div key={r.id} className="reply-indent">
                    <div
                      className="comment-card"
                      style={{ background: "var(--card2)" }}
                    >
                      <div className="comment-header">
                        <div
                          className="comment-avatar"
                          style={{
                            background:
                              "linear-gradient(135deg,var(--accent),var(--accent2))",
                            fontSize: 10,
                          }}
                        >
                          {r.user[0]}
                        </div>
                        <div className="comment-meta">
                          <div className="comment-user">
                            {r.user}{" "}
                            <span
                              className="badge badge-cyan"
                              style={{ fontSize: 9, padding: "1px 6px" }}
                            >
                              Staff
                            </span>
                          </div>
                          <div className="comment-date">
                            {formatDate(r.date)}
                          </div>
                        </div>
                      </div>
                      <div className="comment-body">{r.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="comment-input-area">
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                Viết đánh giá
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  Đánh giá:
                </span>
                {[1, 2, 3, 4, 5].map((r) => (
                  <span
                    key={r}
                    style={{
                      fontSize: 24,
                      cursor: "pointer",
                      color: r <= userRating ? "#ffd32a" : "var(--muted)",
                    }}
                    onClick={() => setUserRating(r)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                className="comment-textarea"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="btn btn-primary"
                style={{ marginTop: 10 }}
                onClick={addComment}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section" style={{ background: "var(--surface)" }}>
          <div className="section-inner">
            <div className="section-label">// Gợi ý</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Sản phẩm <span>liên quan</span>
            </h2>
            <div className="products-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <RecentlyViewedStrip />
      <Footer />
    </div>
  );
}
