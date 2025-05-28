// import React, { useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './contexts/AuthContext';

// // Pages
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Onboarding from './pages/Onboarding';
// import Dashboard from './pages/Dashboard';
// import AddExpense from './pages/AddExpense';
// import BudgetAssistant from './pages/BudgetAssistant';
// import Categories from './pages/Categories';
// import Stats from './pages/Stats';
// import Achievements from './pages/Achievements';

// // Components
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const { currentUser } = useAuth();

//   // Determine where to redirect the user based on authentication and onboarding status
//   const getHomeRoute = () => {
//     if (!currentUser) return '/login';
//     if (!currentUser.isOnboarded) return '/onboarding';
//     return '/dashboard';
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
        
//         {/* Onboarding route - requires auth but not onboarding */}
//         <Route 
//           path="/onboarding" 
//           element={
//             <ProtectedRoute>
//               {currentUser?.isOnboarded ? <Navigate to="/dashboard" /> : <Onboarding />}
//             </ProtectedRoute>
//           } 
//         />
        
//         {/* Protected routes - require auth and completed onboarding */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-expense"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <AddExpense />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/budget-assistant"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <BudgetAssistant />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/categories"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Categories />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/stats"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Stats />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/achievements"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Achievements />
//             </ProtectedRoute>
//           }
//         />
        
//         {/* Redirect to appropriate home page */}
//         <Route path="*" element={<Navigate to={getHomeRoute()} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;





// import React, { useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './contexts/AuthContext';

// // Pages
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Onboarding from './pages/Onboarding';
// import Dashboard from './pages/Dashboard';
// import AddExpense from './pages/AddExpense';
// import BudgetAssistant from './pages/BudgetAssistant';
// import Categories from './pages/Categories';
// import Stats from './pages/Stats';
// import Achievements from './pages/Achievements';

// // Components
// import ProtectedRoute from './components/ProtectedRoute';

// // 🚨 New imports
// import { useReminder } from './hooks/useReminder';
// import { useExpenses } from './hooks/useExpenses';

// function App() {
//   const { currentUser } = useAuth();
//   const userId = currentUser?.uid || '';

//   // ✅ Fetch user's expenses
//   const { expenses } = useExpenses(userId);

//   // ✅ Check if user has spent money
//   const hasSpent = expenses.length > 0;

//   // ✅ Trigger notification reminder
//   useReminder(hasSpent);

//   // Determine where to redirect the user based on authentication and onboarding status
//   const getHomeRoute = () => {
//     if (!currentUser) return '/login';
//     if (!currentUser.isOnboarded) return '/onboarding';
//     return '/dashboard';
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
        
//         {/* Onboarding route */}
//         <Route 
//           path="/onboarding" 
//           element={
//             <ProtectedRoute>
//               {currentUser?.isOnboarded ? <Navigate to="/dashboard" /> : <Onboarding />}
//             </ProtectedRoute>
//           } 
//         />
        
//         {/* Protected routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-expense"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <AddExpense />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/budget-assistant"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <BudgetAssistant />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/categories"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Categories />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/stats"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Stats />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/achievements"
//           element={
//             <ProtectedRoute requireOnboarding>
//               <Achievements />
//             </ProtectedRoute>
//           }
//         />
        
//         {/* Redirect to home */}
//         <Route path="*" element={<Navigate to={getHomeRoute()} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;






import React, { useEffect } from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import BudgetAssistant from './pages/BudgetAssistant';
import Categories from './pages/Categories';
import Stats from './pages/Stats';
import Achievements from './pages/Achievements';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// 🚨 New imports
import { useReminder } from './hooks/useReminder';
import { useExpenses } from './hooks/useExpenses';

// --- New hook to ask notification permission on login ---
const useNotificationPermission = (isLoggedIn: boolean) => {
  useEffect(() => {
    if (!isLoggedIn) return;

    // Only ask if permission is 'default' (not granted or denied)
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          alert('Notification permission granted! You will receive spending reminders.');
        } else if (permission === 'denied') {
          alert('Notification permission denied. Reminders won’t work.');
        }
      });
    }
  }, [isLoggedIn]);
};

function App() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid || '';

  // ✅ Fetch user's expenses
  const { expenses } = useExpenses(userId);

  // ✅ Check if user has spent money
  const hasSpent = expenses.length > 0;

  // ✅ Trigger notification reminder
  useReminder(hasSpent);

  // ✅ Ask for notification permission on login
  useNotificationPermission(!!currentUser);

  // Determine where to redirect the user based on authentication and onboarding status
  const getHomeRoute = () => {
    if (!currentUser) return '/login';
    if (!currentUser.isOnboarded) return '/onboarding';
    return '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Onboarding route */}
        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              {currentUser?.isOnboarded ? <Navigate to="/dashboard" /> : <Onboarding />}
            </ProtectedRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireOnboarding>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-expense"
          element={
            <ProtectedRoute requireOnboarding>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget-assistant"
          element={
            <ProtectedRoute requireOnboarding>
              <BudgetAssistant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute requireOnboarding>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute requireOnboarding>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedRoute requireOnboarding>
              <Achievements />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect to home */}
        <Route path="*" element={<Navigate to={getHomeRoute()} />} />
      </Routes>
    </div>
  );
}

export default App;
