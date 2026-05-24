import { useState, useContext } from "react";
import { CATEGORIES, PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice } from "../../utils/helpers";
import { AdminProductModal } from "../AdminProductModal/AdminProductModal";
import "./AdminProductTab.scss";

export function AdminProductTab() {
  const { state, dispatch } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const products = (state.adminProducts || PRODUCTS).filter(
    (p) =>
      (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
      (!filterCat || p.category === filterCat),
  );

  function openAdd() {
    setEditProduct(null);
    setModalOpen(true);
  }
  function openEdit(p) {
    setEditProduct(p);
    setModalOpen(true);
  }
  function deleteProduct(id) {
    dispatch({ type: "ADMIN_DELETE_PRODUCT", id });
    dispatch({
      type: "ADD_TOAST",
      toast: { type: "warning", title: "Đã xóa sản phẩm" },
    });
  }

  return (
    <div className="admin-product-tab">
      {modalOpen && (
        <AdminProductModal
          product={editProduct}
          onClose={() => setModalOpen(false)}
        />
      )}
      <div className="admin-header">
        <div>
          <div className="admin-title">📦 Quản lý sản phẩm</div>
          <div className="header-sub">
            {products.length} sản phẩm
          </div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          ➕ Thêm sản phẩm
        </button>
      </div>

      <div className="filters">
        <div className="input-group search-group">
          <span className="input-icon">🔍</span>
          <input
            className="input"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="select"
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Kho</th>
              <th>Đã bán</th>
              <th>Đánh giá</th>
              <th>Tags</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="product-cell">
                    {(() => {
                      const src = (p.images && p.images.length>0) ? p.images[0] : (p.image || p.imageUrl || p.img || p.thumbnail);
                      if (src) {
                        return <img src={src} alt={p.name} className="product-thumb" />;
                      }
                      return (
                        <div className="product-placeholder" aria-hidden>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 7H5L7 4H17L19 7H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>
                      );
                    })()}
                    <div>
                      <div className="name">{p.name}</div>
                      <div className="brand">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-cyan">{p.category}</span>
                </td>
                <td>
                  <div className="price-cell">
                    <div className="current-price">{formatPrice(p.price)}</div>
                    {p.oldPrice && (
                      <div className="old-price">{formatPrice(p.oldPrice)}</div>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className={`stock-cell ${
                      p.stock < 10 ? "low" : p.stock < 30 ? "medium" : "high"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="sold-cell">
                  {p.sold.toLocaleString()}
                </td>
                <td>
                  <div className="rating-cell">
                    <span className="star">★</span>{" "}
                    <span className="val">{p.rating}</span>
                  </div>
                </td>
                <td>
                  <div className="tags-cell">
                    {p.isNew && <span className="label label-new">New</span>}
                    {p.isHot && <span className="label label-hot">Hot</span>}
                  </div>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => openEdit(p)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(p.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
