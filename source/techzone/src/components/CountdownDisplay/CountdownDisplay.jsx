import React from 'react';
import { useCountdown } from '../../utils/helpers';
import "./CountdownDisplay.scss";

export function CountdownDisplay() {
  const { h, m, s } = useCountdown();
  const pad = n => String(n).padStart(2,'0');
  
  return (
    <div className="countdown-display-wrapper countdown-box">
      {[['h',pad(h),'Giờ'],['m',pad(m),'Phút'],['s',pad(s),'Giây']].map(([k,v,l], i) => (
        <React.Fragment key={k}>
          {i > 0 && <span className="countdown-sep">:</span>}
          <div className="countdown-unit">
            <div className="countdown-num">{v}</div>
            <div className="countdown-label">{l}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
