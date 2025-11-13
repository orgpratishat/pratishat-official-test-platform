import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryManager from './CategoryManager';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const RankRangeManager = ({ year, onBack, onSave }) => {
  const [rankRange, setRankRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(year === 'new');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (year !== 'new') {
      fetchRankRange();
    } else {
      setRankRange({
        year: new Date().getFullYear(),
        categories: []
      });
    }
  }, [year]);

  const fetchRankRange = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/rankranges/${year}`);
      setRankRange(response.data);
    } catch (error) {
      console.error('Error fetching rank range:', error);
      alert('Error fetching rank range data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRankRange = async () => {
    if (!rankRange) return;

    setLoading(true);
    try {
      if (isCreatingNew) {
        await axios.post(`${API_BASE_URL}/rankranges`, rankRange);
      } else {
        await axios.put(`${API_BASE_URL}/rankranges/${year}`, {
          categories: rankRange.categories
        });
      }
      alert('Rank range saved successfully!');
      onSave();
      onBack();
    } catch (error) {
      console.error('Error saving rank range:', error);
      alert('Error saving rank range');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteYear = async () => {
    if (isCreatingNew) {
      // If it's a new unsaved year, just go back
      onBack();
      return;
    }

    if (!confirm(`Are you sure you want to delete ALL data for ${year}? This action cannot be undone and will delete all categories and rank entries.`)) {
      return;
    }

    setDeleteLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/rankranges/${year}`);
      alert(`Year ${year} deleted successfully!`);
      onSave();
      onBack();
    } catch (error) {
      console.error('Error deleting year:', error);
      alert('Error deleting year');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    if (rankRange.categories.some(cat => cat.name === newCategoryName)) {
      alert('Category already exists');
      return;
    }

    const newCategory = {
      name: newCategoryName.trim(),
      rankEntries: Array.from({ length: 720 }, (_, i) => ({
        marks: i + 1,
        rank: 0
      }))
    };

    if (isCreatingNew) {
      setRankRange(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
    } else {
      try {
        await axios.post(`${API_BASE_URL}/rankranges/${year}/categories`, newCategory);
        fetchRankRange(); // Refresh data
      } catch (error) {
        console.error('Error adding category:', error);
        alert('Error adding category');
        return;
      }
    }

    setNewCategoryName('');
  };

  const handleDeleteCategory = async (categoryName) => {
    if (!confirm(`Are you sure you want to delete category "${categoryName}"?`)) {
      return;
    }

    if (isCreatingNew) {
      setRankRange(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat.name !== categoryName)
      }));
    } else {
      try {
        await axios.delete(`${API_BASE_URL}/rankranges/${year}/categories/${categoryName}`);
        fetchRankRange(); // Refresh data
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category');
      }
    }
  };

  const handleUpdateCategory = (categoryName, updatedEntries) => {
    if (isCreatingNew) {
      setRankRange(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.name === categoryName
            ? { ...cat, rankEntries: updatedEntries }
            : cat
        )
      }));
    } else {
      // For existing records, update via API
      axios.put(`${API_BASE_URL}/rankranges/${year}/categories/${categoryName}`, {
        rankEntries: updatedEntries
      })
      .then(() => {
        alert('Category updated successfully!');
      })
      .catch(error => {
        console.error('Error updating category:', error);
        alert('Error updating category');
      });
    }
  };

  if (loading && !rankRange) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!rankRange) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">No data found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {isCreatingNew ? 'Create New Rank Range' : `Manage Rank Range - ${year}`}
          </h2>
          {isCreatingNew && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                value={rankRange.year}
                onChange={(e) => setRankRange(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="border border-gray-300 rounded-md px-3 py-2 w-32"
                min="2000"
                max="2100"
              />
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          {!isCreatingNew && (
            <button
              onClick={handleDeleteYear}
              disabled={deleteLoading}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center"
            >
              {deleteLoading ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Year
                </>
              )}
            </button>
          )}
          <button
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to List
          </button>
          <button
            onClick={handleSaveRankRange}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats for existing years */}
      {!isCreatingNew && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold">Year:</span> {year}
            </div>
            <div>
              <span className="font-semibold">Categories:</span> {rankRange.categories.length}
            </div>
            <div>
              <span className="font-semibold">Last Updated:</span> {new Date(rankRange.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Add Category Section */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Add New Category</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name (e.g., EWS, PWD)"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {rankRange.categories.map((category) => (
          <CategoryManager
            key={category.name}
            category={category}
            onUpdate={(updatedEntries) => handleUpdateCategory(category.name, updatedEntries)}
            onDelete={() => handleDeleteCategory(category.name)}
          />
        ))}
      </div>

      {rankRange.categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No categories added yet. Add your first category above.
        </div>
      )}
    </div>
  );
};

export default RankRangeManager;