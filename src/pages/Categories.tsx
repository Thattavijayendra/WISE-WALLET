import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCategories } from '../hooks/useCategories';
import Layout from '../components/Layout';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';

const Categories: React.FC = () => {
  const { currentUser } = useAuth();
  const { categories, loading, addCategory, deleteCategory } = useCategories(currentUser?.uid || '');
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#4ECDC4');
  const [error, setError] = useState<string | null>(null);
  
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      return setError('Category name is required');
    }
    
    // Check if category name already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase())) {
      return setError('Category name already exists');
    }
    
    try {
      const result = await addCategory({
        name: newCategoryName,
        icon: 'tag', // Default icon
        color: newCategoryColor
      });
      
      if (result.success) {
        setNewCategoryName('');
        setNewCategoryColor('#4ECDC4');
        setIsAddingCategory(false);
        setError(null);
      } else {
        setError(result.error || 'Failed to add category');
      }
    } catch (err) {
      console.error('Error adding category:', err);
      setError('An unexpected error occurred');
    }
  };
  
  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const result = await deleteCategory(categoryId);
        
        if (!result.success) {
          setError(result.error || 'Failed to delete category');
        }
      } catch (err) {
        console.error('Error deleting category:', err);
        setError('An unexpected error occurred');
      }
    }
  };
  
  // Color options
  const colorOptions = [
    '#FF6B6B', '#4ECDC4', '#FFD166', '#6B5CA5', '#F72585', '#4CC9F0'
  ];
  
  return (
    <Layout title="Expense Categories">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Manage your expense categories</h2>
            {!isAddingCategory && (
              <button
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
              >
                <Plus size={18} className="mr-1" />
                Add Category
              </button>
            )}
          </div>
          
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {/* Add Category Form */}
          {isAddingCategory && (
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-white font-medium mb-4">Add New Category</h3>
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-grow">
                  <label htmlFor="category-name" className="block text-sm font-medium text-gray-300 mb-1">
                    Category Name
                  </label>
                  <input
                    id="category-name"
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., Hobbies"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewCategoryColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newCategoryColor === color ? 'border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddCategory}
                    className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <Check size={18} className="mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCategory(false);
                      setError(null);
                    }}
                    className="flex items-center bg-gray-600 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <X size={18} className="mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Categories List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-700 p-4 rounded-lg">
                  <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-600 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: category.color }}
                    >
                      {/* You could use an icon here based on category.icon */}
                      <span className="text-white font-bold">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white font-medium">{category.name}</span>
                  </div>
                  
                  {category.isCustom && (
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-gray-400 hover:text-red-400 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!loading && categories.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-400">No categories found. Add your first category.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;