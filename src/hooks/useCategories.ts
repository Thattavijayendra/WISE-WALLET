import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Category } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Default categories
const defaultCategories: Omit<Category, 'userId'>[] = [
  { id: 'food', name: 'Food & Snacks', icon: 'utensils', color: '#FF6B6B', isCustom: false },
  { id: 'books', name: 'Books & Stationery', icon: 'book', color: '#4ECDC4', isCustom: false },
  { id: 'transport', name: 'Transport', icon: 'bus', color: '#FFD166', isCustom: false },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'repeat', color: '#6B5CA5', isCustom: false },
  { id: 'entertainment', name: 'Entertainment', icon: 'film', color: '#F72585', isCustom: false },
  { id: 'housing', name: 'Hostel/Rent', icon: 'home', color: '#4CC9F0', isCustom: false },
];

export const useCategories = (userId: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      // Use default categories if no user is logged in
      setCategories(defaultCategories.map(cat => ({ ...cat, userId: '' })));
      setLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        // Get custom categories from Firestore
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        const customCategories: Category[] = [];
        querySnapshot.forEach((doc) => {
          customCategories.push({ ...doc.data(), id: doc.id } as Category);
        });
        
        // Combine default and custom categories
        const allCategories = [
          ...defaultCategories.map(cat => ({ ...cat, userId })),
          ...customCategories.filter(cat => cat.isCustom)
        ];
        
        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [userId]);

  const addCategory = async (categoryData: Omit<Category, 'id' | 'userId' | 'isCustom'>) => {
    try {
      const newCategory = {
        ...categoryData,
        userId,
        isCustom: true,
        id: uuidv4()
      };
      
      const docRef = await addDoc(collection(db, 'categories'), newCategory);
      const addedCategory = { ...newCategory, id: docRef.id };
      
      setCategories([...categories, addedCategory]);
      return { success: true, category: addedCategory };
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Failed to add category. Please try again.');
      return { success: false, error: 'Failed to add category' };
    }
  };

  const deleteCategory = async (categoryId: string) => {
    // Don't allow deletion of default categories
    const category = categories.find(cat => cat.id === categoryId);
    if (!category || !category.isCustom) {
      return { success: false, error: 'Cannot delete default categories' };
    }

    try {
      const categoryRef = doc(db, 'categories', categoryId);
      await deleteDoc(categoryRef);
      
      setCategories(categories.filter(cat => cat.id !== categoryId));
      return { success: true };
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category. Please try again.');
      return { success: false, error: 'Failed to delete category' };
    }
  };

  return { categories, loading, error, addCategory, deleteCategory };
};