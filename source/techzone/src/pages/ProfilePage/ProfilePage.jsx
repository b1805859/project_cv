import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { formatPrice, formatDate } from "../../utils/helpers";
import "./ProfilePage.scss";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

export function ProfilePage() {
  const { state, dispatch } = useContext(AppContext);
  const [profileTab, setProfileTab] = useState("info");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);

  const nav = (p) => {
    dispatch({ type: "SET_PAGE", page: p });
    window.scrollTo(0, 0);
  };

  if (!state.user) {
    nav("login");
    return null;
  }

  const totalSpent = state.orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((s, o) => s + o.total, 0);

  const rank = (() => {
    if (state.user.rank) return state.user.rank;
    if (totalSpent > 20000000) return "Kim cương";
    if (totalSpent > 10000000) return "Vàng";
    if (totalSpent > 5000000) return "Bạc";
    return "Đồng";
  })();

  const activityLog = [
    {
      icon: "🛒",
      text: `Đặt ${state.orders.length} đơn hàng`,
      color: "var(--accent)",
      time: "Toàn thời gian",
    },
    {
      icon: "❤️",
      text: `${state.wishlist.length} sản phẩm yêu thích`,
      color: "var(--red)",
      time: "Danh sách hiện tại",
    },
    {
      icon: "👁️",
      text: `${(state.recentlyViewed || []).length} sản phẩm đã xem`,
      color: "var(--accent2)",
      time: "Lịch sử duyệt",
    },
    {
      icon: "💰",
      text: `Chi tiêu ${formatPrice(totalSpent)}`,
      color: "var(--green)",
      time: "Tổng tích lũy",
    },
  ];

  const securityItems = [
    {
      icon: "🔑",
      title: "Đổi mật khẩu",
      desc: "Cập nhật mật khẩu bảo mật",
      action: "Đổi ngay",
      onClick: () => setShowPasswordModal(true),
    },
    {
      icon: "📱",
      title: "Xác thực 2 lớp (2FA)",
      desc: "Bảo vệ tài khoản với OTP SMS/TOTP",
      action: "Bật 2FA",
      active: false,
    },
    {
      icon: "🔗",
      title: "Liên kết Google",
      desc: "Đăng nhập nhanh qua Google OAuth2",
      action: "Liên kết",
      active: state.user.email.includes("gmail"),
    },
    {
      icon: "💻",
      title: "Phiên đăng nhập",
      desc: "3 thiết bị đang hoạt động",
      action: "Quản lý",
    },
    {
      icon: "🚪",
      title: "Đăng xuất tất cả",
      desc: "Đăng xuất khỏi tất cả thiết bị",
      action: "Đăng xuất",
      danger: true,
    },
  ];

  const addressItems = [
    {
      tag: "Nhà riêng",
      name: state.user.name,
      phone: "0912 345 678",
      addr: "123 Nguyễn Huệ, Phường Bến Nghé, Q.1, TP.HCM",
      default: true,
    },
    {
      tag: "Văn phòng",
      name: state.user.name,
      phone: "0987 654 321",
      addr: "456 Lê Lợi, Phường Bến Thành, Q.1, TP.HCM",
      default: false,
    },
  ];

  const renderProfileSection = () => {
    if (profileTab === "security") {
      return (
        <div className="card" style={{ padding: 24 }}>
          {securityItems.map((item) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: 22, marginRight: 14 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {item.title}
                  {item.active !== undefined && (
                    <span
                      className={`badge ${item.active ? "badge-green" : "badge-red"}`}
                      style={{ fontSize: 9 }}
                    >
                      {item.active ? "Đã bật" : "Chưa bật"}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  {item.desc}
                </div>
              </div>
              <button
                className={`btn ${item.danger ? "btn-danger" : "btn-secondary"} btn-sm`}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  else {
                    dispatch({
                      type: "ADD_TOAST",
                      toast: {
                        type: item.danger ? "warning" : "info",
                        title: item.title,
                      },
                    });
                  }
                }}
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (profileTab === "activity") {
      return (
        <div className="card" style={{ padding: 24 }}>
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            📊 Thống kê hoạt động
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {activityLog.map((a) => (
              <div
                key={a.text}
                style={{
                  background: "var(--card2)",
                  borderRadius: 10,
                  padding: 14,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 24 }}>{a.icon}</span>
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 13, color: a.color }}
                  >
                    {a.text}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            🕒 Lịch sử đơn hàng gần đây
          </div>
          {state.orders.slice(0, 3).map((o) => (
            <div key={o.id} className="activity-item">
              <div
                className="activity-dot"
                style={{
                  background:
                    o.status === "COMPLETED"
                      ? "var(--green)"
                      : o.status === "SHIPPING"
                      ? "var(--accent)"
                      : o.status === "CANCELLED"
                      ? "var(--red)"
                      : "var(--yellow)",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{o.id}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  {formatDate(o.date)} · {o.items} sản phẩm
                </div>
              </div>
              <strong
                style={{
                  fontFamily: "var(--font-head)",
                  color: "var(--accent)",
                  fontSize: 14,
                }}
              >
                {formatPrice(o.total)}
              </strong>
            </div>
          ))}
          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 12 }}
            onClick={() => nav("orders")}
          >
            Xem tất cả đơn hàng →
          </button>
        </div>
      );
    }

    if (profileTab === "orders") {
      return (
        <div className="card" style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700 }}>
              📦 Đơn hàng của bạn
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => nav("orders")}
            >
              Xem tất cả
            </button>
          </div>
          {state.orders.slice(0, 4).map((o) => (
            <div
              key={o.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{o.id}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {formatDate(o.date)} · {o.items} sản phẩm
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: "var(--accent)" }}>
                  {formatPrice(o.total)}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{o.status}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (profileTab === "address") {
      return (
        <div className="card" style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700 }}>
              📍 Địa chỉ giao hàng
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowAddressModal(true)}
            >
              + Thêm địa chỉ
            </button>
          </div>
          {addressItems.map((addr, i) => (
            <div
              key={i}
              style={{
                background: "var(--card2)",
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
                border: `1px solid ${addr.default ? "rgba(0,212,255,.3)" : "var(--border)"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span className="badge badge-cyan" style={{ fontSize: 10 }}>
                  {addr.tag}
                </span>
                {addr.default && (
                  <span className="badge badge-green" style={{ fontSize: 10 }}>
                    ✓ Mặc định
                  </span>
                )}
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                {addr.name} · {addr.phone}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted2)" }}>
                {addr.addr}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn btn-secondary btn-sm">✏️ Sửa</button>
                {!addr.default && (
                  <button className="btn btn-ghost btn-sm">Đặt mặc định</button>
                )}
                {!addr.default && (
                  <button className="btn btn-danger btn-sm">🗑️</button>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 18 }}>📋 Thông tin cá nhân</div>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowEditInfoModal(true)}>✏️ Chỉnh sửa</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Họ và tên</div>
            <div style={{ fontWeight: 600 }}>{state.user.name}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Email</div>
            <div style={{ fontWeight: 600 }}>{state.user.email}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Số điện thoại</div>
            <div style={{ fontWeight: 600 }}>0912 345 678</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Ngày sinh</div>
            <div style={{ fontWeight: 600 }}>01/01/1990</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Giới tính</div>
            <div style={{ fontWeight: 600 }}>Nam</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Ngày tham gia</div>
            <div style={{ fontWeight: 600 }}>01/05/2023</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page admin-dashboard-page profile-page">
      <div className={`profile-sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <div className="admin-layout">
        <ProfileSidebar user={state.user} rank={rank} active={profileTab} onSelect={(tab) => { setProfileTab(tab); setSidebarOpen(false); }} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="admin-content">
          <div className="admin-header" style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              ☰
            </button>
            <div className="admin-title">👤 Hồ sơ cá nhân</div>
          </div>

          <main className="profile-main">
            <section className="profile-summary-card card">
              <div className="profile-summary-stats">
                {[
                  { label: "Đơn hàng", value: state.orders.length, icon: "📦", color: "var(--accent)" },
                  { label: "Đã chi", value: formatPrice(totalSpent), icon: "💰", color: "var(--green)", small: true },
                  { label: "Yêu thích", value: state.wishlist.length, icon: "❤️", color: "var(--red)" },
                  { label: "Điểm tích lũy", value: Math.floor(totalSpent / 10000), icon: "⭐", color: "var(--yellow)" },
                ].map((s) => (
                  <div key={s.label} className="profile-stat-card">
                    <div className="profile-stat-icon">{s.icon}</div>
                    <div className="profile-stat-value" style={{ color: s.color }}>
                      {s.value}
                    </div>
                    <div className="profile-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>
            {renderProfileSection()}
          </main>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400, padding: 24, margin: "0 auto", marginBottom: "10vh" }}>
            <h3 style={{ fontFamily: "var(--font-head)", marginBottom: 16 }}>Đổi mật khẩu</h3>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Mật khẩu hiện tại</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Mật khẩu mới</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Xác nhận mật khẩu mới</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setShowPasswordModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => {
                setShowPasswordModal(false);
                dispatch({ type: "ADD_TOAST", toast: { type: "success", title: "Đã đổi mật khẩu thành công!" } });
              }}>Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}

      {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500, padding: 24, margin: "0 auto", marginBottom: "10vh" }}>
            <h3 style={{ fontFamily: "var(--font-head)", marginBottom: 16 }}>Thêm địa chỉ mới</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Họ và tên</label>
                <input type="text" className="input" placeholder="Tên người nhận" defaultValue={state.user.name} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Số điện thoại</label>
                <input type="text" className="input" placeholder="09xx xxx xxx" />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Địa chỉ chi tiết (Số nhà, đường...)</label>
              <input type="text" className="input" placeholder="Ví dụ: 123 Lê Lợi..." />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Tỉnh/Thành phố</label>
                <select className="input">
                  <option>Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Loại địa chỉ</label>
                <select className="input">
                  <option>Nhà riêng</option>
                  <option>Văn phòng</option>
                </select>
              </div>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 20, cursor: "pointer" }}>
              <input type="checkbox" /> Đặt làm địa chỉ mặc định
            </label>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setShowAddressModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => {
                setShowAddressModal(false);
                dispatch({ type: "ADD_TOAST", toast: { type: "success", title: "Đã thêm địa chỉ!" } });
              }}>Lưu địa chỉ</button>
            </div>
          </div>
        </div>
      )}

      {showEditInfoModal && (
        <div className="modal-overlay" onClick={() => setShowEditInfoModal(false)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500, padding: 24, margin: "0 auto", marginBottom: "15vh" }}>
            <h3 style={{ fontFamily: "var(--font-head)", marginBottom: 16 }}>Chỉnh sửa thông tin cá nhân</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Họ và tên</label>
                <input type="text" className="input" defaultValue={state.user.name} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Số điện thoại</label>
                <input type="text" className="input" defaultValue="0912 345 678" />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Email</label>
              <input type="email" className="input" defaultValue={state.user.email} disabled style={{ opacity: 0.7 }} />
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Email không thể thay đổi</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Ngày sinh</label>
                <input type="date" className="input" defaultValue="1990-01-01" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Giới tính</label>
                <select className="input" defaultValue="Nam">
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setShowEditInfoModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => {
                setShowEditInfoModal(false);
                dispatch({ type: "ADD_TOAST", toast: { type: "success", title: "Đã cập nhật thông tin!" } });
              }}>Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
