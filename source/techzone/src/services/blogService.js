import { blogApi } from "../api/blogApi";

function normalizePost(post) {
  if (!post) return null;
  const id = post.blogId ?? post.postId ?? post.id;

  return {
    ...post,
    id,
    title: post.title ?? "",
    excerpt: post.excerpt ?? post.summary ?? "",
    content: post.content ?? post.body ?? "",
    tag: post.tag ?? post.category ?? "",
    emoji: post.emoji ?? post.icon ?? "",
    date: post.date ?? post.createdAt ?? post.createAt ?? "",
    readTime: post.readTime ?? post.readingTime ?? "",
    views: post.views ?? post.viewCount ?? 0,
    author: post.author ?? post.authorName ?? "",
  };
}

export const blogService = {
  async getPosts(params = {}) {
    const response = await blogApi.fetchPosts(params);
    const rawList = response.data || [];
    return rawList.map(normalizePost).filter(Boolean);
  },

  async getPostDetails(postId) {
    const response = await blogApi.getPostById(postId);
    return normalizePost(response.data);
  },
};
