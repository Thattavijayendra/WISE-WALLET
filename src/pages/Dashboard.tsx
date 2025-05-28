import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBudget } from '../hooks/useBudget';
import { useExpenses } from '../hooks/useExpenses';
import { useUserStats } from '../hooks/useUserStats';
import Layout from '../components/Layout';
import { PlusCircle, Wallet, TrendingDown, Calendar, Award } from 'lucide-react';
import NotificationPermissionPrompt from '../components/NotificationPermissionPrompt'; 

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { budget, loading: budgetLoading } = useBudget(currentUser?.uid || '');
  const { expenses, loading: expensesLoading } = useExpenses(currentUser?.uid || '');
  const { stats, loading: statsLoading } = useUserStats(currentUser?.uid || '');
  const [permissionGranted, setPermissionGranted] = useState(Notification.permission === 'granted');

  const [remainingBudget, setRemainingBudget] = useState(0);
  const [todayExpenses, setTodayExpenses] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);
  
   const handlePermissionGranted = () => {
    setPermissionGranted(true);
   }
  useEffect(() => {
    if (budget && expenses) {
      // Calculate remaining budget
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      const thisMonthExpenses = expenses.filter(expense => 
        expense.date >= firstDayOfMonth
      );
      
      const totalSpentThisMonth = thisMonthExpenses.reduce(
        (total, expense) => total + expense.amount, 
        0
      );
      
      // Today's expenses
      const todayStart = new Date(today);
      todayStart.setHours(0, 0, 0, 0);
      
      const todaysExpenses = expenses.filter(expense => 
        expense.date >= todayStart
      );
      
      const totalSpentToday = todaysExpenses.reduce(
        (total, expense) => total + expense.amount, 
        0
      );
      
      setRemainingBudget(budget.suggestedMonthlyBudget - totalSpentThisMonth);
      setTodayExpenses(totalSpentToday);
      setMonthExpenses(totalSpentThisMonth);
    }
  }, [budget, expenses]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const loading = budgetLoading || expensesLoading || statsLoading;
  
  // Get the percentage of budget spent
  const budgetPercentage = budget ? Math.min(100, (monthExpenses / budget.suggestedMonthlyBudget) * 100) : 0;
  
  // Get the percentage of daily limit spent
  const dailyLimitPercentage = budget ? Math.min(100, (todayExpenses / budget.dailyLimit) * 100) : 0;
  
  // Get the color based on the percentage
  const getBudgetColor = (percentage: number) => {
    if (percentage < 50) return 'bg-emerald-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <Layout title="Dashboard">
       {!permissionGranted && <NotificationPermissionPrompt onPermissionGranted={handlePermissionGranted} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Wallet className="text-emerald-400 mr-2" size={24} />
            <h3 className="text-lg font-medium text-white">Monthly Budget</h3>
          </div>
          
          {loading ? (
            <div className="animate-pulse h-20 bg-gray-700 rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold text-white mb-2">
                {budget ? formatCurrency(remainingBudget) : 'Not set'}
              </p>
              <p className="text-sm text-gray-400">
                {budget ? `of ${formatCurrency(budget.suggestedMonthlyBudget)}` : 'Set up your budget'}
              </p>
              
              {budget && (
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getBudgetColor(budgetPercentage)}`} 
                      style={{ width: `${budgetPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-400">0%</p>
                    <p className="text-xs text-gray-400">100%</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Daily Spending Limit */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Calendar className="text-emerald-400 mr-2" size={24} />
            <h3 className="text-lg font-medium text-white">Daily Limit</h3>
          </div>
          
          {loading ? (
            <div className="animate-pulse h-20 bg-gray-700 rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold text-white mb-2">
                {budget ? formatCurrency(budget.dailyLimit - todayExpenses) : 'Not set'}
              </p>
              <p className="text-sm text-gray-400">
                {budget ? `of ${formatCurrency(budget.dailyLimit)}` : 'Set up your budget'}
              </p>
              
              {budget && (
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getBudgetColor(dailyLimitPercentage)}`} 
                      style={{ width: `${dailyLimitPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-400">0%</p>
                    <p className="text-xs text-gray-400">100%</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Streak & Achievements */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Award className="text-emerald-400 mr-2" size={24} />
            <h3 className="text-lg font-medium text-white">Your Progress</h3>
          </div>
          
          {loading ? (
            <div className="animate-pulse h-20 bg-gray-700 rounded"></div>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <div className="bg-emerald-500 bg-opacity-20 p-3 rounded-full">
                  <Award className="text-emerald-400" size={24} />
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Daily Streak</p>
                  <p className="text-2xl font-bold text-emerald-400">{stats?.streak || 0} days</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Achievements Unlocked</p>
                <p className="text-lg font-medium text-white">
                  {stats ? stats.achievements.filter(a => a.isUnlocked).length : 0} / {stats?.achievements.length || 0}
                </p>
                <Link to="/achievements" className="text-emerald-400 text-sm hover:underline mt-1 inline-block">
                  View all achievements
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Quick Add Expense Button */}
      <div className="fixed bottom-6 right-6 md:right-10 md:bottom-10">
        <Link
          to="/add-expense"
          className="flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg transition-colors duration-200"
        >
          <PlusCircle size={28} className="text-white" />
        </Link>
      </div>
      
      {/* Recent Expenses */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Expenses</h3>
          <Link to="/add-expense" className="text-emerald-400 hover:text-emerald-300">
            Add New
          </Link>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-800 p-4 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : expenses.length > 0 ? (
          <div className="space-y-4">
            {expenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-400">{expense.category} • {expense.date.toLocaleDateString()}</p>
                </div>
                <p className="text-lg font-semibold text-red-400">-{formatCurrency(expense.amount)}</p>
              </div>
            ))}
            
            {expenses.length > 5 && (
              <Link to="/stats" className="text-emerald-400 hover:underline text-sm inline-block mt-2">
                View all expenses
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <TrendingDown size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-300 mb-4">No expenses recorded yet</p>
            <Link
              to="/add-expense"
              className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Your First Expense
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

