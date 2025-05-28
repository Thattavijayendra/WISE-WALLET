// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useBudget } from '../hooks/useBudget';
// import Layout from '../components/Layout';
// import { ArrowRight } from 'lucide-react';

// const BudgetAssistant: React.FC = () => {
//   const { currentUser } = useAuth();
//   const { createOrUpdateBudget } = useBudget(currentUser?.uid || '');
//   const navigate = useNavigate();
  
//   const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
//   const [fixedExpenses, setFixedExpenses] = useState<number>(0);
//   const [savingGoals, setSavingGoals] = useState<number>(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   // Calculate suggested budget and daily limit
//   const availableAfterFixed = monthlyIncome - fixedExpenses;
//   const availableAfterSavings = availableAfterFixed - savingGoals;
//   const suggestedMonthlyBudget = availableAfterSavings;
//   const dailyLimit = suggestedMonthlyBudget / 30; // Simple daily average
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (monthlyIncome <= 0) {
//       return setError('Monthly income must be greater than zero');
//     }
    
//     if (fixedExpenses < 0 || savingGoals < 0) {
//       return setError('Expenses and savings cannot be negative');
//     }
    
//     if (suggestedMonthlyBudget < 0) {
//       return setError('Your expenses and saving goals exceed your income');
//     }
    
//     try {
//       setIsSubmitting(true);
//       setError(null);
      
//       const result = await createOrUpdateBudget({
//         monthlyIncome,
//         fixedExpenses,
//         savingGoals,
//         categories: {
//           'Food & Snacks': suggestedMonthlyBudget * 0.3,
//           'Books & Stationery': suggestedMonthlyBudget * 0.15,
//           'Transport': suggestedMonthlyBudget * 0.15,
//           'Entertainment': suggestedMonthlyBudget * 0.2,
//           'Subscriptions': suggestedMonthlyBudget * 0.1,
//           'Hostel/Rent': suggestedMonthlyBudget * 0.1,
//         },
//       });
      
//       if (result.success) {
//         navigate('/dashboard');
//       } else {
//         setError(result.error || 'Failed to create budget');
//       }
//     } catch (err) {
//       console.error('Error creating budget:', err);
//       setError('An unexpected error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', { 
//       style: 'currency', 
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(amount);
//   };
  
//   return (
//     <Layout title="Smart Budget Assistant">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
//           <h2 className="text-xl font-semibold text-white mb-4">
//             Let's create your personalized budget
//           </h2>
//           <p className="text-gray-300 mb-6">
//             Answer a few questions to help us suggest a monthly budget and daily spending limit that works for you.
//           </p>
          
//           {error && (
//             <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-300 mb-1">
//                 What's your monthly income? (scholarships, allowance, part-time job, etc.)
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//                   ₹
//                 </span>
//                 <input
//                   id="monthly-income"
//                   type="number"
//                   min="0"
//                   value={monthlyIncome}
//                   onChange={(e) => setMonthlyIncome(Number(e.target.value))}
//                   className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   placeholder="0"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label htmlFor="fixed-expenses" className="block text-sm font-medium text-gray-300 mb-1">
//                 What are your fixed monthly expenses? (rent, utilities, fees, etc.)
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//                   ₹
//                 </span>
//                 <input
//                   id="fixed-expenses"
//                   type="number"
//                   min="0"
//                   value={fixedExpenses}
//                   onChange={(e) => setFixedExpenses(Number(e.target.value))}
//                   className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   placeholder="0"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label htmlFor="saving-goals" className="block text-sm font-medium text-gray-300 mb-1">
//                 How much would you like to save each month?
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//                   ₹
//                 </span>
//                 <input
//                   id="saving-goals"
//                   type="number"
//                   min="0"
//                   value={savingGoals}
//                   onChange={(e) => setSavingGoals(Number(e.target.value))}
//                   className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   placeholder="0"
//                 />
//               </div>
//             </div>
            
//             {/* Budget Suggestions */}
//             {monthlyIncome > 0 && (
//               <div className="p-4 bg-gray-700 rounded-lg">
//                 <h3 className="text-lg font-medium text-white mb-3">Your Budget Suggestion</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div className="bg-gray-800 p-4 rounded-lg">
//                     <p className="text-sm text-gray-400 mb-1">Monthly Budget</p>
//                     <p className="text-xl font-bold text-emerald-400">
//                       {formatCurrency(suggestedMonthlyBudget)}
//                     </p>
//                   </div>
                  
//                   <div className="bg-gray-800 p-4 rounded-lg">
//                     <p className="text-sm text-gray-400 mb-1">Daily Spending Limit</p>
//                     <p className="text-xl font-bold text-emerald-400">
//                       {formatCurrency(dailyLimit)}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="text-sm text-gray-300">
//                   <p>This suggestion is based on your income after subtracting fixed expenses and saving goals.</p>
//                 </div>
//               </div>
//             )}
            
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting || monthlyIncome <= 0}
//                 className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50"
//               >
//                 <span className="mr-2">Save and Continue</span>
//                 <ArrowRight size={18} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default BudgetAssistant;












