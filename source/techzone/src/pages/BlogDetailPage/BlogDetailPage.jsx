import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { blogService } from '../../services/blogService';
import "./BlogDetailPage.scss";

export function BlogDetailPage() {
  const { state, dispatch } = useContext(AppContext);
  const postId = state.pageData?.postId;
  const [post, setPost] = useState(() =>
    state.blogs?.find((p) => p.id === postId) || null,
  );
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (post) {
      setLoading(false);
      return;
    }

    async function loadPost() {
      if (!postId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await blogService.getPostDetails(postId);
        if (cancelled) return;
        setPost(response);
      } catch (err) {
        if (cancelled) return;
        setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [postId, post]);

  const nav = (p, d) => {
    dispatch({ type: 'SET_PAGE', page: p, data: d });
    window.scrollTo(0, 0);
  };

  const relatedPosts = (state.blogs || [])
    .filter((p) => p.tag === post?.tag && p.id !== post?.id)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="page blog-detail-page">
        <div className="page-header">
          <div className="page-header-inner">
            <h1 className="page-title">Đang tải bài viết...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="page blog-detail-page">
        <div className="page-header">
          <div className="page-header-inner">
            <h1 className="page-title">😭 Bài viết không tìm thấy</h1>
          </div>
        </div>
        <div className="page-content">
          <div className="error-section">
            <p>{error ? 'Không thể tải bài viết. Vui lòng thử lại.' : 'Xin lỗi, bài viết này không tồn tại.'}</p>
            <button className="btn btn-primary" onClick={() => nav('blog')}>
              ← Quay lại Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page blog-detail-page">
      <div className="page-header">
        <div className="page-header-inner">
          <div className="breadcrumb">
            <span onClick={() => nav('home')} style={{ cursor: 'pointer', color: 'var(--accent)' }}>
              Trang chủ
            </span>
            <span className="breadcrumb-sep">/</span>
            <span onClick={() => nav('blog')} style={{ cursor: 'pointer', color: 'var(--accent)' }}>
              Blog
            </span>
            <span className="breadcrumb-sep">/</span>
            <span>{post.title.substring(0, 30)}...</span>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="blog-detail-container">
          <article className="blog-detail-article">
            <div className="article-header">
              <div className="article-meta-top">
                <span className="blog-tag">{post.tag}</span>
                <span className="article-date">{post.date}</span>
              </div>
              <h1 className="article-title">{post.title}</h1>
              <div className="article-hero-emoji">{post.emoji}</div>
            </div>

            <div className="article-meta-bar">
              <div className="meta-item">
                <span className="icon">✍️</span>
                <span>{post.author}</span>
              </div>
              <div className="meta-item">
                <span className="icon">⏱️</span>
                <span>{post.readTime}</span>
              </div>
              <div className="meta-item">
                <span className="icon">👁️</span>
                <span>{post.views} lượt xem</span>
              </div>
            </div>

            <div className="article-content">
              {post.content.split('\n\n').map((para, idx) => (
                <div key={idx}>
                  {para.split('\n').map((line, lineIdx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h3 key={lineIdx} className="content-heading">
                          {line.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('- ')) {
                      return <li key={lineIdx}>{line.substring(2)}</li>;
                    }
                    return <p key={lineIdx}>{line}</p>;
                  })}
                </div>
              ))}
            </div>

            <div className="article-footer">
              <div className="article-tags">
                <span className="tag-label">Tags:</span>
                {post.tag.split(',').map((tag, idx) => (
                  <span key={idx} className="tag-pill">#{tag.trim()}</span>
                ))}
              </div>
            </div>
          </article>

          <aside className="blog-detail-sidebar">
            {relatedPosts.length > 0 && (
              <div className="related-posts-section">
                <h3 className="section-title">🔥 Bài viết liên quan</h3>
                <div className="related-posts-list">
                  {relatedPosts.map((rp) => (
                    <div
                      key={rp.id}
                      className="related-post-item"
                      onClick={() => nav('blog-detail', { postId: rp.id })}
                    >
                      <div className="related-emoji">{rp.emoji}</div>
                      <div className="related-content">
                        <div className="related-title">{rp.title.substring(0, 40)}...</div>
                        <div className="related-meta">{rp.readTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="newsletter-signup-section">
              <h3 className="section-title">📬 Nhận tin mới</h3>
              <p className="section-desc">Đăng ký nhận bài viết mới nhất</p>
              <input type="email" placeholder="your@email.com" className="input input-sm" />
              <button className="btn btn-primary btn-block">Đăng ký</button>
            </div>

            <div className="quick-links-section">
              <h3 className="section-title">🔗 Liên kết nhanh</h3>
              <div className="quick-links">
                <button className="quick-link-btn" onClick={() => nav('blog')}>
                  ← Quay lại Blog
                </button>
                <button className="quick-link-btn" onClick={() => nav('home')}>
                  ← Trang chủ
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

