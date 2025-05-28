// import { useState, useEffect } from 'react';
// import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../firebase/config';
// import { Expense } from '../types';
// import { v4 as uuidv4 } from 'uuid';

// export const useExpenses = (userId: string) => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userId) {
//       setExpenses([]);
//       setLoading(false);
//       return;
//     }

//     const expensesRef = collection(db, 'expenses');
//     const q = query(
//       expensesRef,
//       where('userId', '==', userId),
//       orderBy('date', 'desc')
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const expenseData: Expense[] = snapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             amount: data.amount,
//             category: data.category,
//             description: data.description,
//             date: data.date.toDate(),
//             userId: data.userId,
//           };
//         });
//         setExpenses(expenseData);
//         setLoading(false);
//       },
//       (err) => {
//         console.error('Error fetching expenses:', err);
//         setError('Failed to load expenses. Please try again.');
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [userId]);

//   const addExpense = async (expenseData: Omit<Expense, 'id' | 'userId' | 'date'> & { date?: Date }) => {
//     try {
//       const newExpense = {
//         ...expenseData,
//         userId,
//         date: serverTimestamp(),
//         id: uuidv4()
//       };
      
//       await addDoc(collection(db, 'expenses'), newExpense);
//       return { success: true };
//     } catch (err) {
//       console.error('Error adding expense:', err);
//       setError('Failed to add expense. Please try again.');
//       return { success: false, error: 'Failed to add expense' };
//     }
//   };

//   const updateExpense = async (id: string, updates: Partial<Omit<Expense, 'id' | 'userId'>>) => {
//     try {
//       const expenseRef = doc(db, 'expenses', id);
//       await updateDoc(expenseRef, updates);
//       return { success: true };
//     } catch (err) {
//       console.error('Error updating expense:', err);
//       setError('Failed to update expense. Please try again.');
//       return { success: false, error: 'Failed to update expense' };
//     }
//   };

//   const deleteExpense = async (id: string) => {
//     try {
//       const expenseRef = doc(db, 'expenses', id);
//       await deleteDoc(expenseRef);
//       return { success: true };
//     } catch (err) {
//       console.error('Error deleting expense:', err);
//       setError('Failed to delete expense. Please try again.');
//       return { success: false, error: 'Failed to delete expense' };
//     }
//   };

//   return { expenses, loading, error, addExpense, updateExpense, deleteExpense };
// };







import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useExpenses = (userId: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    // Use the user-specific subcollection path:
    const expensesRef = collection(db, 'users', userId, 'expenses');
    const q = query(
      expensesRef,
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expenseData: Expense[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            amount: data.amount,
            category: data.category,
            description: data.description,
            date: data.date.toDate(),
            userId: userId,
          };
        });
        setExpenses(expenseData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching expenses:', err);
        setError('Failed to load expenses. Please try again.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const addExpense = async (expenseData: Omit<Expense, 'id' | 'userId' | 'date'> & { date?: Date }) => {
    try {
      const newExpense = {
        ...expenseData,
        userId,
        date: serverTimestamp(),
        id: uuidv4()
      };
      
      // Write to user-specific expenses subcollection
      await addDoc(collection(db, 'users', userId, 'expenses'), newExpense);
      return { success: true };
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Failed to add expense. Please try again.');
      return { success: false, error: 'Failed to add expense' };
    }
  };

  const updateExpense = async (id: string, updates: Partial<Omit<Expense, 'id' | 'userId'>>) => {
    try {
      const expenseRef = doc(db, 'users', userId, 'expenses', id);
      await updateDoc(expenseRef, updates);
      return { success: true };
    } catch (err) {
      console.error('Error updating expense:', err);
      setError('Failed to update expense. Please try again.');
      return { success: false, error: 'Failed to update expense' };
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const expenseRef = doc(db, 'users', userId, 'expenses', id);
      await deleteDoc(expenseRef);
      return { success: true };
    } catch (err) {
      console.error('Error deleting expense:', err);
      setError('Failed to delete expense. Please try again.');
      return { success: false, error: 'Failed to delete expense' };
    }
  };

  return { expenses, loading, error, addExpense, updateExpense, deleteExpense };
};
