import React from 'react';
import "./OrderTimeline.scss";

export function OrderTimeline({ status }) {
  const steps = [
    { key:'PENDING', icon:'📋', label:'Đặt hàng', desc:'Đơn hàng đã được ghi nhận' },
    { key:'PAID', icon:'💳', label:'Thanh toán', desc:'Thanh toán thành công' },
    { key:'SHIPPING', icon:'🚚', label:'Đang giao', desc:'Shipper đang trên đường' },
    { key:'COMPLETED', icon:'✅', label:'Hoàn thành', desc:'Giao hàng thành công' },
  ];
  const ORDER = ['PENDING','PAID','SHIPPING','COMPLETED'];
  const currentIdx = ORDER.indexOf(status);
  const isCancelled = status === 'CANCELLED';

  if (isCancelled) return (
    <div className="order-timeline-container cancelled-box">
      <span className="icon">❌</span>
      <div className="info">
        <div className="title">Đơn hàng đã hủy</div>
        <div className="desc">Đơn hàng đã bị hủy theo yêu cầu</div>
      </div>
    </div>
  );

  return (
    <div className="order-timeline-container timeline-row">
      {steps.map((step, i) => {
        const done = currentIdx > i;
        const active = currentIdx === i;
        const stateClass = done ? 'done' : active ? 'active' : 'pending';
        
        return (
          <div key={step.key} className="step-item">
            <div className="step-col">
              <div className={`step-bubble ${stateClass}`}>
                {done ? '✓' : step.icon}
              </div>
              <div className={`step-label ${done || active ? 'highlight' : 'muted'}`}>
                {step.label}
              </div>
              <div className="step-desc">{step.desc}</div>
            </div>
            {i < steps.length-1 && (
              <div className={`step-line ${done ? 'done' : 'pending'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
