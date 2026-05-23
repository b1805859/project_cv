import httpClient from "./httpClient";

export const blogApi = {
  fetchPosts: (params) => httpClient.get("/blogs", { params }),
  getPostById: (postId) => httpClient.get(`/blogs/${postId}`),
};
