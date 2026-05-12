import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { formatPrice } from "../../utils/helpers";
import "./AdminCouponTab.scss";

export function AdminCouponTab() {
  const { state, dispatch } = useContext(AppContext);
  const coupons = state.coupons || [];
  const [showForm, setShowForm] = useState(false);
  const [newCode, setNewCode] = useState({
    code: "",
    type: "percent",
    value: "",
    min: "",
    limit: "",
    expiry: "",
  });

  function addCoupon() {
    if (!newCode.code || !newCode.value) {
      dispatch({
        type: "ADD_TOAST",
        toast: { type: "error", title: "Nhập đủ thông tin" },
      });
      return;
    }
    const c = {
      ...newCode,
      value: Number(newCode.value),
      min: Number(newCode.min) || 0,
      limit: Number(newCode.limit) || 999,
      used: 0,
      active: true,
      label:
        newCode.type === "ship"
          ? "Miễn phí vận chuyển"
          : `Giảm ${newCode.type === "percent" ? newCode.value + "%" : formatPrice(newCode.value)}`,
    };
    dispatch({ type: "ADMIN_ADD_COUPON", coupon: c });
    setShowForm(false);
    setNewCode({
      code: "",
      type: "percent",
      value: "",
      min: "",
      limit: "",
      expiry: "",
    });
    dispatch({
      type: "ADD_TOAST",
      toast: { type: "success", title: `Đã tạo mã: ${newCode.code}` },
    });
  }

  return (
    <div className="admin-coupon-tab">
      {showForm && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div className="modal modal-custom">
            <button className="modal-close" onClick={() => setShowForm(false)}>
              ×
            </button>
            <div className="modal-title">🎟️ Tạo mã giảm giá mới</div>
            <div className="form-row form-row-custom">
              <div className="form-group form-group-no-margin">
                <label className="form-label">Mã code *</label>
                <input
                  className="input code-input"
                  placeholder="VD: SUMMER20"
                  value={newCode.code}
                  onChange={(e) =>
                    setNewCode({
                      ...newCode,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <div className="form-group form-group-no-margin">
                <label className="form-label">Loại</label>
                <select
                  className="input select"
                  value={newCode.type}
                  onChange={(e) =>
                    setNewCode({ ...newCode, type: e.target.value })
                  }
                >
                  <option value="percent">% Giảm theo phần trăm</option>
                  <option value="fixed">đ Giảm cố định</option>
                  <option value="ship">🚚 Miễn phí ship</option>
                </select>
              </div>
            </div>
            <div className="form-row form-row-custom">
              <div className="form-group form-group-no-margin">
                <label className="form-label">
                  {newCode.type === "percent" ? "Giảm (%)" : "Giảm (VND)"}
                </label>
                <input
                  className="input"
                  type="number"
                  value={newCode.value}
                  onChange={(e) =>
                    setNewCode({ ...newCode, value: e.target.value })
                  }
                  placeholder={newCode.type === "percent" ? "10" : "50000"}
                />
              </div>
              <div className="form-group form-group-no-margin">
                <label className="form-label">Đơn tối thiểu (VND)</label>
                <input
                  className="input"
                  type="number"
                  value={newCode.min}
                  onChange={(e) =>
                    setNewCode({ ...newCode, min: e.target.value })
                  }
                  placeholder="500000"
                />
              </div>
            </div>
            <div className="form-row form-row-custom">
              <div className="form-group form-group-no-margin">
                <label className="form-label">Giới hạn sử dụng</label>
                <input
                  className="input"
                  type="number"
                  value={newCode.limit}
                  onChange={(e) =>
                    setNewCode({ ...newCode, limit: e.target.value })
                  }
                  placeholder="1000"
                />
              </div>
              <div className="form-group form-group-no-margin">
                <label className="form-label">Ngày hết hạn</label>
                <input
                  className="input"
                  type="date"
                  value={newCode.expiry}
                  onChange={(e) =>
                    setNewCode({ ...newCode, expiry: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-ghost"
                onClick={() => setShowForm(false)}
              >
                Hủy
              </button>
              <button className="btn btn-primary" onClick={addCoupon}>
                🎟️ Tạo mã
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-header">
        <div>
          <div className="admin-title">🎟️ Quản lý mã giảm giá</div>
          <div className="header-sub">
            {coupons.filter((c) => c.active).length} mã đang hoạt động
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          ➕ Tạo mã mới
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          {
            icon: "🎟️",
            label: "Tổng mã",
            value: coupons.length,
            color: "rgba(0,212,255,.1)",
          },
          {
            icon: "✅",
            label: "Đang hoạt động",
            value: coupons.filter((c) => c.active).length,
            color: "rgba(0,230,118,.1)",
          },
          {
            icon: "📊",
            label: "Tổng lượt dùng",
            value: coupons.reduce((s, c) => s + c.used, 0),
            color: "rgba(123,47,247,.1)",
          },
          {
            icon: "❌",
            label: "Đã tắt",
            value: coupons.filter((c) => !c.active).length,
            color: "rgba(255,71,87,.1)",
          },
        ].map((s) => (
          <div key={s.label} className="stat-card stat-card-custom">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Coupon Grid */}
      <div className="coupon-grid">
        {coupons.map((c) => (
          <div
            key={c.code}
            className={`coupon-card coupon-card-item ${c.active ? "" : "inactive"}`}
          >
            <div className="coupon-card-header">
              <div>
                <div
                  className="coupon-code"
                  onClick={() => {
                    navigator.clipboard?.writeText(c.code);
                    dispatch({
                      type: "ADD_TOAST",
                      toast: { type: "success", title: `Copied: ${c.code}` },
                    });
                  }}
                >
                  {c.code}
                </div>
                <div className="copy-hint">Click để copy</div>
              </div>
              <div className="coupon-actions">
                <span
                  className={`badge active-badge ${c.active ? "badge-green" : "badge-red"}`}
                >
                  {c.active ? "Active" : "Tắt"}
                </span>
                <button
                  className="btn btn-ghost btn-sm toggle-btn"
                  onClick={() =>
                    dispatch({
                      type: "ADMIN_UPDATE_COUPON",
                      coupon: { ...c, active: !c.active },
                    })
                  }
                >
                  {c.active ? "Tắt" : "Bật"}
                </button>
              </div>
            </div>
            <div className="coupon-details">
              <span>
                💰{" "}
                {c.type === "percent"
                  ? `-${c.value}%`
                  : c.type === "fixed"
                    ? `-${formatPrice(c.value)}`
                    : "Free ship"}
              </span>
              <span>
                📦 Đơn tối thiểu: {c.min ? formatPrice(c.min) : "Không có"}
              </span>
            </div>
            <div className="coupon-usage">
              <div className="usage-meta">
                <span>
                  Đã dùng: {c.used}/{c.limit}
                </span>
                <span>HSD: {c.expiry}</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min((c.used / c.limit) * 100, 100)}%`,
                    background:
                      c.used / c.limit > 0.8
                        ? "var(--red)"
                        : c.used / c.limit > 0.5
                          ? "var(--yellow)"
                          : "var(--accent)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
