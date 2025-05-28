import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';
import Layout from '../components/Layout';
import { PieChart, BarChart, ResponsiveContainer, Pie, Cell, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const Stats: React.FC = () => {
  const { currentUser } = useAuth();
  const { expenses, loading: expensesLoading } = useExpenses(currentUser?.uid || '');
  const { categories, loading: categoriesLoading } = useCategories(currentUser?.uid || '');
  
  const [pieChartData, setPieChartData] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [barChartData, setBarChartData] = useState<Array<{ name: string; amount: number }>>([]);
  const [topCategories, setTopCategories] = useState<Array<{ name: string; amount: number; color: string }>>([]);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('month');
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  useEffect(() => {
    if (!expensesLoading && !categoriesLoading && expenses.length > 0) {
      // Filter expenses based on time filter
      const now = new Date();
      let filteredExpenses = [];
      
      if (timeFilter === 'week') {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        filteredExpenses = expenses.filter(expense => expense.date >= weekStart);
      } else if (timeFilter === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filteredExpenses = expenses.filter(expense => expense.date >= monthStart);
      } else { // year
        const yearStart = new Date(now.getFullYear(), 0, 1);
        filteredExpenses = expenses.filter(expense => expense.date >= yearStart);
      }
      
      // Process data for Pie Chart
      const categoryTotals: { [key: string]: number } = {};
      filteredExpenses.forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
      });
      
      const pieData = Object.keys(categoryTotals).map(category => {
        const categoryObj = categories.find(cat => cat.name === category);
        return {
          name: category,
          value: categoryTotals[category],
          color: categoryObj?.color || '#6B7280'
        };
      });
      
      setPieChartData(pieData);
      
      // Process data for Bar Chart - daily expenses for the past week
      if (timeFilter === 'week') {
        const dailyTotals: { [key: string]: number } = {};
        
        // Initialize all 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });
          dailyTotals[dateStr] = 0;
        }
        
        // Fill in actual expense data
        filteredExpenses.forEach(expense => {
          const dateStr = expense.date.toLocaleDateString('en-US', { weekday: 'short' });
          dailyTotals[dateStr] = (dailyTotals[dateStr] || 0) + expense.amount;
        });
        
        const barData = Object.keys(dailyTotals).map(date => ({
          name: date,
          amount: dailyTotals[date]
        }));
        
        setBarChartData(barData);
      } else if (timeFilter === 'month') {
        // Group by week for month view
        const weeklyTotals: { [key: string]: number } = {
          'Week 1': 0,
          'Week 2': 0,
          'Week 3': 0,
          'Week 4': 0,
          'Week 5': 0
        };
        
        filteredExpenses.forEach(expense => {
          const day = expense.date.getDate();
          let week = '';
          
          if (day <= 7) week = 'Week 1';
          else if (day <= 14) week = 'Week 2';
          else if (day <= 21) week = 'Week 3';
          else if (day <= 28) week = 'Week 4';
          else week = 'Week 5';
          
          weeklyTotals[week] += expense.amount;
        });
        
        const barData = Object.keys(weeklyTotals)
          .filter(week => weeklyTotals[week] > 0)
          .map(week => ({
            name: week,
            amount: weeklyTotals[week]
          }));
        
        setBarChartData(barData);
      } else { // year
        // Group by month for year view
        const monthlyTotals: { [key: string]: number } = {};
        
        // Initialize all 12 months
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        monthNames.forEach(month => {
          monthlyTotals[month] = 0;
        });
        
        filteredExpenses.forEach(expense => {
          const month = monthNames[expense.date.getMonth()];
          monthlyTotals[month] += expense.amount;
        });
        
        const barData = Object.keys(monthlyTotals).map(month => ({
          name: month,
          amount: monthlyTotals[month]
        }));
        
        setBarChartData(barData);
      }
      
      // Calculate top spending categories
      const topCats = Object.keys(categoryTotals)
        .map(category => {
          const categoryObj = categories.find(cat => cat.name === category);
          return {
            name: category,
            amount: categoryTotals[category],
            color: categoryObj?.color || '#6B7280'
          };
        })
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
      
      setTopCategories(topCats);
    }
  }, [expenses, categories, expensesLoading, categoriesLoading, timeFilter]);
  
  const loading = expensesLoading || categoriesLoading;
  
  return (
    <Layout title="Expense Analytics">
      <div className="mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Filter Period</h3>
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setTimeFilter('week')}
                className={`px-4 py-1 rounded-md ${
                  timeFilter === 'week' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:bg-gray-600'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeFilter('month')}
                className={`px-4 py-1 rounded-md ${
                  timeFilter === 'month' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:bg-gray-600'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeFilter('year')}
                className={`px-4 py-1 rounded-md ${
                  timeFilter === 'year' ? 'bg-emerald-500 text-white' : 'text-gray-300 hover:bg-gray-600'
                }`}
              >
                Year
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Pie Chart */}
        <div className="md:col-span-2">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Category Breakdown</h3>
            
            {loading ? (
              <div className="animate-pulse h-64 bg-gray-700 rounded"></div>
            ) : pieChartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-400">No expense data available for the selected period</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Top Categories */}
        <div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Top Spending Categories</h3>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-700 p-4 rounded-lg">
                    <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : topCategories.length > 0 ? (
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-white font-medium">{category.name}</span>
                      </div>
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(category.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(category.amount / topCategories[0].amount) * 100}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-gray-400">No expense data available for the selected period</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bar Chart */}
      <div className="mt-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            {timeFilter === 'week' ? 'Daily Expenses' : timeFilter === 'month' ? 'Weekly Expenses' : 'Monthly Expenses'}
          </h3>
          
          {loading ? (
            <div className="animate-pulse h-64 bg-gray-700 rounded"></div>
          ) : barChartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" stroke="#D1D5DB" />
                  <YAxis stroke="#D1D5DB" tickFormatter={(value) => `₹${value}`} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">No expense data available for the selected period</p>
            </div>
          )}
        </div>
      </div>







    </Layout>
  );
};

export default Stats;