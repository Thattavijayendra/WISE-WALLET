// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAb3I03yehst4no6I0_yW2NZDyBGqZd4M0",
//   authDomain: "wise-wallet-f77b2.firebaseapp.com",
//   projectId: "wise-wallet-f77b2",
//   storageBucket: "wise-wallet-f77b2.firebasestorage.app",
//   messagingSenderId: "187333085198",
//   appId: "1:187333085198:web:8f01f7bf9e42a63851545f",
//   measurementId: "G-VDQ9VQ2QM7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const analytics = getAnalytics(app);

// // Enable offline persistence
// enableIndexedDbPersistence(db).catch((err) => {
//   if (err.code === 'failed-precondition') {
//     // Multiple tabs open, persistence can only be enabled in one tab at a time.
//     console.warn('Multiple tabs open, offline persistence disabled');
//   } else if (err.code === 'unimplemented') {
//     // The current browser doesn't support offline persistence
//     console.warn('Current browser does not support offline persistence');
//   }
// });

// export default app;


// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import {
//   initializeFirestore,
//   persistentLocalCache
// } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAb3I03yehst4no6I0_yW2NZDyBGqZd4M0",
//   authDomain: "wise-wallet-f77b2.firebaseapp.com",
//   projectId: "wise-wallet-f77b2",
//   storageBucket: "wise-wallet-f77b2.firebasestorage.app",
//   messagingSenderId: "187333085198",
//   appId: "1:187333085198:web:8f01f7bf9e42a63851545f",
//   measurementId: "G-VDQ9VQ2QM7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // ✅ Modern Firestore initialization with offline persistence
// export const db = initializeFirestore(app, {
//   localCache: persistentLocalCache()
// });

// // Other services
// export const auth = getAuth(app);
// export const analytics = getAnalytics(app);

// export default app;








// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import {
//   initializeFirestore,
//   persistentLocalCache,
//   clearIndexedDbPersistence,
//   experimentalForceLongPolling,
//   ExperimentalSettings
// } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAb3I03yehst4no6I0_yW2NZDyBGqZd4M0",
//   authDomain: "wise-wallet-f77b2.firebaseapp.com",
//   projectId: "wise-wallet-f77b2",
//   storageBucket: "wise-wallet-f77b2.firebasestorage.app",
//   messagingSenderId: "187333085198",
//   appId: "1:187333085198:web:8f01f7bf9e42a63851545f",
//   measurementId: "G-VDQ9VQ2QM7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore with modern persistence and fallback
// export const db = initializeFirestore(app, {
//   localCache: persistentLocalCache(),
//   experimentalForceLongPolling: true,
//   useFetchStreams: false
// } as ExperimentalSettings);

// // Optional: Clear local cache (only for dev/troubleshooting)
// clearIndexedDbPersistence(db).catch((e) => {
//   console.warn("Could not clear IndexedDB persistence:", e);
// });

// export const auth = getAuth(app);
// export const analytics = getAnalytics(app);
// export default app;





// import { initializeApp } from 'firebase/app';
// import { db } from './src/firebase/config'; 
// import { getAuth } from 'firebase/auth';
// import {
//   initializeFirestore, 
//   persistentLocalCache, 
//   persistentSingleTabManager, 
//   persistentMultipleTabManager, 
//   memoryLocalCache 
// } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';


// const firebaseConfig = {
//   apiKey: "AIzaSyAb3I03yehst4no6I0_yW2NZDyBGqZd4M0",
//   authDomain: "wise-wallet-f77b2.firebaseapp.com",
//   projectId: "wise-wallet-f77b2",
//   storageBucket: "wise-wallet-f77b2.firebasestorage.app",
//   messagingSenderId: "187333085198",
//   appId: "1:187333085198:web:8f01f7bf9e42a63851545f",
//   measurementId: "G-VDQ9VQ2QM7"
// };
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// let db;
// try {
//   db = initializeFirestore(app, {
//     localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
//   });
//   console.log("Firestore offline persistence enabled (multi-tab)");
// } catch (err) {
   
//    console.error("Error initializing Firestore with persistence:", err);
   
// }
// export const analytics = getAnalytics(app);
// export default app;




// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// // Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAb3I03yehst4no6I0_yW2NZDyBGqZd4M0",
//   authDomain: "wise-wallet-f77b2.firebaseapp.com",
//   projectId: "wise-wallet-f77b2",
//   storageBucket: "wise-wallet-f77b2.firebasestorage.app",
//   messagingSenderId: "187333085198",
//   appId: "1:187333085198:web:8f01f7bf9e42a63851545f",
//   measurementId: "G-VDQ9VQ2QM7"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Firebase services
// export const auth = getAuth(app);
// export const db = getFirestore(app); // No offline persistence
// export const analytics = getAnalytics(app);

// export default app;



// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getAnalytics, isSupported } from 'firebase/analytics';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAb3I03yehst4no6I0_yW2NZDyBGqZd4M0",
//   authDomain: "wise-wallet-f77b2.firebaseapp.com",
//   projectId: "wise-wallet-f77b2",
//   storageBucket: "wise-wallet-f77b2.appspot.com", // fixed domain spelling
//   messagingSenderId: "187333085198",
//   appId: "1:187333085198:web:8f01f7bf9e42a63851545f",
//   measurementId: "G-VDQ9VQ2QM7"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Firebase services
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// // Safely initialize analytics only if supported (avoids server-side issues)
// export const analytics = (typeof window !== 'undefined') ? await isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

// export default app;




// firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAb3I03yehst4no6I0_yW2NZDyBGqZd4M0",
  authDomain: "wise-wallet-f77b2.firebaseapp.com",
  projectId: "wise-wallet-f77b2",
  storageBucket: "wise-wallet-f77b2.appspot.com",
  messagingSenderId: "187333085198",
  appId: "1:187333085198:web:8f01f7bf9e42a63851545f",
  measurementId: "G-VDQ9VQ2QM7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional Analytics
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
export { analytics };
export default app;
