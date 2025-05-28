


import { useEffect, useRef } from 'react';

export const useReminder = (hasSpent: boolean) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const showNotification = () => {
      if (Notification.permission === 'granted') {
        new Notification('Reminder', {
          body: 'Hey! Please enter the amount you spent recently.',
          icon: '/notification-icon.png', // optional
        });
      }
    };

    const scheduleNextNotification = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

     const getRandomInterval = () => {
  const min = 30 * 60 * 1000; // 30 minutes in ms
  const max = 40 * 60 * 1000; // 40 minutes in ms
  return Math.floor(Math.random() * (max - min + 1)) + min;
};




      timeoutId.current = setTimeout(() => {
        showNotification();
        scheduleNextNotification();
      }, getRandomInterval());
    };

    if (hasSpent && Notification.permission === 'granted') {
      showNotification();
      scheduleNextNotification();
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, [hasSpent]);
};
