import httpClient from "./httpClient";

export const notificationApi = {
  fetchNotifications: () => httpClient.get("/notifications"),
  markAsRead: (notificationId) =>
    httpClient.patch(`/notifications/${notificationId}/read`),
  markAllAsRead: () => httpClient.patch("/notifications/read-all"),
  deleteNotification: (notificationId) =>
    httpClient.delete(`/notifications/${notificationId}`),
  clearAll: () => httpClient.delete("/notifications"),
};