import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBudget } from '../hooks/useBudget';
import Layout from '../components/Layout';
import { ArrowRight } from 'lucide-react';

const BudgetAssistant: React.FC = () => {
  const { currentUser } = useAuth();
  const { createOrUpdateBudget } = useBudget(currentUser?.uid || '');
  const navigate = useNavigate();
  
  const [monthlyIncome, setMonthlyIncome] = useState<string>(''); // Changed to string
  const [fixedExpenses, setFixedExpenses] = useState<string>('');
  const [savingGoals, setSavingGoals] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse inputs to numbers safely for calculation
  const monthlyIncomeNum = Number(monthlyIncome) || 0;
  const fixedExpensesNum = Number(fixedExpenses) || 0;
  const savingGoalsNum = Number(savingGoals) || 0;

  const availableAfterFixed = monthlyIncomeNum - fixedExpensesNum;
  const availableAfterSavings = availableAfterFixed - savingGoalsNum;
  const suggestedMonthlyBudget = availableAfterSavings;
  const dailyLimit = suggestedMonthlyBudget / 30; // Simple daily average
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (monthlyIncomeNum <= 0) {
      return setError('Monthly income must be greater than zero');
    }
    
    if (fixedExpensesNum < 0 || savingGoalsNum < 0) {
      return setError('Expenses and savings cannot be negative');
    }
    
    if (suggestedMonthlyBudget < 0) {
      return setError('Your expenses and saving goals exceed your income');
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const result = await createOrUpdateBudget({
        monthlyIncome: monthlyIncomeNum,
        fixedExpenses: fixedExpensesNum,
        savingGoals: savingGoalsNum,
        categories: {
          'Food & Snacks': suggestedMonthlyBudget * 0.3,
          'Books & Stationery': suggestedMonthlyBudget * 0.15,
          'Transport': suggestedMonthlyBudget * 0.15,
          'Entertainment': suggestedMonthlyBudget * 0.2,
          'Subscriptions': suggestedMonthlyBudget * 0.1,
          'Hostel/Rent': suggestedMonthlyBudget * 0.1,
        },
      });
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Failed to create budget');
      }
    } catch (err) {
      console.error('Error creating budget:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <Layout title="Smart Budget Assistant">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Let's create your personalized budget
          </h2>
          <p className="text-gray-300 mb-6">
            Answer a few questions to help us suggest a monthly budget and daily spending limit that works for you.
          </p>
          
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-300 mb-1">
                What's your monthly income? (scholarships, allowance, part-time job, etc.)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  ₹
                </span>
                <input
                  id="monthly-income"
                  type="number"
                  min="0"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="fixed-expenses" className="block text-sm font-medium text-gray-300 mb-1">
                What are your fixed monthly expenses? (rent, utilities, fees, etc.)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  ₹
                </span>
                <input
                  id="fixed-expenses"
                  type="number"
                  min="0"
                  value={fixedExpenses}
                  onChange={(e) => setFixedExpenses(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="saving-goals" className="block text-sm font-medium text-gray-300 mb-1">
                How much would you like to save each month?
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  ₹
                </span>
                <input
                  id="saving-goals"
                  type="number"
                  min="0"
                  value={savingGoals}
                  onChange={(e) => setSavingGoals(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            {/* Budget Suggestions */}
            {monthlyIncomeNum > 0 && (
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Your Budget Suggestion</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Monthly Budget</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {formatCurrency(suggestedMonthlyBudget)}
                    </p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Daily Spending Limit</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {formatCurrency(dailyLimit)}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-300">
                  <p>This suggestion is based on your income after subtracting fixed expenses and saving goals.</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || monthlyIncomeNum <= 0}
                className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50"
              >
                <span className="mr-2">Save and Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default BudgetAssistant;



