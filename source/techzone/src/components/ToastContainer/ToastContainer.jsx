import { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { AppContext } from "../../context/AppContext";
import "./ToastContainer.scss";

export function Toast({ toast, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div className={`toast ${toast.type || "info"} toast-custom-wrapper`}>
      <span className="toast-icon">{icons[toast.type] || "ℹ️"}</span>
      <div className="toast-body">
        <div className="toast-title">{toast.title}</div>
        {toast.msg && <div className="toast-msg">{toast.msg}</div>}
      </div>
      <span className="toast-close" onClick={onClose}>
        ×
      </span>
    </div>
  );
}

export function ToastContainer() {
  const { state, dispatch } = useContext(AppContext);
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div id="toast-container">
      {state.toasts.map((t) => (
        <Toast
          key={t.id}
          toast={t}
          onClose={() =>
            dispatch({
              type: "REMOVE_TOAST",
              id: t.id,
            })
          }
        />
      ))}
    </div>,
    portalRoot,
  );
}
