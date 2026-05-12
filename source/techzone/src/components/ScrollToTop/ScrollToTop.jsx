import { useState, useEffect } from 'react';
import "./ScrollToTop.scss";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  
  useEffect(()=>{
    const h=()=>setShow(window.scrollY>400);
    window.addEventListener('scroll',h);
    return ()=>window.removeEventListener('scroll',h);
  },[]);

  if(!show) return null;

  return (
    <button 
      className="scroll-to-top-btn"
      onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
    >
      ↑
    </button>
  );
}
