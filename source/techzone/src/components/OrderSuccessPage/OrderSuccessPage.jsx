import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import "./OrderSuccessPage.scss";

export function OrderSuccessPage() {
  const { state, dispatch } = useContext(AppContext);
  const nav = (p,d) => { 
    dispatch({ type:'SET_PAGE', page:p, data:d }); 
    window.scrollTo(0,0); 
  };
  const orderId = state.pageData?.orderId;

  return (
    <div className="page order-success-container">
      <div className="success-hero success-hero-custom">
        <div className="success-icon">✅</div>
        <h1 className="title">Đặt hàng thành công!</h1>
        <p className="sub">Cảm ơn bạn đã mua sắm tại TechZone 🎉</p>
        <div className="order-id-box">
          <span className="label">Mã đơn hàng: </span>
          <strong className="id-val">{orderId}</strong>
        </div>
        <div className="hint">Chúng tôi sẽ xử lý đơn hàng và giao đến bạn trong 2–5 ngày làm việc.</div>
        <div className="actions">
          <button className="btn btn-primary btn-lg" onClick={() => nav('orders')}>📦 Theo dõi đơn hàng</button>
          <button className="btn btn-secondary btn-lg" onClick={() => nav('products')}>🛍️ Tiếp tục mua sắm</button>
        </div>
      </div>
    </div>
  );
}
