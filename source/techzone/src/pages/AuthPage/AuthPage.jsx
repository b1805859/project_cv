import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { authService } from "../../services/authService";
import "./AuthPage.scss";

export function AuthPage() {
  const { dispatch } = useContext(AppContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const nav = (p) => {
    dispatch({ type: "SET_PAGE", page: p });
    window.scrollTo(0, 0);
  };

  async function handleAuth() {
    if (!form.email || !form.password) {
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "error",
          title: "Thiếu thông tin",
          msg: "Vui lòng điền email và mật khẩu",
        },
      });
      return;
    }

    if (mode === "register" && !form.name) {
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "error",
          title: "Thiếu thông tin",
          msg: "Vui lòng điền họ và tên",
        },
      });
      return;
    }

    if (mode === "register" && form.password !== form.confirm) {
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "error",
          title: "Sai mật khẩu xác nhận",
          msg: "Mật khẩu xác nhận không trùng khớp",
        },
      });
      return;
    }

    setLoading(true);
    try {
      if (mode === "register") {
        await authService.handleRegister({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: "",
          avatar: "",
          role: "USER"
        });
        dispatch({
          type: "ADD_TOAST",
          toast: {
            type: "success",
            title: "Tạo tài khoản thành công!",
            msg: "Đăng nhập với thông tin vừa đăng ký.",
          },
        });
        setMode("login");
      } else {
        const user = await authService.handleLogin(form.email, form.password);
        dispatch({ type: "SET_USER", user });
        dispatch({
          type: "ADD_TOAST",
          toast: {
            type: "success",
            title: "Đăng nhập thành công!",
            msg: `Chào mừng, ${user.name}!`,
          },
        });
        nav("home");
      }
    } catch (err) {
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "error",
          title: mode === "login" ? "Đăng nhập thất bại" : "Đăng ký thất bại",
          msg: err.message || "Email hoặc mật khẩu không chính xác.",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  function googleLogin() {
    setLoading(true);
    setTimeout(() => {
      const user = {
        name: "Nguyễn Google User",
        email: "google.user@gmail.com",
        role: "USER",
        avatar: null,
      };
      dispatch({ type: "SET_USER", user });
      dispatch({
        type: "ADD_TOAST",
        toast: {
          type: "success",
          title: "Đăng nhập Google thành công!",
          msg: `Chào mừng, ${user.name}!`,
        },
      });
      nav("home");
      setLoading(false);
    }, 600);
  }

  return (
    <div className="auth-wrapper" style={{ paddingTop: 64 }}>
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-text">TechZone</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Your Tech Universe
          </div>
        </div>
        <h2 className="auth-title">
          {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
        </h2>
        <p className="auth-sub">
          {mode === "login"
            ? "Chào mừng trở lại! Đăng nhập để tiếp tục."
            : "Tạo tài khoản để mua sắm dễ dàng hơn."}
        </p>

        <button className="google-btn" onClick={googleLogin}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
              fill="#34A853"
            />
            <path
              d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.548 0 9s.348 2.825.957 4.039l3.007-2.332z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
              fill="#EA4335"
            />
          </svg>
          Tiếp tục với Google
        </button>

        <div className="divider">hoặc</div>

        {mode === "register" && (
          <div className="form-group" style={{ marginBottom: 14 }}>
            <input
              className="input"
              placeholder="Họ và tên"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        )}
        <div className="form-group" style={{ marginBottom: 14 }}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
          />
        </div>
        <div
          className="form-group"
          style={{ marginBottom: mode === "register" ? 14 : 20 }}
        >
          <input
            className="input"
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
          />
        </div>
        {mode === "register" && (
          <div className="form-group" style={{ marginBottom: 20 }}>
            <input
              className="input"
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          </div>
        )}

        {mode === "login" && (
          <div style={{ textAlign: "right", marginBottom: 16, fontSize: 13 }}>
            <span className="auth-link">Quên mật khẩu?</span>
          </div>
        )}

        <button
          className="btn btn-primary btn-lg w-full"
          style={{ width: "100%", marginBottom: 6 }}
          onClick={handleAuth}
          disabled={loading}
        >
          {loading
            ? "⏳ Đang xử lý..."
            : mode === "login"
              ? "🔑 Đăng nhập"
              : "🚀 Tạo tài khoản"}
        </button>

        {mode === "login" && (
          <div
            style={{
              fontSize: 12,
              color: "var(--muted)",
              textAlign: "center",
              marginTop: 10,
              padding: "8px",
              background: "var(--card2)",
              borderRadius: 6,
            }}
          >
            💡 Demo: dùng{" "}
            <strong style={{ color: "var(--accent)" }}>
              admin@techzone.vn
            </strong>{" "}
            để vào Admin Panel
          </div>
        )}

        <div className="auth-footer">
          {mode === "login" ? (
            <>
              Chưa có tài khoản?{" "}
              <span className="auth-link" onClick={() => setMode("register")}>
                Đăng ký ngay
              </span>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <span className="auth-link" onClick={() => setMode("login")}>
                Đăng nhập
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
