import React, { useState, useEffect } from 'react';

interface Props {
  onPermissionGranted: () => void;
}

const NotificationPermissionPrompt: React.FC<Props> = ({ onPermissionGranted }) => {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);
      if (result === 'granted') {
        onPermissionGranted();
      }
    });
  };

  // Only show prompt if permission is 'default' (not granted or denied)
  if (permission !== 'default') return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#333',
        color: '#fff',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
    >
      <p style={{ margin: 0, marginBottom: '8px' }}>
        Enable notifications to get spending reminders!
      </p>
      <button
        onClick={requestPermission}
        style={{
          background: '#4F46E5',
          border: 'none',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Enable Notifications
      </button>
    </div>
  );
};

export default NotificationPermissionPrompt;
