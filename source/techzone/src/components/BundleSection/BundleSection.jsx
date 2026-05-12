import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import { BUNDLES } from '../../data/mockData';
import "./BundleSection.scss";

export function BundleSection() {
  const { dispatch } = useContext(AppContext);
  return (
    <section className="section bundle-section">
      <div className="section-inner">
        <div className="section-label">// Combo deals</div>
        <h2 className="section-title">Mua <span>theo bộ</span> — giảm thêm</h2>
        <div className="bundles-grid">
          {BUNDLES.map(bundle => {
            const total = bundle.products.reduce((s,p)=>s+p.price,0);
            const sale = Math.round(total * (1 - bundle.discount/100));
            return (
              <div key={bundle.id} className="bundle-card">
                <div className="bundle-card-header">
                  <div className="bundle-info">
                    <span className="promo-tag combo-tag">💎 -{bundle.discount}% Combo</span>
                    <div className="bundle-name">{bundle.name}</div>
                  </div>
                  <div className="bundle-pricing">
                    <div className="current-price">{formatPrice(sale)}</div>
                    <div className="old-price">{formatPrice(total)}</div>
                  </div>
                </div>
                <div className="bundle-desc">{bundle.description}</div>
                <div className="bundle-products">
                  {bundle.products.map((p,i)=>(
                    <React.Fragment key={p.id}>
                      <div className="bundle-item">
                        <span className="product-emoji">{p.emoji}</span>
                        <div className="product-info-mini">
                          <div className="name">{p.name.split(' ').slice(0,3).join(' ')}</div>
                          <div className="price">{formatPrice(p.price)}</div>
                        </div>
                      </div>
                      {i < bundle.products.length-1 && <span className="bundle-plus">+</span>}
                    </React.Fragment>
                  ))}
                </div>
                <div className="bundle-footer">
                  <button className="btn btn-primary buy-btn" onClick={()=>{
                    bundle.products.forEach(p=>dispatch({type:'ADD_TO_CART',product:{...p,price:Math.round(p.price*(1-bundle.discount/100))}}));
                    dispatch({type:'ADD_TOAST',toast:{type:'success',title:`Thêm Bundle: ${bundle.name}`,msg:`Tiết kiệm ${formatPrice(total-sale)}!`}});
                  }}>🛒 Mua cả bộ — {formatPrice(sale)}</button>
                  <div className="savings-hint">
                    💚 Tiết kiệm<br/>{formatPrice(total-sale)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
