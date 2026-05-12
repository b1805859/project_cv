import { useState, useEffect, useRef, useContext } from "react";
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
  const nav = (page, data) => {
    dispatch({ type: "SET_PAGE", page, data });
    window.scrollTo(0, 0);
  };
  const isAdmin = state.user?.role === "ADMIN";

  return (
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
    </nav>
  );
}
