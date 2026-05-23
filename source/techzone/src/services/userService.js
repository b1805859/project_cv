import { userApi } from "../api/userApi";

function normalizeUser(user) {
  if (!user) return null;
  return {
    ...user,
    id: user.userId ?? user.id,
    userId: user.userId ?? user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    avatar: user.avatar ?? "",
    role: user.role ?? "USER",
    status: user.status ?? "ACTIVE",
    perms: user.permissions ?? user.perms ?? [],
  };
}

export const userService = {
  async getUsers() {
    const response = await userApi.fetchUsers();
    const rawList = response.data || [];
    return rawList.map(normalizeUser).filter(Boolean);
  },

  async createUser(userData) {
    const response = await userApi.createUser(userData);
    return normalizeUser(response.data);
  },

  async deleteUser(userId) {
    await userApi.deleteUser(userId);
    return userId;
  },
};
