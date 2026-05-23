import httpClient from "./httpClient";

export const userApi = {
  fetchUsers: () => httpClient.get("/admin/users"),
  createUser: (userData) => httpClient.post("/admin/register", userData),
  deleteUser: (userId) => httpClient.delete(`/admin/users/${userId}`),
};
