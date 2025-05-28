// import { useState, useEffect } from 'react';
// import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase/config';
// import { Budget } from '../types';

// export const useBudget = (userId: string) => {
//   const [budget, setBudget] = useState<Budget | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userId) {
//       setBudget(null);
//       setLoading(false);
//       return;
//     }

//     const fetchBudget = async () => {
//       try {
//         const budgetRef = doc(db, 'budgets', userId);
//         const budgetDoc = await getDoc(budgetRef);
        
//         if (budgetDoc.exists()) {
//           const budgetData = budgetDoc.data() as Omit<Budget, 'userId'>;
//           setBudget({ ...budgetData, userId });
//         } else {
//           setBudget(null);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching budget:', err);
//         setError('Failed to load budget. Please try again.');
//         setLoading(false);
//       }
//     };

//     fetchBudget();
//   }, [userId]);

//   const createOrUpdateBudget = async (budgetData: Omit<Budget, 'userId' | 'suggestedMonthlyBudget' | 'dailyLimit'>) => {
//     try {
//       // Calculate suggested monthly budget and daily limit
//       const { monthlyIncome, fixedExpenses, savingGoals } = budgetData;
//       const availableAfterFixed = monthlyIncome - fixedExpenses;
//       const availableAfterSavings = availableAfterFixed - savingGoals;
      
//       const suggestedMonthlyBudget = availableAfterSavings;
//       const dailyLimit = suggestedMonthlyBudget / 30; // Simple daily average

//       const newBudget: Budget = {
//         ...budgetData,
//         userId,
//         suggestedMonthlyBudget,
//         dailyLimit
//       };

//       const budgetRef = doc(db, 'budgets', userId);
//       await setDoc(budgetRef, newBudget);
      
//       setBudget(newBudget);
//       return { success: true, budget: newBudget };
//     } catch (err) {
//       console.error('Error creating/updating budget:', err);
//       setError('Failed to save budget. Please try again.');
//       return { success: false, error: 'Failed to save budget' };
//     }
//   };

//   const updateBudgetCategories = async (categories: { [key: string]: number }) => {
//     if (!budget) return { success: false, error: 'No budget exists' };
    
//     try {
//       const budgetRef = doc(db, 'budgets', userId);
//       await updateDoc(budgetRef, { categories });
      
//       setBudget({ ...budget, categories });
//       return { success: true };
//     } catch (err) {
//       console.error('Error updating budget categories:', err);
//       setError('Failed to update budget categories. Please try again.');
//       return { success: false, error: 'Failed to update budget categories' };
//     }
//   };

//   return { 
//     budget, 
//     loading, 
//     error, 
//     createOrUpdateBudget, 
//     updateBudgetCategories 
//   };
// };





import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Budget } from '../types';

export const useBudget = (userId: string) => {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setBudget(null);
      setLoading(false);
      return;
    }

    const fetchBudget = async () => {
      try {
      const budgetRef = doc(db, 'users', userId, 'budget', 'main');

        const budgetDoc = await getDoc(budgetRef);
        
        if (budgetDoc.exists()) {
          const budgetData = budgetDoc.data() as Omit<Budget, 'userId'>;
          setBudget({ ...budgetData, userId });
        } else {
          setBudget(null);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching budget:', err);
        setError('Failed to load budget. Please try again.');
        setLoading(false);
      }
    };

    fetchBudget();
  }, [userId]);

  const createOrUpdateBudget = async (budgetData: Omit<Budget, 'userId' | 'suggestedMonthlyBudget' | 'dailyLimit'>) => {
    try {
      const { monthlyIncome, fixedExpenses, savingGoals } = budgetData;
      const availableAfterFixed = monthlyIncome - fixedExpenses;
      const availableAfterSavings = availableAfterFixed - savingGoals;
      
      const suggestedMonthlyBudget = availableAfterSavings;
      const dailyLimit = suggestedMonthlyBudget / 30;

      const newBudget: Budget = {
        ...budgetData,
        userId,
        suggestedMonthlyBudget,
        dailyLimit
      };

      const budgetRef = doc(db, "users", userId, "budget", "main")

      await setDoc(budgetRef, newBudget);
      
      setBudget(newBudget);
      return { success: true, budget: newBudget };
    } catch (err) {
      console.error('Error creating/updating budget:', err);
      setError('Failed to save budget. Please try again.');
      return { success: false, error: 'Failed to save budget' };
    }
  };

  const updateBudgetCategories = async (categories: { [key: string]: number }) => {
    if (!budget) return { success: false, error: 'No budget exists' };
    
    try {
      const budgetRef = doc(db, 'users', userId, 'budget');
      await updateDoc(budgetRef, { categories });
      
      setBudget({ ...budget, categories });
      return { success: true };
    } catch (err) {
      console.error('Error updating budget categories:', err);
      setError('Failed to update budget categories. Please try again.');
      return { success: false, error: 'Failed to update budget categories' };
    }
  };

  return { 
    budget, 
    loading, 
    error, 
    createOrUpdateBudget, 
    updateBudgetCategories 
  };
};
