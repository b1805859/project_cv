import { useContext } from "react";
import { CATEGORIES, PRODUCTS } from "../../data/mockData";
import { AppContext } from "../../context/AppContext";
import { formatPrice, formatDate } from "../../utils/helpers";
import { AdminProductTab } from "../AdminProductTab/AdminProductTab";
import { AdminCouponTab } from "../AdminCouponTab/AdminCouponTab";
import "./AdminDashboard.scss";

export function AdminDashboard() {
  const { state, dispatch } = useContext(AppContext);

  if (!state.user || state.user.role !== "ADMIN")
    return (
      <div className="admin-dashboard-page">
        <div className="no-access">
          <div className="icon">🚫</div>
          <h2 className="title">Không có quyền truy cập</h2>
          <p className="sub">Đăng nhập bằng admin@techzone.vn để tiếp tục</p>
        </div>
      </div>
    );

  const tabs = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "products", icon: "📦", label: "Sản phẩm" },
    { id: "orders", icon: "🛒", label: "Đơn hàng" },
    { id: "users", icon: "👥", label: "Người dùng" },
    { id: "categories", icon: "🏷️", label: "Danh mục" },
    { id: "coupons", icon: "🎟️", label: "Mã giảm giá" },
    { id: "analytics", icon: "📈", label: "Thống kê" },
  ];

  const statusConfig = {
    PENDING: { label: "Chờ xử lý", cls: "badge-orange" },
    PAID: { label: "Đã thanh toán", cls: "badge-cyan" },
    SHIPPING: { label: "Đang giao", cls: "badge-purple" },
    COMPLETED: { label: "Hoàn thành", cls: "badge-green" },
    CANCELLED: { label: "Đã hủy", cls: "badge-red" },
  };

  const totalRevenue = state.orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((s, o) => s + o.total, 0);
  const monthlyData = [42, 67, 55, 80, 73, 90, 85, 110, 95, 120, 108, 135];
  const catData = CATEGORIES.map((c) => ({
    name: c.name,
    count: (state.adminProducts || PRODUCTS).filter((p) => p.catId === c.id)
      .length,
    icon: c.icon,
  }));

  return (
    <div className="page admin-dashboard-page">
      <div className="admin-layout">
        <aside className="admin-sidebar admin-sidebar-custom">
          <div className="sidebar-header">
            <div className="brand">TechZone</div>
            <div className="version">Admin Panel v2.0</div>
          </div>
          <div className="admin-nav-label">// Quản lý</div>
          {tabs.map((t) => (
            <div
              key={t.id}
              className={`admin-nav-item${state.adminTab === t.id ? " active" : ""}`}
              onClick={() => dispatch({ type: "SET_ADMIN_TAB", tab: t.id })}
            >
              <span>{t.icon}</span>
              {t.label}
            </div>
          ))}
          <div className="admin-nav-label" style={{ marginTop: 16 }}>
            // Hệ thống
          </div>
          {[
            ["⚙️", "Cài đặt"],
            ["🔒", "Phân quyền"],
            ["📋", "Logs hệ thống"],
            ["💾", "Backup DB"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="admin-nav-item"
              onClick={() =>
                dispatch({
                  type: "ADD_TOAST",
                  toast: { type: "info", title: label },
                })
              }
            >
              <span>{icon}</span>
              {label}
            </div>
          ))}
          <div className="sidebar-footer">
            <div className="user-info-mini">
              <div className="avatar-circle">
                {state.user.name[0]}
              </div>
              <div className="user-meta">
                <div className="name">{state.user.name}</div>
                <div className="role">Administrator</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="admin-content">
          {/* ── DASHBOARD ── */}
          {state.adminTab === "dashboard" && (
            <>
              <div className="admin-header dashboard-header">
                <div>
                  <div className="admin-title">📊 Dashboard</div>
                  <div className="sub">
                    Tổng quan hoạt động —{" "}
                    {new Date().toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div className="actions">
                  <select className="select">
                    {["Tháng này", "Tháng trước", "Quý này", "Năm nay"].map(
                      (o) => (
                        <option key={o}>{o}</option>
                      ),
                    )}
                  </select>
                  <button className="btn btn-primary btn-sm">
                    📥 Xuất báo cáo
                  </button>
                </div>
              </div>

              <div className="stats-grid">
                {[
                  {
                    icon: "💰",
                    label: "Doanh thu",
                    value: formatPrice(totalRevenue),
                    change: "+12.5%",
                    color: "rgba(0,212,255,.1)",
                    trend: "↑",
                  },
                  {
                    icon: "📦",
                    label: "Đơn hàng",
                    value: state.orders.length,
                    change: "+8.2%",
                    color: "rgba(123,47,247,.1)",
                    trend: "↑",
                  },
                  {
                    icon: "👥",
                    label: "Người dùng",
                    value: "1,284",
                    change: "+23.1%",
                    color: "rgba(0,230,118,.1)",
                    trend: "↑",
                  },
                  {
                    icon: "🛍️",
                    label: "Sản phẩm",
                    value: (state.adminProducts || PRODUCTS).length,
                    change: "+4",
                    color: "rgba(255,107,53,.1)",
                    trend: "↑",
                  },
                ].map((s) => (
                  <div key={s.label} className="stat-card">
                    <div className="stat-card-header">
                      <div
                        className="stat-card-icon"
                        style={{ background: s.color, marginBottom: 0, fontSize: 22 }}
                      >
                        {s.icon}
                      </div>
                      <span className="trend-badge">
                        {s.trend} {s.change}
                      </span>
                    </div>
                    <div className="stat-card-value">{s.value}</div>
                    <div className="stat-card-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid-2-1">
                {/* Revenue Chart */}
                <div className="card chart-container">
                  <div className="chart-header">
                    <div className="title">📈 Doanh thu 12 tháng</div>
                    <div className="unit">Đơn vị: triệu đồng</div>
                  </div>
                  <div className="bar-chart">
                    {monthlyData.map((v, i) => (
                      <div key={i} className="bar-wrapper">
                        <div className="bar-val">{v}</div>
                        <div
                          className={`bar ${i === monthlyData.length - 1 ? 'active' : 'normal'}`}
                          style={{ height: `${(v / 135) * 100}%` }}
                          title={`Tháng ${i + 1}: ${v}M`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    {["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="card top-products-container">
                  <div className="title">🔥 Top bán chạy</div>
                  {[...(state.adminProducts || PRODUCTS)]
                    .sort((a, b) => b.sold - a.sold)
                    .slice(0, 5)
                    .map((p, i) => (
                      <div key={p.id} className="top-product-item">
                        <span className={`rank ${i < 3 ? 'top-3' : 'other'}`}>
                          #{i + 1}
                        </span>
                        <span className="emoji">{p.emoji}</span>
                        <div className="info">
                          <div className="name">
                            {p.name.slice(0, 20)}
                            {p.name.length > 20 ? "..." : ""}
                          </div>
                          <div className="sold">{p.sold.toLocaleString()} đã bán</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="grid-1-1">
                <div className="card" style={{ padding: 20 }}>
                  <div className="admin-title" style={{ fontSize: 16, marginBottom: 14 }}>🏷️ Phân bố danh mục</div>
                  {catData.map((c) => (
                    <div key={c.name} className="cat-item">
                      <span className="icon">{c.icon}</span>
                      <div className="content">
                        <div className="meta">
                          <span className="name">{c.name}</span>
                          <span className="count">{c.count} SP</span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${(c.count / (state.adminProducts || PRODUCTS).length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card" style={{ padding: 20 }}>
                  <div className="admin-title" style={{ fontSize: 16, marginBottom: 14 }}>💳 Trạng thái đơn hàng</div>
                  {Object.entries(statusConfig).map(([key, cfg]) => {
                    const count = state.orders.filter((o) => o.status === key).length;
                    const pct = state.orders.length ? Math.round((count / state.orders.length) * 100) : 0;
                    return (
                      <div key={key} className="status-item">
                        <span className={`badge status-badge ${cfg.cls}`}>
                          {cfg.label}
                        </span>
                        <div className="progress-wrapper">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `${pct}%`,
                                background: key === "COMPLETED" ? "var(--green)" : key === "CANCELLED" ? "var(--red)" : key === "SHIPPING" ? "var(--accent2)" : "var(--accent)",
                              }}
                            />
                          </div>
                        </div>
                        <span className="count">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent orders table */}
              <div className="table-wrapper">
                <div className="table-header">
                  <div className="title">📋 Đơn hàng gần đây</div>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => dispatch({ type: "SET_ADMIN_TAB", tab: "orders" })}
                  >
                    Xem tất cả →
                  </button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Ngày</th>
                      <th>Tổng tiền</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.orders.slice(0, 5).map((o) => {
                      const cfg = statusConfig[o.status] || { label: o.status, cls: "badge-cyan" };
                      return (
                        <tr key={o.id}>
                          <td className="mono-id">{o.id}</td>
                          <td style={{ color: "var(--muted)" }}>{formatDate(o.date)}</td>
                          <td className="head-total">{formatPrice(o.total)}</td>
                          <td><span className="badge badge-purple">{o.payment}</span></td>
                          <td><span className={`badge ${cfg.cls}`}>{cfg.label}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── PRODUCTS ── */}
          {state.adminTab === "products" && <AdminProductTab />}

          {/* ── ORDERS ── */}
          {state.adminTab === "orders" && (
            <>
              <div className="admin-header">
                <div className="admin-title">🛒 Quản lý đơn hàng</div>
                <div className="dashboard-header actions">
                  <select className="select">
                    {["Tất cả", "PENDING", "PAID", "SHIPPING", "COMPLETED", "CANCELLED"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button className="btn btn-primary btn-sm">📥 Xuất Excel</button>
                </div>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Ngày</th>
                      <th>Sản phẩm</th>
                      <th>Tổng tiền</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.orders.map((o) => {
                      const cfg = statusConfig[o.status] || { label: o.status, cls: "badge-cyan" };
                      const nextStatus = { PENDING: "PAID", PAID: "SHIPPING", SHIPPING: "COMPLETED" };
                      return (
                        <tr key={o.id}>
                          <td className="mono-id">{o.id}</td>
                          <td style={{ color: "var(--muted)" }}>{formatDate(o.date)}</td>
                          <td>{o.items} sản phẩm</td>
                          <td className="head-total">{formatPrice(o.total)}</td>
                          <td><span className="badge badge-purple">{o.payment}</span></td>
                          <td><span className={`badge ${cfg.cls}`}>{cfg.label}</span></td>
                          <td>
                            <div style={{ display: "flex", gap: 6 }}>
                              {nextStatus[o.status] && (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => {
                                    dispatch({ type: "UPDATE_ORDER_STATUS", id: o.id, status: nextStatus[o.status] });
                                    dispatch({ type: "ADD_TOAST", toast: { type: "success", title: "Cập nhật thành công", msg: `${o.id} → ${nextStatus[o.status]}` } });
                                  }}
                                >
                                  Tiếp theo →
                                </button>
                              )}
                              <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => dispatch({ type: "ADD_TOAST", toast: { type: "info", title: `Chi tiết: ${o.id}` } })}
                              >
                                👁
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── USERS ── */}
          {state.adminTab === "users" && (
            <>
              <div className="admin-header">
                <div className="admin-title">👥 Quản lý người dùng</div>
                <button className="btn btn-primary btn-sm">➕ Thêm Staff</button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Người dùng</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Quyền hạn</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Admin TechZone", email: "admin@techzone.vn", role: "ADMIN", perms: ["ALL"], status: "Hoạt động" },
                      { name: "Nguyễn Văn Support", email: "support@techzone.vn", role: "STAFF", perms: ["CHAT_SUPPORT", "ORDER_UPDATE_STATUS"], status: "Hoạt động" },
                      { name: "Trần Thị Kế Toán", email: "ketoan@techzone.vn", role: "STAFF", perms: ["CREATE_INVOICE", "VIEW_DASHBOARD"], status: "Hoạt động" },
                      { name: "Lê Văn A", email: "user1@gmail.com", role: "USER", perms: [], status: "Hoạt động" },
                      { name: "Phạm Thị B", email: "user2@gmail.com", role: "USER", perms: [], status: "Bị khóa" },
                    ].map((u, i) => (
                      <tr key={i}>
                        <td>
                          <div className="user-cell">
                            <div className="avatar">{u.name[0]}</div>
                            <span className="name">{u.name}</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--muted)", fontSize: 13 }}>{u.email}</td>
                        <td>
                          <span className={`badge ${u.role === "ADMIN" ? "badge-purple" : u.role === "STAFF" ? "badge-cyan" : "badge-green"}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <div className="perms-list">
                            {u.perms.length === 0 ? (
                              <span className="perm-basic">Cơ bản</span>
                            ) : (
                              u.perms.map((p) => (
                                <span key={p} className="badge badge-orange perm-badge">{p}</span>
                              ))
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${u.status === "Hoạt động" ? "badge-green" : "badge-red"}`}>{u.status}</span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="btn btn-secondary btn-sm" onClick={() => dispatch({ type: "ADD_TOAST", toast: { type: "info", title: `Sửa: ${u.name}` } })}>✏️</button>
                            {u.role !== "ADMIN" && (
                              <button className="btn btn-danger btn-sm" onClick={() => dispatch({ type: "ADD_TOAST", toast: { type: "warning", title: `Khóa: ${u.name}` } })}>🔒</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── CATEGORIES ── */}
          {state.adminTab === "categories" && (
            <>
              <div className="admin-header">
                <div className="admin-title">🏷️ Quản lý danh mục</div>
                <button className="btn btn-primary btn-sm">➕ Thêm danh mục</button>
              </div>
              <div className="coupon-grid">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="card cat-card-item">
                    <div className="icon">{cat.icon}</div>
                    <div className="name">{cat.name}</div>
                    <div className="count">
                      {(state.adminProducts || PRODUCTS).filter((p) => p.catId === cat.id).length} sản phẩm
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${((state.adminProducts || PRODUCTS).filter((p) => p.catId === cat.id).length / (state.adminProducts || PRODUCTS).length) * 100}%` }}
                      />
                    </div>
                    <div className="actions">
                      <button className="btn btn-secondary btn-sm edit-btn" onClick={() => dispatch({ type: "ADD_TOAST", toast: { type: "info", title: `Sửa: ${cat.name}` } })}>✏️ Sửa</button>
                      <button className="btn btn-danger btn-sm" onClick={() => dispatch({ type: "ADD_TOAST", toast: { type: "warning", title: `Xác nhận xóa ${cat.name}?` } })}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── COUPONS ── */}
          {state.adminTab === "coupons" && <AdminCouponTab />}

          {/* ── ANALYTICS ── */}
          {state.adminTab === "analytics" && (
            <>
              <div className="admin-header">
                <div className="admin-title">📈 Thống kê nâng cao</div>
                <button className="btn btn-primary btn-sm" onClick={() => dispatch({ type: "ADD_TOAST", toast: { type: "success", title: "Xuất báo cáo PDF" } })}>📥 Xuất PDF</button>
              </div>

              <div className="analytics-grid">
                {[
                  { label: "Tỷ lệ chuyển đổi", value: "3.24%", change: "+0.8%", icon: "🎯", color: "var(--accent)" },
                  { label: "Giá trị đơn TB", value: formatPrice(totalRevenue / Math.max(1, state.orders.length)), change: "+5.2%", icon: "💵", color: "var(--green)" },
                  { label: "Tỷ lệ hủy đơn", value: `${state.orders.filter((o) => o.status === "CANCELLED").length}/${state.orders.length}`, change: "-1.2%", icon: "❌", color: "var(--red)" },
                ].map((s) => (
                  <div key={s.label} className="stat-card analytic-card">
                    <div className="icon">{s.icon}</div>
                    <div className="val" style={{ color: s.color }}>{s.value}</div>
                    <div className="label">{s.label}</div>
                    <div className="change" style={{ color: s.change.startsWith("+") ? "var(--green)" : "var(--red)" }}>{s.change} tháng trước</div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: 20, marginBottom: 20 }}>
                <div className="admin-title" style={{ fontSize: 16, marginBottom: 16 }}>💰 Doanh thu theo phương thức thanh toán</div>
                <div className="payment-grid">
                  {[
                    { name: "MoMo", icon: "🟣", revenue: state.orders.filter((o) => o.payment === "MoMo" && o.status !== "CANCELLED").reduce((s, o) => s + o.total, 0), count: state.orders.filter((o) => o.payment === "MoMo").length, color: "var(--accent2)" },
                    { name: "COD", icon: "💵", revenue: state.orders.filter((o) => o.payment === "COD" && o.status !== "CANCELLED").reduce((s, o) => s + o.total, 0), count: state.orders.filter((o) => o.payment === "COD").length, color: "var(--green)" },
                  ].map((pt) => (
                    <div key={pt.name} className="payment-card">
                      <div className="header">
                        <span className="icon">{pt.icon}</span>
                        <div className="info">
                          <div className="name">{pt.name}</div>
                          <div className="count">{pt.count} đơn hàng</div>
                        </div>
                      </div>
                      <div className="revenue" style={{ color: pt.color }}>{formatPrice(pt.revenue)}</div>
                      <div className="progress" style={{ marginTop: 8 }}>
                        <div className="progress-bar" style={{ width: `${totalRevenue ? Math.round((pt.revenue / totalRevenue) * 100) : 0}%`, background: pt.color }} />
                      </div>
                      <div className="pct-hint">{totalRevenue ? Math.round((pt.revenue / totalRevenue) * 100) : 0}% tổng doanh thu</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <div className="admin-title" style={{ fontSize: 16, marginBottom: 14 }}>📦 Tồn kho thấp</div>
                <div className="low-stock-list">
                  {(state.adminProducts || PRODUCTS)
                    .filter((p) => p.stock < 20)
                    .sort((a, b) => a.stock - b.stock)
                    .map((p) => (
                      <div key={p.id} className={`low-stock-item ${p.stock < 10 ? 'critical' : 'warning'}`}>
                        <span className="emoji">{p.emoji}</span>
                        <div className="info">
                          <div className="name">{p.name}</div>
                          <div className="progress stock-progress">
                            <div className="progress-bar" style={{ width: `${Math.min(p.stock * 5, 100)}%`, background: p.stock < 10 ? "var(--red)" : "var(--yellow)" }} />
                          </div>
                        </div>
                        <span className={`stock-val ${p.stock < 10 ? 'critical' : 'warning'}`}>{p.stock} còn lại</span>
                        <button className="btn btn-secondary btn-sm" onClick={() => dispatch({ type: "ADD_TOAST", toast: { type: "info", title: `Nhập hàng: ${p.name}` } })}>Nhập hàng</button>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
