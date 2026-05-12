import { useContext } from 'react';
import { PRODUCTS } from '../../data/mockData';
import { AppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import "./RecentlyViewedStrip.scss";

export function RecentlyViewedStrip() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p,d) => { dispatch({ type:'SET_PAGE', page:p, data:d }); window.scrollTo(0,0); };
  const recent = (state.recentlyViewed || []).map(id => (state.adminProducts || PRODUCTS).find(p => p.id === id)).filter(Boolean).slice(0,8);
  if (recent.length < 2) return null;

  return (
    <div className="recently-viewed-strip">
      <div className="section-inner">
        <div className="header-row">
          <div>
            <div className="section-label label-custom">// Lịch sử xem</div>
            <h3 className="title-custom">🕒 Đã xem gần đây</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => dispatch({ type:'ADD_RECENTLY_VIEWED', id:-1 })}>Xóa lịch sử</button>
        </div>
        <div className="rec-scroll">
          {recent.map(p => (
            <div key={p.id} className="rec-card" onClick={() => nav('product',{productId:p.id})}>
              <div className="rec-emoji">{p.emoji}</div>
              <div className="rec-name">{p.name}</div>
              <div className="rec-price">{formatPrice(p.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
