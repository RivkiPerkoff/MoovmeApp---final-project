// client/src/components/LoadingIndicator.jsx
import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({ text = "טוען נתונים..." }) => {
  return (
    <div className="loading-indicator">
      <span>{text}</span>
    </div>
  );
};

export default LoadingIndicator;
