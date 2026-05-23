import { notificationApi } from "../api/notificationApi";

function normalizeNotification(notification) {
  if (!notification) return null;
  const id = notification.notificationId ?? notification.id;

  return {
    ...notification,
    id,
    icon: notification.icon ?? "",
    iconBg: notification.iconBg ?? notification.iconBackground ?? "var(--card2)",
    title: notification.title ?? "",
    sub: notification.sub ?? notification.subtitle ?? notification.message ?? "",
    time: notification.time ?? notification.createdAt ?? notification.createAt ?? "",
    unread: Boolean(notification.unread ?? !notification.read),
  };
}

export const notificationService = {
  async getNotifications() {
    const response = await notificationApi.fetchNotifications();
    const rawList = response.data || [];
    return rawList.map(normalizeNotification).filter(Boolean);
  },

  async markAsRead(notificationId) {
    const response = await notificationApi.markAsRead(notificationId);
    return normalizeNotification(response.data);
  },

  async markAllAsRead() {
    await notificationApi.markAllAsRead();
  },

  async deleteNotification(notificationId) {
    await notificationApi.deleteNotification(notificationId);
  },

  async clearAll() {
    await notificationApi.clearAll();
  },
};
