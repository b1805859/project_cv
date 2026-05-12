import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import "./CheckoutPage.scss";

export function CheckoutPage() {
  const { state, dispatch } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('momo');
  const [form, setForm] = useState({ 
    name:state.user?.name||'', 
    email:state.user?.email||'', 
    phone:'', 
    address:'', 
    city:'Hà Nội', 
    note:'' 
  });

  const nav = (page, data) => { 
    dispatch({ type:'SET_PAGE', page, data }); 
    window.scrollTo(0,0); 
  };

  const subtotal = state.cart.reduce((s,i) => s+i.product.price*i.qty, 0);
  const baseShipping = subtotal > 5000000 ? 0 : 30000;
  let promoDiscount = 0, freeShip = false;

  if (state.promoCode) {
    const promo = (state.coupons || []).find(c => c.code === state.promoCode);
    if (promo && promo.active) {
      if (promo.type==='percent') promoDiscount=Math.round(subtotal*promo.value/100);
      else if (promo.type==='fixed') promoDiscount=promo.value;
      else if (promo.type==='ship') freeShip=true;
    }
  }

  const shipping = freeShip ? 0 : baseShipping;
  const total = Math.max(0, subtotal - promoDiscount + shipping);

  function placeOrder() {
    if (!state.user) { 
      dispatch({type:'ADD_TOAST',toast:{type:'warning',title:'Cần đăng nhập'}}); 
      nav('login'); 
      return; 
    }
    if (!form.name||!form.phone||!form.address) { 
      dispatch({type:'ADD_TOAST',toast:{type:'error',title:'Thiếu thông tin',msg:'Vui lòng điền đầy đủ'}}); 
      return; 
    }
    const order = {
      // eslint-disable-next-line react-hooks/purity
      id:'TZ-'+Date.now(), 
      date:new Date().toISOString().slice(0,10),
      items:state.cart.reduce((s,i)=>s+i.qty,0), 
      total,
      subtotal, 
      promoCode:state.promoCode, 
      promoDiscount, 
      shipping,
      status:payment==='momo'?'PAID':'PENDING',
      payment:payment==='momo'?'MoMo':'COD',
      address:form, 
      products:state.cart,
    };
    dispatch({type:'ADD_ORDER',order});
    dispatch({type:'ADD_TOAST',toast:{type:'success',title:'Đặt hàng thành công! 🎉',msg:`Mã đơn: ${order.id}`}});
    nav('order-success',{orderId:order.id});
  }

  const steps = ['Thông tin','Thanh toán','Xác nhận'];

  return (
    <div className="page checkout-page">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-title">💳 Thanh toán</h1>
          <div className="checkout-steps checkout-steps-custom">
            {steps.map((s,i)=>(
              <React.Fragment key={s}>
                <div className={`step${step===i+1?' active':step>i+1?' done':''}`}>
                  <div className="step-num">{step>i+1?'✓':i+1}</div>
                  <div className="step-label">{s}</div>
                </div>
                {i<steps.length-1&&<div className="step-line"/>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="checkout-layout">
        <div className="checkout-main">
          {step===1&&(
            <div>
              <div className="section-form-title">📍 Thông tin giao hàng</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nguyễn Văn A"/>
                </div>
                <div className="form-group">
                  <label className="form-label">Số điện thoại *</label>
                  <input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="0912 345 678"/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Địa chỉ *</label>
                <input className="input" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Số nhà, tên đường, phường/xã"/>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tỉnh/Thành phố</label>
                  <select className="input select" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}>
                    {['Hà Nội','TP. Hồ Chí Minh','Đà Nẵng','Hải Phòng','Cần Thơ','Biên Hòa','Nha Trang','Huế'].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ghi chú</label>
                  <input className="input" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Giao giờ hành chính..."/>
                </div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={()=>setStep(2)}>Tiếp theo →</button>
            </div>
          )}
          {step===2&&(
            <div>
              <div className="section-form-title">💳 Phương thức thanh toán</div>
              <div className="payment-options">
                {[
                  {id:'momo',icon:'🟣',name:'Ví MoMo',desc:'Thanh toán qua ví điện tử MoMo — nhanh & bảo mật'},
                  {id:'cod',icon:'💵',name:'COD – Tiền mặt khi nhận',desc:'Kiểm tra hàng rồi mới thanh toán'}
                ].map(opt=>(
                  <div key={opt.id} className={`payment-option${payment===opt.id?' active':''}`} onClick={()=>setPayment(opt.id)}>
                    <input type="radio" name="payment" checked={payment===opt.id} onChange={()=>setPayment(opt.id)}/>
                    <span className="payment-icon">{opt.icon}</span>
                    <div><div className="payment-name">{opt.name}</div><div className="payment-desc">{opt.desc}</div></div>
                  </div>
                ))}
              </div>
              {payment==='momo'&&(
                <div className="momo-hint">
                  <div className="title">🟣 Thanh toán MoMo</div>
                  <div className="desc">Quét mã QR hoặc xác nhận trong ứng dụng MoMo sau khi đặt hàng.</div>
                </div>
              )}
              <div style={{display:'flex',gap:12,marginTop:20}}>
                <button className="btn btn-ghost" onClick={()=>setStep(1)}>← Quay lại</button>
                <button className="btn btn-primary btn-lg" onClick={()=>setStep(3)}>Xem lại đơn hàng →</button>
              </div>
            </div>
          )}
          {step===3&&(
            <div>
              <div className="section-form-title">✅ Xác nhận đơn hàng</div>
              <div className="confirm-box">
                <div className="box-title">📍 Giao đến</div>
                <div className="box-content">
                  <div><strong>Họ tên:</strong> {form.name}</div>
                  <div><strong>SĐT:</strong> {form.phone}</div>
                  <div><strong>Địa chỉ:</strong> {form.address}, {form.city}</div>
                </div>
              </div>
              <div className="confirm-box">
                <div className="box-title">📦 Sản phẩm ({state.cart.reduce((s,i)=>s+i.qty,0)})</div>
                {state.cart.map(item=>(
                  <div key={item.product.id} className="product-line">
                    <span className="emoji">{item.product.emoji}</span>
                    <div className="info">{item.product.name} × {item.qty}</div>
                    <strong className="price">{formatPrice(item.product.price*item.qty)}</strong>
                  </div>
                ))}
                {state.promoCode&&<div className="promo-applied">🎟️ Mã {state.promoCode}: -{formatPrice(promoDiscount)}</div>}
              </div>
              <div style={{display:'flex',gap:12}}>
                <button className="btn btn-ghost" onClick={()=>setStep(2)}>← Quay lại</button>
                <button className="btn btn-success btn-lg" style={{flex:1}} onClick={placeOrder}>{payment==='momo'?'🟣 Thanh toán MoMo':'💵 Xác nhận COD'}</button>
              </div>
            </div>
          )}
        </div>
        <div className="cart-summary">
          <div className="summary-title">Đơn hàng</div>
          {state.cart.map(item=>(
            <div key={item.product.id} className="summary-item">
              <span className="emoji">{item.product.emoji}</span>
              <span className="name">{item.product.name} ×{item.qty}</span>
              <strong>{formatPrice(item.product.price*item.qty)}</strong>
            </div>
          ))}
          <div className="summary-divider"/>
          <div className="summary-row"><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
          {promoDiscount>0&&<div className="summary-row" style={{color:'var(--green)'}}><span>Giảm giá</span><span>-{formatPrice(promoDiscount)}</span></div>}
          <div className="summary-row"><span>Vận chuyển</span><span style={{color:'var(--green)'}}>{shipping===0?'Miễn phí':formatPrice(shipping)}</span></div>
          <div className="summary-total"><span>Tổng cộng</span><span>{formatPrice(total)}</span></div>
        </div>
      </div>
    </div>
  );
}
