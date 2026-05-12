import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import "./NewsletterSection.scss";

export function NewsletterSection() {
  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function subscribe() {
    if (!email.includes('@')) { 
      dispatch({type:'ADD_TOAST',toast:{type:'error',title:'Email không hợp lệ'}}); 
      return; 
    }
    setDone(true);
    dispatch({type:'ADD_TOAST',toast:{type:'success',title:'Đăng ký thành công! 🎉',msg:'Chào mừng bạn đến TechZone Newsletter'}});
  }

  return (
    <div className="newsletter-section">
      <div className="section-inner">
        <div className="label-custom">// NEWSLETTER</div>
        <h3 className="title-custom">Nhận ưu đãi độc quyền mỗi tuần</h3>
        <p className="desc-custom">Flash sale, sản phẩm mới và mã giảm giá trước mọi người.</p>
        
        {done ? (
          <div className="success-msg">
            ✅ Đăng ký thành công! Kiểm tra email của bạn.
          </div>
        ) : (
          <div className="form-row">
            <input 
              className="input input-custom" 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={e=>setEmail(e.target.value)} 
              onKeyDown={e=>e.key==='Enter'&&subscribe()}
            />
            <button className="btn btn-primary btn-custom" onClick={subscribe}>Đăng ký 🚀</button>
          </div>
        )}

        <div className="footer-links">
          {['✉️ Không spam','🔒 Bảo mật','🎁 Quà chào mừng 50k'].map(t=>(
            <span key={t} className="link-item">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
