import React, { useEffect, useState } from 'react';
import './MessageBanner.css';

const MessageBanner = ({ type = 'info', message, duration = 3000 }) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div className={`message-banner ${type}`}>
      {message}
    </div>
  );
};

export default MessageBanner;
