import { useState, useEffect } from 'react';
import './ThemeToggle.scss';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  const applyTheme = (dark) => {
    const r = document.documentElement;
    if (dark) {
      r.style.setProperty('--bg', '#08080f');
      r.style.setProperty('--surface', '#0f0f1a');
      r.style.setProperty('--card', '#14141f');
      r.style.setProperty('--card2', '#1a1a28');
      r.style.setProperty('--border', '#ffffff12');
      r.style.setProperty('--text', '#e8e8f5');
      r.style.setProperty('--muted', '#6b6b9a');
      r.style.setProperty('--muted2', '#9898b8');
    } else {
      r.style.setProperty('--bg', '#f0f2f8');
      r.style.setProperty('--surface', '#e4e6f0');
      r.style.setProperty('--card', '#ffffff');
      r.style.setProperty('--card2', '#f5f6fc');
      r.style.setProperty('--border', '#00000014');
      r.style.setProperty('--text', '#1a1a2e');
      r.style.setProperty('--muted', '#7a7a9a');
      r.style.setProperty('--muted2', '#505070');
    }
  };
  
  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);
  
  function toggle() {
    setIsDark(d => !d);
  }

  return (
    <button 
      onClick={toggle} 
      className="theme-toggle-btn"
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
