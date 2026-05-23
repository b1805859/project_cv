import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { blogService } from '../../services/blogService';
import "./BlogPage.scss";

const TAGS = ['Tất cả', 'Review', 'Gaming', 'Audio', 'Accessories', 'Storage', 'Monitor'];

export function BlogPage() {
  const { state, dispatch } = useContext(AppContext);
  const [activeTag, setActiveTag] = useState('Tất cả');
  const [posts, setPosts] = useState(state.blogs || []);
  const [loading, setLoading] = useState(!state.blogs?.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (state.blogs && state.blogs.length > 0) {
      setPosts(state.blogs);
      setLoading(false);
      return;
    }

    async function loadPosts() {
      setLoading(true);
      setError(null);
      try {
        const blogList = await blogService.getPosts();
        if (cancelled) return;
        setPosts(blogList);
      } catch (err) {
        if (cancelled) return;
        setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, [state.blogs]);

  const filtered = activeTag === 'Tất cả' ? posts : posts.filter((p) => p.tag === activeTag);
  const nav = (p, d) => {
    dispatch({ type: 'SET_PAGE', page: p, data: d });
    window.scrollTo(0, 0);
  };

  return (
    <div className="page blog-page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span onClick={() => nav('home')} style={{ cursor: 'pointer', color: 'var(--accent)' }}>
              Trang chủ
            </span>
            <span className="breadcrumb-sep">/</span>
            <span>Blog</span>
          </div>
          <h1 className="page-title">📰 Tin tức công nghệ</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="tags-row">
          {TAGS.map((t) => (
            <button key={t} className={`sort-btn${activeTag === t ? ' active' : ''}`} onClick={() => setActiveTag(t)}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="empty-state">Đang tải bài viết...</div>
        ) : error ? (
          <div className="empty-state">Không thể tải blog. Vui lòng thử lại sau.</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">Không có bài viết phù hợp.</div>
        ) : (
          <div className="posts-grid">
            {filtered.map((post) => (
              <div key={post.id} className="blog-card" onClick={() => nav('blog-detail', { postId: post.id })}>
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
        )}
      </div>
    </div>
  );
}
