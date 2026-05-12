import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import "./LoyaltyWidget.scss";

export function LoyaltyWidget({ total }) {
  const { state } = useContext(AppContext);
  const earned = Math.floor(total / 10000);
  const existing = Math.floor(state.orders.filter(o=>o.status!=='CANCELLED').reduce((s,o)=>s+o.total,0) / 10000);
  
  return (
    <div className="loyalty-widget loyalty-bar">
      <div className="loyalty-header">
        <span className="icon">⭐</span>
        <div className="info-pane">
          <div className="title">Điểm tích lũy TechZone</div>
          <div className="sub">Bạn đang có <strong>{existing.toLocaleString()}</strong> điểm</div>
        </div>
        <div className="pts-pane">
          <div className="loyalty-pts">+{earned.toLocaleString()}</div>
          <div className="hint">điểm từ đơn này</div>
        </div>
      </div>
      <div className="progress progress-custom">
        <div 
          className="progress-bar bar-gradient" 
          style={{width:`${Math.min((existing % 1000)/10, 100)}%`}}
        />
      </div>
      <div className="footer-row">
        <span>{existing % 1000} / 1000 điểm</span>
        <span>🎁 Còn {1000 - (existing % 1000)} điểm nữa đổi quà</span>
      </div>
    </div>
  );
}
