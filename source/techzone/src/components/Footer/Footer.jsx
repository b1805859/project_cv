import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { NewsletterSection } from "../NewsletterSection/NewsletterSection";
import "./Footer.scss";

export function Footer() {
  const { dispatch } = useContext(AppContext);
  const nav = (p) => { 
    dispatch({type:'SET_PAGE',page:p}); 
    window.scrollTo(0,0); 
  };

  return (
    <footer className="main-footer">
      <NewsletterSection/>
      <div className="footer-inner footer-inner-custom">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">TechZone</div>
            <p>Hệ thống bán lẻ điện tử hàng đầu Việt Nam. Chính hãng, bảo hành đầy đủ, giao hàng 63 tỉnh thành.</p>
            <div className="brand-contact">
              {[
                ['📍','123 Đường Công Nghệ, Q.1, TP.HCM'],
                ['📞','Hotline: 1800-TECHZONE'],
                ['✉️','support@techzone.vn']
              ].map(([icon,txt])=>(
                <div key={txt} className="contact-item">
                  <span>{icon}</span><span>{txt}</span>
                </div>
              ))}
            </div>
            <div className="social-links social-links-custom">
              {[
                ['📘','Facebook'],
                ['🐦','Twitter'],
                ['📸','Instagram'],
                ['▶️','YouTube'],
                ['💬','Zalo']
              ].map(([icon,name])=>(
                <div key={name} className="social-link" title={name} onClick={()=>dispatch({type:'ADD_TOAST',toast:{type:'info',title:`TechZone trên ${name}`}})}>{icon}</div>
              ))}
            </div>
          </div>
          {[
            {title:'Sản phẩm',items:[['Laptop',()=>nav('products')],['PC Gaming',()=>nav('products')],['Tai nghe',()=>nav('products')],['Bàn phím',()=>nav('products')],['Camera',()=>nav('products')],['Ổ cứng',()=>nav('products')]]},
            {title:'Hỗ trợ',items:[['Trung tâm hỗ trợ',null],['Chính sách bảo hành',null],['Đổi trả hàng',null],['Hướng dẫn thanh toán',null],['Theo dõi đơn hàng',()=>nav('orders')]]},
            {title:'Công ty',items:[['Về TechZone',()=>nav('about')],['Tuyển dụng',null],['Blog công nghệ',null],['Đối tác',null],['Liên hệ',null]]},
          ].map(col=>(
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              {col.items.map(([label,action])=>(
                <div key={label} className="footer-link" onClick={action||undefined}>{label}</div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="payment-security-row">
          <span className="label">Thanh toán & Bảo mật:</span>
          {[
            ['🟣','MoMo'],
            ['💵','COD'],
            ['🔒','SSL'],
            ['🛡️','Chính hãng'],
            ['📦','Đổi trả 7 ngày']
          ].map(([icon,label])=>(
            <div key={label} className="trust-tag">
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2024 TechZone Vietnam. MST: 0312345678. All rights reserved.</span>
          <div className="footer-bottom-links">
            <span className="footer-link">Điều khoản</span>
            <span className="footer-link">Bảo mật</span>
            <span className="footer-link">Cookie</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
