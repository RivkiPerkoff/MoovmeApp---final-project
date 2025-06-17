import axiosInstance from './axiosInstance';

export const fetchNotifications = async () => {
  const res = await axiosInstance.get('/notifications');
  return res.data;
};

export const markNotificationAsSeen = async (notificationId) => {
  const res = await axiosInstance.put(`/notifications/${notificationId}/seen`);
  return res.data;
};
