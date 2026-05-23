import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { notificationService } from '../../services/notificationService';
import "./NotificationsPage.scss";

export function NotificationsPage() {
  const { dispatch } = useContext(AppContext);
  const [notifs, setNotifs] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [showClearAllPopup, setShowClearAllPopup] = useState(false);

  const nav = (p) => {
    dispatch({ type: 'SET_PAGE', page: p });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    let mounted = true;
    (async () => {
      try {
        const data = await notificationService.getNotifications();
        if (mounted) setNotifs(data);
      } catch {
        // ignore: giữ UI empty-state
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = filterType === 'all'
    ? notifs
    : filterType === 'unread'
      ? notifs.filter(n => n.unread)
      : notifs.filter(n => !n.unread);

  const unreadCount = notifs.filter(n => n.unread).length;

  async function markAsRead(id) {
    try {
      const updated = await notificationService.markAsRead(id);
      setNotifs(ns => ns.map(n => n.id === id ? { ...n, ...updated, unread: false } : n));
    } catch (e) {
      setNotifs(ns => ns.map(n => n.id === id ? { ...n, unread: false } : n));
    }
  }

  async function markAllAsRead() {
    try {
      await notificationService.markAllAsRead();
    } finally {
      setNotifs(ns => ns.map(n => ({ ...n, unread: false })));
    }
  }

  async function deleteNotification(id) {
    try {
      await notificationService.deleteNotification(id);
      setNotifs(ns => ns.filter(n => n.id !== id));
    } catch (e) {
      // ignore
    }
  }

  function clearAll() {
    setShowClearAllPopup(true);
  }

  async function confirmClearAll() {
    try {
      await notificationService.clearAll();
    } finally {
      setNotifs([]);
      setShowClearAllPopup(false);
    }
  }

  function cancelClearAll() {
    setShowClearAllPopup(false);
  }

  return (
    <div className="page notifications-page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span onClick={() => nav('home')} style={{ cursor: 'pointer', color: 'var(--accent)' }}>Trang chủ</span>
            <span className="breadcrumb-sep">/</span>
            <span>Thông báo</span>
          </div>
          <h1 className="page-title">🔔 Trung tâm thông báo</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="notifications-container">
          <aside className="notif-sidebar">
            <div className="notif-stats">
              <div className="stat-item">
                <div className="stat-number">{notifs.length}</div>
                <div className="stat-label">Tổng thông báo</div>
              </div>
              <div className="stat-item highlight">
                <div className="stat-number">{unreadCount}</div>
                <div className="stat-label">Chưa đọc</div>
              </div>
            </div>

            <div className="notif-filters">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                📋 Tất cả ({notifs.length})
              </button>
              <button
                className={`filter-btn ${filterType === 'unread' ? 'active' : ''}`}
                onClick={() => setFilterType('unread')}
              >
                🔔 Chưa đọc ({unreadCount})
              </button>
              <button
                className={`filter-btn ${filterType === 'read' ? 'active' : ''}`}
                onClick={() => setFilterType('read')}
              >
                ✅ Đã đọc ({notifs.filter(n => !n.unread).length})
              </button>
            </div>

            <div className="notif-actions">
              <button className="action-btn" onClick={markAllAsRead} disabled={unreadCount === 0}>
                ✅ Đánh dấu tất cả đã đọc
              </button>
              <button className="action-btn delete-btn" onClick={clearAll} disabled={notifs.length === 0}>
                🗑️ Xóa tất cả
              </button>
            </div>
          </aside>

          <main className="notif-main">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h2 className="empty-title">
                  {filterType === 'all' ? 'Không có thông báo' : `Không có thông báo ${filterType === 'unread' ? 'chưa đọc' : 'đã đọc'}`}
                </h2>
                <p className="empty-desc">Bạn sẽ nhận được thông báo vào đơn hàng, khuyến mãi và hoạt động tài khoản.</p>
                <button className="btn btn-primary" onClick={() => nav('home')}>← Quay lại trang chủ</button>
              </div>
            ) : (
              <div className="notif-list">
                {filtered.map(n => (
                  <div key={n.id} className={`notif-item-full ${n.unread ? 'unread' : 'read'}`}>
                    <div className="notif-item-icon" style={{ background: n.iconBg }}>
                      {n.icon}
                    </div>

                    <div className="notif-item-content">
                      <div className="notif-item-title">{n.title}</div>
                      <div className="notif-item-sub">{n.sub}</div>
                      <div className="notif-item-time">{n.time}</div>
                    </div>

                    <div className="notif-item-actions">
                      {n.unread && (
                        <button
                          className="action-icon"
                          onClick={() => markAsRead(n.id)}
                        >
                          ✓
                        </button>
                      )}
                      <button
                        className="action-icon delete"
                        onClick={() => deleteNotification(n.id)}
                      >
                        🗑️
                      </button>
                    </div>

                    {n.unread && <div className="unread-indicator" />}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {showClearAllPopup && (
        <div className="clear-all-popup-overlay">
          <div className="clear-all-popup">
            <div className="popup-icon">🗑️</div>
            <h3 className="popup-title">Xóa tất cả thông báo</h3>
            <p className="popup-message">
              Bạn có chắc muốn xóa tất cả thông báo? Hành động này không thể hoàn tác.
            </p>
            <div className="popup-actions">
              <button className="btn btn-secondary" onClick={cancelClearAll}>Hủy</button>
              <button className="btn btn-danger" onClick={confirmClearAll}>Xóa tất cả</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


