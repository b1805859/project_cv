import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import "./MobileBottomNav.scss";

export function MobileBottomNav() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p) => { 
    dispatch({ type:'SET_PAGE', page:p }); 
    window.scrollTo(0,0); 
  };
  const cartCount = state.cart.reduce((s,i) => s + i.qty, 0);
  const items = [
    { icon:'🏠', label:'Trang chủ', page:'home' },
    { icon:'🛍️', label:'Sản phẩm', page:'products' },
    { icon:'⚡', label:'Flash Sale', page:'flash-sale' },
    { icon:'🛒', label:'Giỏ hàng', page:'cart', badge: cartCount },
    { icon:'👤', label:'Tài khoản', page: state.user ? 'profile' : 'login' },
  ];

  return (
    <div className="mobile-nav mobile-bottom-nav-container">
      <div className="mobile-nav-items">
        {items.map(item => (
          <div key={item.page} className={`mobile-nav-item${state.page === item.page ? ' active' : ''}`} onClick={() => nav(item.page)}>
            <div className="icon-wrapper">
              <span className="mobile-nav-icon">{item.icon}</span>
              {item.badge > 0 && <span className="badge-custom">{item.badge}</span>}
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
