import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { formatPrice, formatDate } from "../../utils/helpers";
import "./ProfilePage.scss";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";

export function ProfilePage() {
  const { state, dispatch } = useContext(AppContext);
  const [profileTab, setProfileTab] = useState("info");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                onClick={() =>
                  dispatch({
                    type: "ADD_TOAST",
                    toast: {
                      type: item.danger ? "warning" : "info",
                      title: item.title,
                    },
                  })
                }
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
              onClick={() =>
                dispatch({
                  type: "ADD_TOAST",
                  toast: { type: "info", title: "Thêm địa chỉ mới" },
                })
              }
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
        <div>Chọn mục bên trái để xem thông tin tài khoản.</div>
      </div>
    );
  };

  return (
    <div className="page profile-page">
      <ProfileSidebar user={state.user} rank={rank} active={profileTab} onSelect={(tab) => { setProfileTab(tab); setSidebarOpen(false); }} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="page-header">
        <div className="page-header-inner">
          <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            ☰
          </button>
          <h1 className="page-title">👤 Hồ sơ cá nhân</h1>
        </div>
      </div>

      <div className="profile-layout">
        <main className="profile-main" style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
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
  );
}
