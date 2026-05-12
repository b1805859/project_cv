import { useState, useEffect, useContext } from "react";
import { CATEGORIES, PRODUCTS } from "../data/mockData";
import { AppContext } from "../context/AppContext";
import { formatPrice, stars } from "../utils/helpers";
import { ProductCard } from "../components/ProductCard/ProductCard";

export function ProductsPage() {
  const { state, dispatch } = useContext(AppContext);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState(state.searchQuery || "");
  const [selectedCat, setSelectedCat] = useState(state.pageData?.catId || 0);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [searchDebounced, setSearchDebounced] = useState(search);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const PER_PAGE = 8;

  useEffect(() => {
    const t = setTimeout(() => setSearchDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [
    selectedCat,
    searchDebounced,
    sort,
    priceMin,
    priceMax,
    selectedBrands,
    minRating,
  ]);

  let products = [...PRODUCTS];
  if (selectedCat) products = products.filter((p) => p.catId === selectedCat);
  if (searchDebounced)
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchDebounced.toLowerCase()) ||
        p.category.toLowerCase().includes(searchDebounced.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchDebounced.toLowerCase()),
    );
  if (priceMin)
    products = products.filter((p) => p.price >= Number(priceMin) * 1000000);
  if (priceMax)
    products = products.filter((p) => p.price <= Number(priceMax) * 1000000);
  if (selectedBrands.length > 0)
    products = products.filter((p) => selectedBrands.includes(p.brand));
  if (minRating > 0) products = products.filter((p) => p.rating >= minRating);

  if (sort === "price_asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") products.sort((a, b) => b.price - a.price);
  else if (sort === "name_asc")
    products.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "name_desc")
    products.sort((a, b) => b.name.localeCompare(a.name));
  else if (sort === "sold_desc") products.sort((a, b) => b.sold - a.sold);
  else if (sort === "rating") products.sort((a, b) => b.rating - a.rating);
  else if (sort === "new")
    products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  const totalPages = Math.ceil(products.length / PER_PAGE);
  const paginated = products.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const allBrands = [...new Set(PRODUCTS.map((p) => p.brand))];

  function resetAll() {
    setSelectedCat(0);
    setPriceMin("");
    setPriceMax("");
    setSort("default");
    setSelectedBrands([]);
    setMinRating(0);
    setSearch("");
  }
  const activeFilterCount =
    (selectedCat ? 1 : 0) +
    (priceMin || priceMax ? 1 : 0) +
    selectedBrands.length +
    (minRating ? 1 : 0);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span
              onClick={() => dispatch({ type: "SET_PAGE", page: "home" })}
              style={{ cursor: "pointer", color: "var(--accent)" }}
            >
              Trang chủ
            </span>
            <span className="breadcrumb-sep">/</span>
            <span>Sản phẩm</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h1 className="page-title">🛍️ Tất cả sản phẩm</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {activeFilterCount > 0 && (
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    cursor: "pointer",
                  }}
                  onClick={resetAll}
                >
                  ✕ Xóa {activeFilterCount} bộ lọc
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="product-list-layout">
        {/* FILTER PANEL */}
        <aside className="filter-panel">
          <div className="filter-title">
            <span>
              🔧 Bộ lọc{" "}
              {activeFilterCount > 0 && (
                <span
                  className="badge badge-cyan"
                  style={{ fontSize: 9, padding: "1px 6px", marginLeft: 4 }}
                >
                  {activeFilterCount}
                </span>
              )}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={resetAll}>
              Reset
            </button>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Danh mục</div>
            {[{ id: 0, name: "Tất cả", icon: "📦" }, ...CATEGORIES].map(
              (cat) => (
                <label
                  key={cat.id}
                  className="filter-option"
                  style={{
                    background:
                      selectedCat === cat.id ? "rgba(0,212,255,.06)" : "",
                    borderRadius: 6,
                    paddingLeft: 6,
                  }}
                >
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCat === cat.id}
                    onChange={() => setSelectedCat(cat.id)}
                    style={{ accentColor: "var(--accent)" }}
                  />
                  <span style={{ fontSize: 14 }}>{cat.icon || ""}</span>
                  <span
                    style={{
                      fontWeight: selectedCat === cat.id ? 600 : 400,
                      color:
                        selectedCat === cat.id ? "var(--accent)" : "inherit",
                    }}
                  >
                    {cat.name}
                  </span>
                </label>
              ),
            )}
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Khoảng giá (triệu đồng)</div>
            <div className="price-range">
              <input
                className="price-input"
                placeholder="Từ"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
              <span style={{ color: "var(--muted)" }}>–</span>
              <input
                className="price-input"
                placeholder="Đến"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: 4,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              {[
                ["<2M", "", "2"],
                ["2-10M", "2", "10"],
                ["10-30M", "10", "30"],
                [">30M", "30", ""],
              ].map(([label, mn, mx]) => (
                <button
                  key={label}
                  className="sort-btn"
                  style={{ fontSize: 10, padding: "3px 8px" }}
                  onClick={() => {
                    setPriceMin(mn);
                    setPriceMax(mx);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">
              Thương hiệu (
              {selectedBrands.length > 0
                ? selectedBrands.length + " chọn"
                : "Tất cả"}
              )
            </div>
            {allBrands.map((brand) => (
              <label key={brand} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) =>
                    setSelectedBrands((prev) =>
                      e.target.checked
                        ? [...prev, brand]
                        : prev.filter((b) => b !== brand),
                    )
                  }
                  style={{ accentColor: "var(--accent)" }}
                />
                <span>{brand}</span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--muted)",
                    marginLeft: "auto",
                  }}
                >
                  {PRODUCTS.filter((p) => p.brand === brand).length}
                </span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Đánh giá tối thiểu</div>
            {[5, 4.5, 4, 3.5].map((r) => (
              <label key={r} className="filter-option">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r}
                  onChange={() => setMinRating(minRating === r ? 0 : r)}
                  style={{ accentColor: "var(--accent)" }}
                />
                <span className="stars" style={{ fontSize: 11 }}>
                  {"★".repeat(Math.floor(r))}
                  {"½".repeat(r % 1 ? 1 : 0)}
                  {"☆".repeat(5 - Math.ceil(r))}
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>
                  {r}+
                </span>
              </label>
            ))}
          </div>
        </aside>

        {/* PRODUCTS AREA */}
        <div>
          {/* Search bar */}
          <div style={{ marginBottom: 16 }}>
            <div className="input-group">
              <span className="input-icon">🔍</span>
              <input
                className="input"
                placeholder="Tìm kiếm trong sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <span
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "var(--muted)",
                    fontSize: 16,
                  }}
                  onClick={() => setSearch("")}
                >
                  ×
                </span>
              )}
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              {selectedCat > 0 && (
                <span
                  style={{
                    padding: "4px 10px",
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.3)",
                    borderRadius: 20,
                    fontSize: 11,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {CATEGORIES.find((c) => c.id === selectedCat)?.name}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedCat(0)}
                  >
                    ×
                  </span>
                </span>
              )}
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  style={{
                    padding: "4px 10px",
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.3)",
                    borderRadius: 20,
                    fontSize: 11,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {b}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setSelectedBrands((prev) => prev.filter((x) => x !== b))
                    }
                  >
                    ×
                  </span>
                </span>
              ))}
              {(priceMin || priceMax) && (
                <span
                  style={{
                    padding: "4px 10px",
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.3)",
                    borderRadius: 20,
                    fontSize: 11,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {priceMin ? priceMin + "M" : ""}
                  {priceMin && priceMax ? "–" : ""}
                  {priceMax ? priceMax + "M" : ""}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setPriceMin("");
                      setPriceMax("");
                    }}
                  >
                    ×
                  </span>
                </span>
              )}
              {minRating > 0 && (
                <span
                  style={{
                    padding: "4px 10px",
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.3)",
                    borderRadius: 20,
                    fontSize: 11,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  ⭐{minRating}+
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setMinRating(0)}
                  >
                    ×
                  </span>
                </span>
              )}
            </div>
          )}

          {/* Sort bar + View toggle */}
          <div className="sort-bar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="result-count">
                <strong>{products.length}</strong> sản phẩm
                {totalPages > 1 && (
                  <span style={{ color: "var(--muted)", marginLeft: 6 }}>
                    · Trang {page}/{totalPages}
                  </span>
                )}
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
              <div className="sort-options">
                {[
                  ["default", "Mặc định"],
                  ["price_asc", "Giá ↑"],
                  ["price_desc", "Giá ↓"],
                  ["sold_desc", "Bán chạy"],
                  ["rating", "Đánh giá"],
                  ["new", "Mới nhất"],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    className={`sort-btn${sort === v ? " active" : ""}`}
                    onClick={() => setSort(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {/* View mode toggle */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  background: "var(--card2)",
                  borderRadius: 8,
                  padding: 3,
                  border: "1px solid var(--border)",
                }}
              >
                {[
                  ["grid", "⊞"],
                  ["list", "☰"],
                ].map(([mode, icon]) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      width: 30,
                      height: 28,
                      borderRadius: 6,
                      background:
                        viewMode === mode ? "var(--accent)" : "transparent",
                      color: viewMode === mode ? "#000" : "var(--muted2)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: ".15s",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-text">Không tìm thấy sản phẩm</div>
              <div className="empty-sub">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </div>
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginTop: 12 }}
                onClick={resetAll}
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="products-grid">
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            /* LIST VIEW */
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {paginated.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: 16,
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    cursor: "pointer",
                    transition: ".2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(0,212,255,.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                  onClick={() => {
                    dispatch({
                      type: "SET_PAGE",
                      page: "product",
                      data: { productId: p.id },
                    });
                    window.scrollTo(0, 0);
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: "var(--card2)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 40,
                      flexShrink: 0,
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        marginBottom: 2,
                      }}
                    >
                      {p.category} · {p.brand}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        marginBottom: 4,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="stars" style={{ fontSize: 11 }}>
                        {stars(p.rating)}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>
                        ({p.reviews}) · Đã bán {p.sold.toLocaleString()}
                      </span>
                      {p.isNew && <span className="label label-new">MỚI</span>}
                      {p.isHot && <span className="label label-hot">🔥</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: 18,
                        fontWeight: 800,
                        color: "var(--accent)",
                      }}
                    >
                      {formatPrice(p.price)}
                    </div>
                    {p.oldPrice && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--muted)",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatPrice(p.oldPrice)}
                      </div>
                    )}
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: 8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: "ADD_TO_CART", product: p });
                        dispatch({
                          type: "ADD_TOAST",
                          toast: {
                            type: "success",
                            title: "Đã thêm!",
                            msg: p.name,
                          },
                        });
                      }}
                    >
                      🛒 Thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-ghost btn-sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{ opacity: page === 1 ? 0.4 : 1 }}
              >
                ← Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => {
                    setPage(pg);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: pg === page ? "var(--accent)" : "var(--card2)",
                    color: pg === page ? "#000" : "var(--muted2)",
                    border: `1px solid ${pg === page ? "var(--accent)" : "var(--border)"}`,
                    cursor: "pointer",
                    fontWeight: pg === page ? 700 : 400,
                    fontSize: 13,
                    transition: ".15s",
                  }}
                >
                  {pg}
                </button>
              ))}
              <button
                className="btn btn-ghost btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{ opacity: page === totalPages ? 0.4 : 1 }}
              >
                Sau →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
