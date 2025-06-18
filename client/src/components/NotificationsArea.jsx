import NotificationsPanel from './NotificationsPanel';

const NotificationsArea = ({
  notifications,
  visibleToasts,
  unreadCount,
  showAll,
  onToggleAll,
  onMarkAsSeen,
  refreshNotifications
}) => {
  return (
    <>
      <div className="notification-bell" onClick={onToggleAll}>
        🔔
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </div>

      <NotificationsPanel
        notifications={notifications}
        visibleToasts={visibleToasts}
        showAll={showAll}
        onMarkAsSeen={onMarkAsSeen}
        refreshNotifications={refreshNotifications}
      />
    </>
  );
};

export default NotificationsArea;
