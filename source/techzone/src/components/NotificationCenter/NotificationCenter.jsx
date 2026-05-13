import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { NOTIFS_INIT } from "../../data/mockData";
import "./NotificationCenter.scss";

export function NotificationCenter() {
  const { dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFS_INIT);
  const ref = useRef();
  const unread = notifs.filter((n) => n.unread).length;
  
  const nav = (p) => {
    dispatch({ type: 'SET_PAGE', page: p });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function markAll() {
    setNotifs((ns) => ns.map((n) => ({ ...n, unread: false })));
  }

  return (
    <div ref={ref} className="notification-center">
      <button
        className="btn btn-icon btn-secondary notif-btn"
        onClick={() => setOpen(!open)}
      >
        <span className="icon-emoji">🔔</span>
        {unread > 0 && (
          <div className="notif-badge">
            {unread}
          </div>
        )}
      </button>

      {open && (
        <div className="notif-panel">
          <div className="notif-header">
            <span className="header-title">🔔 Thông báo</span>
            <span className="mark-read-btn" onClick={markAll}>
              Đánh dấu đã đọc
            </span>
          </div>
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`notif-item ${n.unread ? "unread" : ""}`}
              onClick={() =>
                setNotifs((ns) =>
                  ns.map((x) => (x.id === n.id ? { ...x, unread: false } : x)),
                )
              }
            >
              <div className="notif-icon" style={{ background: n.iconBg }}>
                {n.icon}
              </div>
              <div className="notif-content">
                <div className="notif-title">{n.title}</div>
                <div className="notif-sub">{n.sub}</div>
                <div className="notif-time">{n.time}</div>
              </div>
              {n.unread && <span className="unread-dot" />}
            </div>
          ))}
          <div
            className="view-all-footer"
            onClick={() => {
              nav('notifications');
              setOpen(false);
            }}
          >
            Xem tất cả →
          </div>
        </div>
      )}
    </div>
  );
}
