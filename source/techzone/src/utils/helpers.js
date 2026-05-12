import { useState, useEffect } from 'react';
export function formatPrice(n) {
  return new Intl.NumberFormat('vi-VN', { style:'currency', currency:'VND' }).format(n);
}
export function formatDate(d) {
  return new Date(d).toLocaleDateString('vi-VN');
}
export function discount(p, old) {
  return Math.round((1 - p/old) * 100);
}
export function stars(r) {
  const full = Math.floor(r);
  const half = r % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half?1:0));
}

export function useCountdown(targetHour = 23, targetMin = 59, targetSec = 59) {
  const [time, setTime] = useState({ h:0, m:0, s:0 });
  useEffect(() => {
    function calc() {
      const now = new Date();
      const end = new Date();
      end.setHours(targetHour, targetMin, targetSec, 0);
      if (end <= now) end.setDate(end.getDate() + 1);
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      setTime({ h: Math.floor(diff/3600), m: Math.floor((diff%3600)/60), s: diff%60 });
    }
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}