import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RankRangeManager from '../components/rankRange/RankRangeManager'


const API_BASE_URL = import.meta.env.VITE_API_URL

function RankRange() {
  const [rankRanges, setRankRanges] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchRankRanges();
  }, []);

  const fetchRankRanges = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/rankranges`);
      setRankRanges(response.data);
    } catch (error) {
      console.error('Error fetching rank ranges:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleCreateNew = () => {
    setSelectedYear('new');
  };

  const handleBackToList = () => {
    setSelectedYear('');
    fetchRankRanges();
  };

  const handleDeleteYear = async (year, event) => {
    event.stopPropagation(); // Prevent triggering the card click
    
    if (!confirm(`Are you sure you want to delete all data for ${year}? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(year);
    try {
      await axios.delete(`${API_BASE_URL}/rankranges/${year}`);
      alert(`Year ${year} deleted successfully!`);
      fetchRankRanges(); // Refresh the list
    } catch (error) {
      console.error('Error deleting year:', error);
      alert('Error deleting year');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Rank Range Management System
          </h1>
          <p className="text-gray-600">
            Manage rank ranges for different years and categories
          </p>
        </header>

        {!selectedYear ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Years</h2>
              <button
                onClick={handleCreateNew}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Year
              </button>
            </div>

            {rankRanges.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No rank ranges found. Create your first one!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rankRanges.map((rankRange) => (
                  <div
                    key={rankRange._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group relative"
                    onClick={() => handleYearChange(rankRange.year)}
                  >
                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDeleteYear(rankRange.year, e)}
                      disabled={deleteLoading === rankRange.year}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                      title={`Delete ${rankRange.year}`}
                    >
                      {deleteLoading === rankRange.year ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>

                    <h3 className="text-lg font-semibold mb-2 pr-6">
                      Year: {rankRange.year}
                    </h3>
                    <p className="text-gray-600">
                      Categories: {rankRange.categories.length}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date(rankRange.updatedAt).toLocaleDateString()}
                    </p>
                    
                    {/* Categories Preview */}
                    {rankRange.categories.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Categories:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rankRange.categories.slice(0, 3).map((cat, index) => (
                            <span
                              key={cat.name}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {cat.name}
                            </span>
                          ))}
                          {rankRange.categories.length > 3 && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              +{rankRange.categories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <RankRangeManager
            year={selectedYear}
            onBack={handleBackToList}
            onSave={fetchRankRanges}
          />
        )}
      </div>
    </div>
  );
}

export default RankRange;