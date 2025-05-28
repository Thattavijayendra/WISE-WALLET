




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';
import Layout from '../components/Layout';
import { Save, X } from 'lucide-react';

const AddExpense: React.FC = () => {
  const { currentUser } = useAuth();
  const { addExpense } = useExpenses(currentUser?.uid || '');
  const { categories, loading: categoriesLoading } = useCategories(currentUser?.uid || '');
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState<string>(''); // updated to string
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return setError('Amount must be a valid number greater than zero');
    }

    if (!description.trim()) {
      return setError('Description is required');
    }

    if (!category) {
      return setError('Please select a category');
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await addExpense({
        amount: parsedAmount,
        description,
        category,
        date: new Date(date)
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Failed to add expense');
      }
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Add Expense">
      <div className="max-w-lg mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Record a new expense</h2>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  ₹
                </span>
                <input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Lunch at canteen"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select a category</option>
                {categoriesLoading ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <X size={18} className="inline mr-1" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50"
              >
                <Save size={18} className="mr-1" />
                {isSubmitting ? 'Saving...' : 'Save Expense'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddExpense;


