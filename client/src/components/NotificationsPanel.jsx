import React from 'react';
import './NotificationsPanel.css';
import axios from '../services/axiosInstance';

const NotificationsPanel = ({ notifications, visibleToasts, showAll, onMarkAsSeen, refreshNotifications }) => {
  const displayed = showAll ? notifications.filter(n => !n.seen && !n.is_read) : visibleToasts;

  const handleApprove = async (notif) => {
    try {
      await axios.patch(`/requests/${notif.request_id}/approve`);
      await onMarkAsSeen(notif._id);
      if (refreshNotifications) refreshNotifications();
    } catch (err) {
      console.error('שגיאה באישור הבקשה:', err);
    }
  };

  if (!displayed?.length) return null;

  return (
    <div className="notifications-panel">
      {displayed.map((notif) => (
        <div key={notif._id} className="notification-toast">
          <span className="toast-icon">🔔</span>
          <p>{notif.message}</p>
          
          {notif.type === 'join_request' ? (
            <button onClick={() => handleApprove(notif)}>אישור בקשה</button>
          ) : (
            <button onClick={() => onMarkAsSeen(notif._id)}>אישור</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationsPanel;
