import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from 'react-dom';
import { AppContext } from "../../context/AppContext";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { LiveSearch } from "../LiveSearch/LiveSearch";
import { NotificationCenter } from "../NotificationCenter/NotificationCenter";
import "./NavbarV2.scss";

export function NavbarV2() {
  const { state, dispatch } = useContext(AppContext);
  const [dropOpen, setDropOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef();
  const nav = (page, data) => {
    dispatch({ type: "SET_PAGE", page, data });
    window.scrollTo(0, 0);
    setDrawerOpen(false);
  };
  const isAdmin = state.user?.role === "ADMIN";

  const drawerItems = [
    { key: "wishlist", icon: "❤️", label: "Yêu thích", action: () => nav("wishlist") },
    { key: "cart", icon: "🛒", label: `Giỏ hàng (${cartCount})`, action: () => nav("cart") },
    { key: "notifications", icon: "🔔", label: "Thông báo", action: () => nav("notifications") },
    { key: "chat", icon: "💬", label: "Tin nhắn", action: () => { dispatch({ type: "TOGGLE_CHAT" }); setDrawerOpen(false); } },
  ];

  const authItem = state.user
    ? { key: "profile", icon: "👤", label: "Hồ sơ", action: () => nav("profile") }
    : { key: "login", icon: "🔑", label: "Đăng nhập", action: () => nav("login") };

  useEffect(() => {
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setDrawerOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    if (drawerOpen) document.body.classList.add('drawer-open');
    else document.body.classList.remove('drawer-open');
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove('drawer-open');
    };
  }, [drawerOpen]);

  const portalRoot = typeof window !== 'undefined' ? document.getElementById('portal-root') : null;

  return (
    <>
    <nav className="navbar-v2">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => nav("home")}>
          Tech<span>Zone</span>
        </div>

        <div className="nav-links">
          {[
            ["home", "Trang chủ"],
            ["products", "Sản phẩm"],
            ["flash-sale", "⚡ Flash Sale"],
            ["about", "Về chúng tôi"],
          ].map(([p, l]) => (
            <div
              key={p}
              className={`nav-link ${state.page === p ? "active" : ""} ${p === "flash-sale" ? "flash-sale" : ""}`}
              onClick={() => nav(p)}
            >
              {l}
            </div>
          ))}
          {isAdmin && (
            <div
              className={`nav-link ${state.page === "admin" ? "active" : ""}`}
              onClick={() => nav("admin")}
            >
              ⚙️ Admin
            </div>
          )}
        </div>

        {/* Live Search */}
        <LiveSearch />

        <button
          className="btn btn-icon btn-secondary nav-toggler"
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label="Open mobile menu"
        >
          ☰
        </button>

        <div className="nav-actions">
          <ThemeToggle />
          <NotificationCenter />

          <button
            className="btn btn-icon btn-secondary btn-relative"
            onClick={() => nav("wishlist")}
            title="Yêu thích"
          >
            ❤️
            {state.wishlist.length > 0 && (
              <span className="cart-count">
                {state.wishlist.length}
              </span>
            )}
          </button>

          <button
            className="btn btn-icon btn-secondary btn-relative"
            onClick={() => nav("cart")}
            title="Giỏ hàng"
          >
            <span style={{ fontSize: 18 }}>🛒</span>
            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>

          {state.user ? (
            <div ref={ref} className="user-container">
              <button
                className="btn btn-primary user-btn"
                onClick={() => setDropOpen(!dropOpen)}
              >
                <div className="avatar-mini">
                  {state.user.name[0]}
                </div>
                <span className="name-split">
                  {state.user.name.split(" ")[0]}
                </span>
                <span className="arrow">▼</span>
              </button>

              {dropOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-avatar">
                      {state.user.name[0]}
                    </div>
                    <div className="user-info">
                      <div className="name">{state.user.name}</div>
                      <div className="email">{state.user.email}</div>
                    </div>
                  </div>

                  <div
                    className="user-drop-item"
                    onClick={() => {
                      nav("profile");
                      setDropOpen(false);
                    }}
                  >
                    👤 Hồ sơ của tôi
                  </div>
                  <div
                    className="user-drop-item"
                    onClick={() => {
                      nav("orders");
                      setDropOpen(false);
                    }}
                  >
                    📦 Đơn hàng
                  </div>
                  <div
                    className="user-drop-item"
                    onClick={() => {
                      nav("wishlist");
                      setDropOpen(false);
                    }}
                  >
                    ❤️ Yêu thích ({state.wishlist.length})
                  </div>

                  {isAdmin && (
                    <div
                      className="user-drop-item"
                      onClick={() => {
                        nav("admin");
                        setDropOpen(false);
                      }}
                    >
                      ⚙️ Quản trị Admin
                    </div>
                  )}

                  <div className="dropdown-sep" />

                  <div
                    className="user-drop-item logout"
                    onClick={() => {
                      dispatch({ type: "LOGOUT" });
                      setDropOpen(false);
                      dispatch({
                        type: "ADD_TOAST",
                        toast: { type: "info", title: "Đã đăng xuất" },
                      });
                    }}
                  >
                    🚪 Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => nav("login")}>
              Đăng nhập
            </button>
          )}
        </div>
      </div>

      {portalRoot && drawerOpen && createPortal(
        <div className="mobile-drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div ref={drawerRef} className="mobile-drawer" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="drawer-header">
              <span>Menu</span>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)}>
                ✕
              </button>
            </div>
            <div className="drawer-items">
              <ul className="drawer-list">
                {drawerItems.map((item) => (
                  <li key={item.key} className="drawer-list-item">
                    <button className={`drawer-item ${state.page === item.key ? 'active' : ''}`} onClick={() => { item.action && item.action(); setDrawerOpen(false); }}>
                      <span className="drawer-icon" aria-hidden>{item.icon}</span>
                      <span className="drawer-label">{item.label}</span>
                    </button>
                  </li>
                ))}
                <li className="drawer-list-item">
                  <button className={`drawer-item drawer-item-strong ${state.page === authItem.key ? 'active' : ''}`} onClick={() => { authItem.action && authItem.action(); setDrawerOpen(false); }}>
                    <span className="drawer-icon" aria-hidden>{authItem.icon}</span>
                    <span className="drawer-label">{authItem.label}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>, portalRoot
      )}
    </nav>
    </>
  );
}
