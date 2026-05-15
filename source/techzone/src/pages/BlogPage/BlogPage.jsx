import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BLOG_POSTS } from '../../data/mockData';
import "./BlogPage.scss";

export function BlogPage() {
  const { dispatch } = useContext(AppContext);
  const [activeTag, setActiveTag] = useState('Tất cả');
  const tags = ['Tất cả','Review','Gaming','Audio','Accessories','Storage','Monitor'];
  const filtered = activeTag === 'Tất cả' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.tag === activeTag);

  const nav = (p,d) => { dispatch({ type:'SET_PAGE', page:p, data:d }); window.scrollTo(0,0); };

  return (
    <div className="page blog-page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span onClick={() => nav('home')} style={{cursor:'pointer',color:'var(--accent)'}}>Trang chủ</span>
            <span className="breadcrumb-sep">/</span>
            <span>Blog</span>
          </div>
          <h1 className="page-title">📰 Tin tức công nghệ</h1>
        </div>
      </div>

      <div className="page-content">
        {/* Tags */}
        <div className="tags-row">
          {tags.map(t=>(
            <button key={t} className={`sort-btn${activeTag===t?' active':''}`} onClick={()=>setActiveTag(t)}>{t}</button>
          ))}
        </div>

        <div className="posts-grid">
          {filtered.map(post=>(
            <div key={post.id} className="blog-card" onClick={()=>nav('blog-detail', {postId: post.id})}>
              <div className="blog-img">{post.emoji}</div>
              <div className="blog-body">
                <div className="blog-tag">{post.tag}</div>
                <div className="blog-title">{post.title}</div>
                <div className="blog-excerpt">{post.excerpt}</div>
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
    </div>
  );
}
