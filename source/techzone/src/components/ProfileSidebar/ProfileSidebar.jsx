
import './ProfileSidebar.scss';

export function ProfileSidebar({ active, onSelect, open, onClose, user, rank }) {
  const items = [
    { key: 'info', label: 'Thông tin', icon: '📋' },
    { key: 'orders', label: 'Đơn hàng', icon: '📦' },
    { key: 'security', label: 'Bảo mật', icon: '🔒' },
    { key: 'activity', label: 'Hoạt động', icon: '📊' },
    { key: 'address', label: 'Địa chỉ', icon: '📍' },
  ];

  return (
    <div className={`profile-sidebar admin-sidebar ${open ? 'open' : ''}`} role="navigation">
      <div className="sidebar-inner">
        {user && (
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user.name?.[0] || 'U'}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-top">
                <div className="sidebar-user-name">{user.name}</div>
              </div>
              <div className="sidebar-user-email">{user.email}</div>
              <div className="sidebar-user-meta">
                {user.role && (
                  <span className={`sidebar-user-role role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                )}
                {rank && <span className="sidebar-user-rank">{rank}</span>}
              </div>
            </div>
          </div>
        )}
        <div className="sidebar-title">Tài khoản</div>
        <ul className="sidebar-list">
          {items.map((it) => (
            <li key={it.key} className={`sidebar-item ${active === it.key ? 'active' : ''}`}>
              <button
                onClick={() => { onSelect(it.key); onClose && onClose(); }}
                className="sidebar-btn"
              >
                <span className="icon" aria-hidden>{it.icon}</span>
                <span className="label">{it.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileSidebar;
