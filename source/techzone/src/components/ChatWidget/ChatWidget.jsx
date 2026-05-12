import { useState, useEffect, useRef, useContext } from 'react';
import { PRODUCTS, CHATBOT_RULES, DEFAULT_BOT_RESPONSE, callClaudeAPI } from '../../data/mockData';
import { AppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import { QuickViewModal } from "../QuickViewModal/QuickViewModal";
import "./ChatWidget.scss";

export function ChatWidget() {
  const { state, dispatch } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const messagesEndRef = useRef();
  
  const nav = (p,d) => { 
    dispatch({type:'SET_PAGE',page:p,data:d}); 
    window.scrollTo(0,0); 
  };

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({behavior:'smooth'}); 
  }, [state.chatMessages, typing]);

  async function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg || typing) return;
    setInput('');
    dispatch({ type:'ADD_CHAT_MSG', msg:{ from:'user', text:msg, type:'TEXT' } });
    setTyping(true);

    let reply = null;
    if (useAI) reply = await callClaudeAPI([...state.chatMessages, {from:'user', text:msg}]);

    if (!reply) {
      // rule-based fallback
      await new Promise(r => setTimeout(r, 600 + Math.random()*200));
      const lower = msg.toLowerCase();
      const rule = CHATBOT_RULES.find(r => r.keywords.some(k => lower.includes(k)));
      reply = rule ? rule.response : DEFAULT_BOT_RESPONSE;
      const products = rule?.products?.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean)||[];
      setTyping(false);
      dispatch({ type:'ADD_CHAT_MSG', msg:{ from:'bot', text:reply, type:products.length?'PRODUCT_LIST':'TEXT', products } });
      return;
    }

    // AI replied — check if any product names appear in reply
    const lower = reply.toLowerCase();
    const mentioned = (state.adminProducts || PRODUCTS).filter(p =>
      lower.includes(p.name.toLowerCase().slice(0,8)) || lower.includes(p.brand.toLowerCase())
    ).slice(0,2);
    setTyping(false);
    dispatch({ type:'ADD_CHAT_MSG', msg:{ from:'bot', text:reply, type:mentioned.length?'PRODUCT_LIST':'TEXT', products:mentioned } });
  }

  const suggestions = ['💻 Laptop gaming dưới 40 triệu','🎧 Tai nghe ANC tốt nhất','🎟️ Mã giảm giá hôm nay','📦 Chính sách đổi trả','⌨️ Bàn phím cơ wireless'];

  return (
    <>
      {quickView && <QuickViewModal productId={quickView} onClose={()=>setQuickView(null)}/>}
      <div id="chat-widget" className="chat-widget-container">
        {state.chatOpen && (
          <div className="chat-box">
            <div className="chat-header">
              <div className="chat-header-avatar">🤖</div>
              <div className="chat-header-info">
                <div className="chat-header-name">
                  TechBot
                  <span className={`ai-mode-badge ${useAI ? 'ai' : 'rule'}`}>
                    {useAI?'CLAUDE AI':'RULE-BASED'}
                  </span>
                </div>
                <div className="chat-header-status">
                  <span className="dot" />
                  {typing?'Đang soạn...':'Trực tuyến 24/7'}
                </div>
              </div>
              <div style={{display:'flex',gap:4}}>
                <button 
                  title="Chuyển AI mode" 
                  className={`ai-toggle-btn ${useAI ? 'active' : 'inactive'}`}
                  onClick={()=>setUseAI(u=>!u)}
                >
                  {useAI?'🤖 AI':'⚙️'}
                </button>
                <button className="btn btn-icon btn-ghost btn-sm close-btn-custom" onClick={()=>dispatch({type:'TOGGLE_CHAT'})}>×</button>
              </div>
            </div>

            <div className="chat-tabs">
              {[['bot','🤖 TechBot AI'],['live','💬 Hỗ trợ']].map(([t,l])=>(
                <div key={t} className={`chat-tab${state.chatTab===t?' active':''}`} onClick={()=>dispatch({type:'SET_CHAT_TAB',tab:t})}>{l}</div>
              ))}
            </div>

            {state.chatTab==='bot' ? (
              <>
                <div className="chat-messages">
                  {state.chatMessages.map((msg,i)=>(
                    <div key={i} className={`msg ${msg.from}`}>
                      {msg.from==='bot' && <div className="msg-avatar">🤖</div>}
                      <div>
                        <div className="msg-bubble">{msg.text}</div>
                        {msg.type==='PRODUCT_LIST' && msg.products?.length>0 && (
                          <div className="msg-products">
                            {msg.products.map(p=>(
                              <div key={p.id} className="msg-product-card">
                                <span className="msg-product-icon" onClick={()=>nav('product',{productId:p.id})}>{p.emoji}</span>
                                <div className="msg-product-info" onClick={()=>nav('product',{productId:p.id})}>
                                  <div className="name">{p.name}</div>
                                  <div className="price">{formatPrice(p.price)}</div>
                                </div>
                                <button className="view-btn" onClick={()=>setQuickView(p.id)}>Xem</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {msg.from==='user' && (
                        <div className="msg-avatar user-avatar-custom">
                          {state.user?.name?.[0]||'U'}
                        </div>
                      )}
                    </div>
                  ))}
                  {typing && (
                    <div className="msg bot">
                      <div className="msg-avatar">🤖</div>
                      <div className="typing"><div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/></div>
                    </div>
                  )}
                  <div ref={messagesEndRef}/>
                </div>
                <div className="chat-suggestions">
                  {suggestions.map(s=><div key={s} className="chat-suggestion" onClick={()=>sendMessage(s)}>{s}</div>)}
                </div>
                <div className="chat-input-area">
                  <input className="chat-input" placeholder={useAI?'Hỏi Claude AI...':'Nhập câu hỏi...'} value={input}
                    onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()}/>
                  <button className={`chat-send send-btn-custom ${typing ? 'typing-active' : 'ready'}`} onClick={sendMessage}>→</button>
                </div>
              </>
            ) : (
              <div className="live-support-pane">
                <div className="icon-big">💬</div>
                <div>
                  <div className="title">Chat với nhân viên</div>
                  <div className="sub">Giờ làm việc: 8:00–22:00 hàng ngày</div>
                </div>
                <div className="actions">
                  <button className="btn btn-primary" onClick={()=>{if(!state.user){dispatch({type:'SET_PAGE',page:'login'});dispatch({type:'TOGGLE_CHAT'});}}}>
                    {state.user?'🔗 Bắt đầu chat':'🔑 Đăng nhập để chat'}
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={()=>dispatch({type:'ADD_TOAST',toast:{type:'info',title:'📞 Hotline: 1800-TECHZONE',msg:'Miễn phí, 8:00-22:00'}})}>
                    📞 Gọi Hotline miễn phí
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <button className="chat-toggle" onClick={()=>dispatch({type:'TOGGLE_CHAT'})}>
          {state.chatOpen?'✕':'💬'}
          {!state.chatOpen&&<span className="chat-unread">1</span>}
        </button>
      </div>
    </>
  );
}
