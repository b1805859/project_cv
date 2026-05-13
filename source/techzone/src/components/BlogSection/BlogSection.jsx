import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BLOG_POSTS } from '../../data/mockData';
import "./BlogSection.scss";

export function BlogSection() {
  const { dispatch } = useContext(AppContext);
  const [activeTag, setActiveTag] = useState('Tất cả');
  const tags = ['Tất cả','Review','Gaming','Audio','Accessories','Storage','Monitor'];
  const filtered = activeTag === 'Tất cả' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.tag === activeTag);
  
  const nav = (p, d) => { 
    dispatch({ type: 'SET_PAGE', page: p, data: d }); 
    window.scrollTo(0, 0); 
  };

  return (
    <section className="section blog-section">
      <div className="section-inner">
        <div className="header-row">
          <div>
            <div className="section-label">// Blog</div>
            <h2 className="section-title">Tin tức <span>công nghệ</span></h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={()=>dispatch({type:'SET_PAGE',page:'blog'})}>Xem tất cả →</button>
        </div>
        
        {/* Tags */}
        <div className="tags-row">
          {tags.map(t=>(
            <button key={t} className={`sort-btn${activeTag===t?' active':''}`} onClick={()=>setActiveTag(t)}>{t}</button>
          ))}
        </div>

        <div className="posts-grid">
          {filtered.slice(0,3).map(post=>(
            <div key={post.id} className="blog-card" onClick={()=>nav('blog-detail', {postId:post.id})}>
              <div className="blog-img">{post.emoji}</div>
              <div className="blog-body">
                <div className="blog-tag">{post.tag}</div>
                <div className="blog-title">{post.title}</div>
                <div className="blog-meta">
                  <span>✍️ {post.author}</span>
                  <span>⏱️ {post.readTime}</span>
                  <span>👁️ {post.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
