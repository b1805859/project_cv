import { useContext } from 'react';
import { PRODUCTS } from '../../data/mockData';
import { AppContext } from '../../context/AppContext';
import { formatPrice, stars } from '../../utils/helpers';
import "./RecommendationStrip.scss";

function useRecommendations(currentProductId) {
  const { state } = useContext(AppContext);
  const activity = state.userActivity || [];

  // Score by activity: VIEW=1, CART=3, ORDER=5
  const scores = {};
  activity.forEach(a => {
    const sc = a.type === 'ORDER' ? 5 : a.type === 'CART' ? 3 : 1;
    scores[a.catId] = (scores[a.catId] || 0) + sc;
  });

  const scored = (state.adminProducts || PRODUCTS)
    .filter(p => p.id !== currentProductId)
    .map(p => ({
      ...p,
      score: (scores[p.catId] || 0) + (p.isHot ? 2 : 0) + (p.isNew ? 1 : 0) + p.sold / 1000,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return scored;
}

export function RecommendationStrip({ currentProductId, title = '✨ Gợi ý cho bạn' }) {
  const { dispatch } = useContext(AppContext);
  const recs = useRecommendations(currentProductId);
  const nav = (p,d) => { dispatch({ type:'SET_PAGE', page:p, data:d }); window.scrollTo(0,0); };

  if (recs.length === 0) return null;
  return (
    <div className="recommendation-strip rec-section">
      <div className="section-inner">
        <div className="rec-header">
          <div>
            <div className="section-label">// Personalized</div>
            <h2>{title}</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => nav('products')}>Xem thêm →</button>
        </div>
        <div className="rec-scroll">
          {recs.map(p => (
            <div key={p.id} className="rec-card" onClick={() => nav('product',{productId:p.id})}>
              <div className="rec-score">Score: {p.score.toFixed(1)} ⚡</div>
              <div className="rec-emoji">{p.emoji}</div>
              <div className="rec-name">{p.name}</div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
                <span className="stars stars-mini">{stars(p.rating)}</span>
                <span className="reviews-count">({p.reviews})</span>
              </div>
              <div className="rec-price">{formatPrice(p.price)}</div>
              {p.oldPrice && <div className="old-price">{formatPrice(p.oldPrice)}</div>}
              <button className="btn-cart add-to-cart-btn"
                onClick={e => { 
                  e.stopPropagation(); 
                  dispatch({ type:'ADD_TO_CART', product:p }); 
                  dispatch({ type:'ADD_TOAST', toast:{ type:'success', title:'Đã thêm!', msg:p.name } }); 
                }}>
                🛒 Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
