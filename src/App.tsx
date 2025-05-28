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

function App() {
  const { currentUser } = useAuth();

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
        
        {/* Onboarding route - requires auth but not onboarding */}
        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              {currentUser?.isOnboarded ? <Navigate to="/dashboard" /> : <Onboarding />}
            </ProtectedRoute>
          } 
        />
        
        {/* Protected routes - require auth and completed onboarding */}
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
        
        {/* Redirect to appropriate home page */}
        <Route path="*" element={<Navigate to={getHomeRoute()} />} />
      </Routes>
    </div>
  );
}

export default App;