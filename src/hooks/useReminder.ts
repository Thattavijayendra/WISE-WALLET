// // import { useEffect, useRef } from 'react';

// // export const useReminder = (hasSpent: boolean) => {
// //   const intervalId = useRef<NodeJS.Timeout | null>(null);

// //   useEffect(() => {
// //     // Function to request notification permission
// //     const requestPermission = async () => {
// //       if (Notification.permission === 'default') {
// //         try {
// //           await Notification.requestPermission();
// //         } catch (error) {
// //           console.error('Notification permission request failed:', error);
// //         }
// //       }
// //     };

// //     // Function to show notification
// //     const showNotification = () => {
// //       if (Notification.permission === 'granted') {
// //         new Notification('Reminder', {
// //           body: 'Hey! Please enter the amount you spent recently.',
// //           icon: '/notification-icon.png', // Optional: your app icon
// //         });
// //       }
// //     };

// //     // Clear any existing interval
// //     if (intervalId.current) {
// //       clearInterval(intervalId.current);
// //       intervalId.current = null;
// //     }

// //     if (hasSpent) {
// //       if (Notification.permission !== 'granted') {
// //         // Request permission if not granted
// //         requestPermission();
// //       }

// //       if (Notification.permission === 'granted') {
// //         // Show first notification immediately
// //         showNotification();

// //         // Set interval between 30-40 minutes (randomized)
// //         const getRandomInterval = () => {
// //           const min = 30 * 60 * 1000; // 30 mins
// //           const max = 40 * 60 * 1000; // 40 mins
// //           return Math.floor(Math.random() * (max - min + 1)) + min;
// //         };

// //         intervalId.current = setInterval(() => {
// //           showNotification();
// //         }, getRandomInterval());
// //       }
// //     }

// //     // Cleanup on unmount or hasSpent change
// //     return () => {
// //       if (intervalId.current) {
// //         clearInterval(intervalId.current);
// //         intervalId.current = null;
// //       }
// //     };
// //   }, [hasSpent]);
// // };





// import { useEffect, useRef } from 'react';

// export const useReminder = (hasSpent: boolean) => {
//   const intervalId = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const showNotification = () => {
//       if (Notification.permission === 'granted') {
//         new Notification('Reminder', {
//           body: 'Hey! Please enter the amount you spent recently.',
//           icon: '/notification-icon.png',
//         });
//       }
//     };

//     if (intervalId.current) {
//       clearInterval(intervalId.current);
//       intervalId.current = null;
//     }

//     if (hasSpent && Notification.permission === 'granted') {
//       // Show notification immediately
//       showNotification();

//       // Random interval between 30-40 mins
//       const getRandomInterval = () => {
//         const min = 30 * 60 * 1000;
//         const max = 40 * 60 * 1000;
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//       };

//       intervalId.current = setInterval(() => {
//         showNotification();
//       }, getRandomInterval());
//     }

//     return () => {
//       if (intervalId.current) {
//         clearInterval(intervalId.current);
//         intervalId.current = null;
//       }
//     };
//   }, [hasSpent]);
// };




// import { useEffect, useRef } from 'react';

// export const useReminder = (hasSpent: boolean) => {
//   const timeoutId = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const showNotification = () => {
//       if (Notification.permission === 'granted') {
//         new Notification('Reminder', {
//           body: 'Hey! Please enter the amount you spent recently.',
//           icon: '/notification-icon.png', // Change or remove if you don't have one
//         });
//       }
//     };

//     // Function to request permission if needed
//     const requestPermission = async () => {
//       if (Notification.permission === 'default') {
//         try {
//           const permission = await Notification.requestPermission();
//           if (permission === 'granted') {
//             showNotification();
//             scheduleNextNotification();
//           }
//         } catch (error) {
//           console.error('Notification permission request failed:', error);
//         }
//       } else if (Notification.permission === 'granted') {
//         showNotification();
//         scheduleNextNotification();
//       }
//     };

//     // Schedule next notification with random delay
//     const scheduleNextNotification = () => {
//       if (timeoutId.current) {
//         clearTimeout(timeoutId.current);
//       }

//     //   const getRandomInterval = () => {
//     //     const min = 30 * 60 * 1000; // 30 mins
//     //     const max = 40 * 60 * 1000; // 40 mins
//     //     return Math.floor(Math.random() * (max - min + 1)) + min;
//     //   };

//     const getRandomInterval = () => {
//   const min = 10 * 1000; // 10 seconds
//   const max = 20 * 1000; // 20 seconds
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };


//       timeoutId.current = setTimeout(() => {
//         showNotification();
//         scheduleNextNotification(); // Schedule again after showing notification
//       }, getRandomInterval());
//     };

//     if (hasSpent) {
//       requestPermission();
//     }

//     return () => {
//       if (timeoutId.current) {
//         clearTimeout(timeoutId.current);
//         timeoutId.current = null;
//       }
//     };
//   }, [hasSpent]);
// };




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
        const min = 10 * 1000; // 10 seconds for testing, increase for production
        const max = 20 * 1000; // 20 seconds for testing
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      // const getRandomInterval = () => {
      //   const min = 10 * 1000; // 10 seconds
      //   const max = 20 * 1000; // 20 seconds
      //   return Math.floor(Math.random() * (max - min + 1)) + min;
      // };



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
