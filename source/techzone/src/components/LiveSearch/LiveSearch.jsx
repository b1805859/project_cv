import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice } from "../../utils/helpers";
import "./LiveSearch.scss";

export function LiveSearch() {
  const { state, dispatch } = useContext(AppContext);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([
    "MacBook Pro",
    "Sony tai nghe",
    "Bàn phím cơ",
    "SSD 1TB",
  ]);
  const ref = useRef();

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const results = useMemo(() => {
    if (q.length <= 1) return [];
    const pool = state.adminProducts || PRODUCTS;
    return pool
      .filter(
        (p) =>
          p.name?.toLowerCase().includes(q.toLowerCase()) ||
          p.category?.toLowerCase().includes(q.toLowerCase()) ||
          p.brand?.toLowerCase().includes(q.toLowerCase()),
      )
      .slice(0, 6);
  }, [q, state.adminProducts]);

  const trending = [
    "Laptop gaming",
    "Tai nghe chống ồn",
    "SSD M.2",
    "Bàn phím 75%",
    "Màn hình OLED",
  ];

  function goProduct(id) {
    dispatch({ type: "SET_PAGE", page: "product", data: { productId: id } });
    setQ("");
    setOpen(false);
    window.scrollTo(0, 0);
  }
  function doSearch(term) {
    const t = term || q;
    if (!t.trim()) return;
    setHistory((h) => [t, ...h.filter((x) => x !== t)].slice(0, 6));
    dispatch({ type: "SET_SEARCH", query: t });
    dispatch({ type: "SET_PAGE", page: "products" });
    setQ("");
    setOpen(false);
    window.scrollTo(0, 0);
  }
  function removeHistory(term, e) {
    e.stopPropagation();
    setHistory((h) => h.filter((x) => x !== term));
  }

  const showEmpty = open && q.length <= 1;
  const showResults = open && results.length > 0;

  return (
    <div ref={ref} className="live-search">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          style={{
            borderColor: open ? "var(--accent)" : "var(--border)",
            boxShadow: open ? "0 0 0 3px rgba(0,212,255,.08)" : "none",
          }}
          placeholder="Tìm sản phẩm, thương hiệu, danh mục..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") doSearch();
            if (e.key === "Escape") {
              setOpen(false);
              setQ("");
            }
          }}
        />
        {q && (
          <span
            className="clear-btn"
            onClick={() => {
              setQ("");
              setOpen(true);
            }}
          >
            ×
          </span>
        )}
      </div>

      {/* Search History + Trending (empty state) */}
      {showEmpty && (history.length > 0 || trending.length > 0) && (
        <div className="search-dropdown">
          {history.length > 0 && (
            <>
              <div className="dropdown-section-header">
                <span className="section-label">🕒 Tìm kiếm gần đây</span>
                <span className="clear-all" onClick={() => setHistory([])}>
                  Xóa tất cả
                </span>
              </div>
              {history.map((term) => (
                <div
                  key={term}
                  className="search-hist-item"
                  onClick={() => {
                    setQ(term);
                    doSearch(term);
                  }}
                >
                  <span className="hist-icon">🕒</span>
                  <span style={{ flex: 1 }}>{term}</span>
                  <span
                    className="remove-hist"
                    onClick={(e) => removeHistory(term, e)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </>
          )}
          <div
            className="dropdown-section-header"
            style={{ borderTop: history.length ? "1px solid var(--border)" : "none" }}
          >
            <span className="section-label">🔥 Xu hướng tìm kiếm</span>
          </div>
          <div className="trending-container">
            {trending.map((t) => (
              <span
                key={t}
                className="trending-tag"
                onClick={() => {
                  setQ(t);
                  doSearch(t);
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Live Results */}
      {showResults && (
        <div className="search-dropdown">
          <div className="results-header">
            <span>
              {results.length} kết quả cho "
              <strong className="query-highlight">{q}</strong>"
            </span>
            <span style={{ color: "var(--muted)", fontWeight: 400 }}>
              {(state.adminProducts || PRODUCTS).length} sản phẩm
            </span>
          </div>
          {results.map((p) => (
            <div
              key={p.id}
              className="search-item"
              onClick={() => goProduct(p.id)}
            >
              <span className="search-item-icon">{p.emoji}</span>
              <div className="search-item-info">
                <div className="search-item-name">
                  {p.name
                    .split(
                      new RegExp(
                        `(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                        "gi",
                      ),
                    )
                    .map((part, i) =>
                      part.toLowerCase() === q.toLowerCase() ? (
                        <mark key={i}>{part}</mark>
                      ) : (
                        part
                      ),
                    )}
                </div>
                <div className="search-item-cat">
                  {p.category} · {p.brand} · ⭐{p.rating}
                </div>
              </div>
              <div className="search-item-price-info">
                <div className="search-item-price">{formatPrice(p.price)}</div>
                {p.oldPrice && (
                  <div className="search-item-old-price">
                    {formatPrice(p.oldPrice)}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="view-all-btn" onClick={() => doSearch()}>
            🔍 Xem tất cả kết quả cho "<strong>{q}</strong>" →
          </div>
        </div>
      )}

      {/* No results */}
      {open && q.length > 1 && results.length === 0 && (
        <div className="search-dropdown">
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <div className="no-results-title">Không tìm thấy kết quả</div>
            <div className="no-results-sub">
              Thử từ khóa khác hoặc xem tất cả sản phẩm
            </div>
            <button
              className="btn btn-ghost btn-sm view-products-btn"
              onClick={() => {
                dispatch({ type: "SET_PAGE", page: "products" });
                setOpen(false);
                setQ("");
              }}
            >
              Xem tất cả sản phẩm →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
