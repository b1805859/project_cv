import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { formatPrice, discount, stars } from '../../utils/helpers';
import "./QuickViewModal.scss";

export function QuickViewModal({ productId, onClose }) {
  const { state, dispatch } = useContext(AppContext);
  const products = state.adminProducts && state.adminProducts.length > 0 ? state.adminProducts : state.products;
  const product = products.find((p) => p.id === productId);
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const nav = (p,d) => { 
    dispatch({type:'SET_PAGE',page:p,data:d}); 
    window.scrollTo(0,0); 
    onClose(); 
  };

  return (
    <div className="quick-view-modal modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-custom">
        <div className="grid-layout">
          <div className="visual-side">
            {product.emoji}
            <button className="modal-close close-btn" onClick={onClose}>×</button>
            <div className="badges">
              {product.isNew&&<span className="label label-new">MỚI</span>}
              {product.isHot&&<span className="label label-hot">🔥</span>}
              {product.oldPrice&&<span className="label label-sale">-{discount(product.price,product.oldPrice)}%</span>}
            </div>
          </div>
          <div className="info-side">
            <div>
              <span className="badge badge-cyan cat-badge">{product.category}</span>
              <div className="name">{product.name}</div>
              <div className="brand">by <strong>{product.brand}</strong></div>
            </div>
            <div className="rating-line">
              <span className="stars stars-custom">{stars(product.rating)}</span>
              <span className="meta">({product.reviews}) · {product.sold.toLocaleString()} bán</span>
            </div>
            <div className="price-line">
              <span className="current">{formatPrice(product.price)}</span>
              {product.oldPrice&&<span className="old">{formatPrice(product.oldPrice)}</span>}
            </div>
            <div className="description">{product.description}</div>
            <div className="qty-line">
              <div className="qty-selector">
                <button className="qty-btn qty-btn-custom" onClick={()=>setQty(Math.max(1,qty-1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn qty-btn-custom" onClick={()=>setQty(Math.min(product.stock,qty+1))}>+</button>
              </div>
              <span className="stock-status">✓ Còn {product.stock}</span>
            </div>
            <div className="action-line">
              <button 
                className="btn btn-primary btn-sm add-btn" 
                onClick={()=>{
                  dispatch({type:'ADD_TO_CART',product,qty});
                  dispatch({type:'ADD_TOAST',toast:{type:'success',title:'Đã thêm!',msg:product.name}});
                  onClose();
                }}
              >
                🛒 Thêm vào giỏ
              </button>
              <button className="btn btn-ghost btn-sm detail-btn" onClick={()=>nav('product',{productId:product.id})}>Chi tiết →</button>
            </div>
            <div className="feature-list">
              {['🛡️ BH chính hãng','🔄 Đổi trả 7 ngày','🚚 Free ship'].map(t=>(
                <span key={t} className="feature-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
