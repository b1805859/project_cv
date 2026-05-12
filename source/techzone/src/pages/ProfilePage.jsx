import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { formatPrice, formatDate } from "../utils/helpers";

export function ProfilePage() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p) => {
    dispatch({ type: "SET_PAGE", page: p });
    window.scrollTo(0, 0);
  };
  const [profileTab, setProfileTab] = useState("info");
  if (!state.user) {
    nav("login");
    return null;
  }

  const totalSpent = state.orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((s, o) => s + o.total, 0);
  const completedOrders = state.orders.filter(
    (o) => o.status === "COMPLETED",
  ).length;
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

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-title">👤 Hồ sơ cá nhân</h1>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "32px auto", padding: "0 24px" }}>
        {/* USER CARD */}
        <div className="card" style={{ padding: 28, marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,var(--accent),var(--accent2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-head)",
                  fontSize: 32,
                  fontWeight: 800,
                  boxShadow:
                    "0 0 0 3px var(--card),0 0 0 6px rgba(0,212,255,.3)",
                }}
              >
                {state.user.name[0]}
              </div>
              {state.user.role === "ADMIN" && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    background: "var(--accent2)",
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                  }}
                >
                  ⭐
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {state.user.name}
              </div>
              <div
                style={{ color: "var(--muted)", fontSize: 14, marginBottom: 6 }}
              >
                {state.user.email}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  className={`badge ${state.user.role === "ADMIN" ? "badge-purple" : "badge-cyan"}`}
                >
                  {state.user.role}
                </span>
                {completedOrders >= 3 && (
                  <span className="badge badge-orange">
                    🏆 Khách hàng thân thiết
                  </span>
                )}
                {totalSpent > 10000000 && (
                  <span className="badge badge-green">💎 VIP</span>
                )}
              </div>
            </div>
          </div>

          {/* STATS ROW */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 12,
              borderTop: "1px solid var(--border)",
              paddingTop: 20,
            }}
          >
            {[
              {
                label: "Đơn hàng",
                value: state.orders.length,
                icon: "📦",
                color: "var(--accent)",
              },
              {
                label: "Đã chi",
                value: formatPrice(totalSpent),
                icon: "💰",
                color: "var(--green)",
                small: true,
              },
              {
                label: "Yêu thích",
                value: state.wishlist.length,
                icon: "❤️",
                color: "var(--red)",
              },
              {
                label: "Điểm tích lũy",
                value: Math.floor(totalSpent / 10000),
                icon: "⭐",
                color: "var(--yellow)",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "12px 8px",
                  background: "var(--card2)",
                  borderRadius: 10,
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: s.small ? 13 : 18,
                    fontWeight: 800,
                    color: s.color,
                    lineHeight: 1.2,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="tabs" style={{ marginBottom: 20 }}>
          {[
            ["info", "📋 Thông tin"],
            ["security", "🔒 Bảo mật"],
            ["activity", "📊 Hoạt động"],
            ["address", "📍 Địa chỉ"],
          ].map(([t, l]) => (
            <div
              key={t}
              className={`tab${profileTab === t ? " active" : ""}`}
              onClick={() => setProfileTab(t)}
            >
              {l}
            </div>
          ))}
        </div>

        {profileTab === "info" && (
          <div className="card" style={{ padding: 24 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {[
                ["Họ tên", state.user.name, "text"],
                ["Email", state.user.email, "email"],
                ["Điện thoại", "0912 345 678", "tel"],
                ["Ngày sinh", "01/01/1990", "text"],
                ["Địa chỉ", "123 Nguyễn Huệ, Q1, TP.HCM", "text"],
                ["Giới tính", "Nam", "text"],
              ].map(([k, v, t]) => (
                <div key={k} className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{k}</label>
                  <input className="input" type={t} defaultValue={v} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button
                className="btn btn-primary"
                onClick={() =>
                  dispatch({
                    type: "ADD_TOAST",
                    toast: { type: "success", title: "Đã lưu thông tin!" },
                  })
                }
              >
                💾 Lưu thay đổi
              </button>
              <button className="btn btn-ghost" onClick={() => nav("orders")}>
                📦 Xem đơn hàng
              </button>
            </div>
          </div>
        )}

        {profileTab === "security" && (
          <div className="card" style={{ padding: 24 }}>
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 22, marginRight: 14 }}>
                  {item.icon}
                </span>
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
        )}

        {profileTab === "activity" && (
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
        )}

        {profileTab === "address" && (
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
            {[
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
            ].map((addr, i) => (
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
                    <span
                      className="badge badge-green"
                      style={{ fontSize: 10 }}
                    >
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
                    <button className="btn btn-ghost btn-sm">
                      Đặt mặc định
                    </button>
                  )}
                  {!addr.default && (
                    <button className="btn btn-danger btn-sm">🗑️</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
