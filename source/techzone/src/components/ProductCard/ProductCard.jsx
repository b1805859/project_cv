import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { formatPrice, discount, stars } from '../../utils/helpers';
import "./ProductCard.scss";

export function ProductCard({ product }) {
  const { state, dispatch } = useContext(AppContext);
  const wished = state.wishlist.includes(product.id);
  const inCompare = state.compareList?.includes(product.id);

  function addToCart() {
    dispatch({ type:'ADD_TO_CART', product });
    dispatch({ type:'ADD_TOAST', toast:{ type:'success', title:'Đã thêm vào giỏ hàng', msg:product.name } });
  }

  function goDetail() {
    dispatch({ type:'SET_PAGE', page:'product', data:{ productId: product.id } });
    window.scrollTo(0,0);
  }

  return (
    <div className="product-card">
      <div className="product-img" onClick={goDetail}>
        <span className="emoji-display">{product.emoji}</span>
        <div className="product-badges">
          {product.isNew && <span className="label label-new">MỚI</span>}
          {product.isHot && <span className="label label-hot">🔥 HOT</span>}
          {product.oldPrice && <span className="label label-sale">-{discount(product.price,product.oldPrice)}%</span>}
        </div>
        <button className="product-wishlist" onClick={e => { e.stopPropagation(); dispatch({ type:'TOGGLE_WISHLIST', id:product.id }); }}>
          {wished ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <div className="product-name" onClick={goDetail}>{product.name}</div>
        <div className="product-rating">
          <span className="stars">{stars(product.rating)}</span>
          <span className="rating-count">({product.reviews})</span>
          <span className="sold-count">Đã bán {product.sold.toLocaleString()}</span>
        </div>
        <div className="product-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.oldPrice && <>
            <span className="price-old">{formatPrice(product.oldPrice)}</span>
            <span className="price-discount">-{discount(product.price,product.oldPrice)}%</span>
          </>}
        </div>
        <div className="product-actions">
          <button className="btn-cart" onClick={addToCart}>🛒 Thêm vào giỏ</button>
          <button className="btn btn-icon btn-secondary btn-sm" onClick={goDetail} title="Xem chi tiết">👁</button>
          <button 
            className={`btn btn-icon btn-ghost btn-sm compare-btn ${inCompare ? 'active' : 'inactive'}`} 
            title="So sánh"
            onClick={e=>{
              e.stopPropagation();
              dispatch({type:'TOGGLE_COMPARE',id:product.id});
              dispatch({type:'ADD_TOAST',toast:{type:'info',title:inCompare ? 'Đã xóa khỏi so sánh' : 'Thêm vào so sánh',msg:product.name}});
            }}
          >
            ⚖️
          </button>
        </div>
      </div>
    </div>
  );
}
