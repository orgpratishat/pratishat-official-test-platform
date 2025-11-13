import React, { useState } from 'react';

const CategoryManager = ({ category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rankEntries, setRankEntries] = useState(category.rankEntries);
  const [bulkEdit, setBulkEdit] = useState('');

  const handleRankChange = (marks, newRank) => {
    const updatedEntries = rankEntries.map(entry =>
      entry.marks === marks ? { ...entry, rank: parseInt(newRank) || 0 } : entry
    );
    setRankEntries(updatedEntries);
  };

  const handleSave = () => {
    onUpdate(rankEntries);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setRankEntries(category.rankEntries);
    setIsEditing(false);
  };

  const handleBulkApply = () => {
    if (!bulkEdit.trim()) return;

    const lines = bulkEdit.trim().split('\n');
    const updates = {};

    lines.forEach(line => {
      const [marksStr, rankStr] = line.split(/\s+/);
      const marks = parseInt(marksStr);
      const rank = parseInt(rankStr);
      
      if (marks >= 1 && marks <= 720 && !isNaN(rank)) {
        updates[marks] = rank;
      }
    });

    const updatedEntries = rankEntries.map(entry =>
      updates[entry.marks] !== undefined 
        ? { ...entry, rank: updates[entry.marks] }
        : entry
    );

    setRankEntries(updatedEntries);
    setBulkEdit('');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Bulk Edit</h4>
          <p className="text-sm text-gray-600 mb-2">
            Enter marks and ranks (one per line: "marks rank")
          </p>
          <textarea
            value={bulkEdit}
            onChange={(e) => setBulkEdit(e.target.value)}
            placeholder="550 1250&#10;551 1270&#10;552 1290"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <button
            onClick={handleBulkApply}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
          >
            Apply Bulk Changes
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-96 overflow-y-auto">
        {rankEntries.map((entry) => (
          <div key={entry.marks} className="border border-gray-200 rounded p-2">
            <div className="text-sm font-medium">Marks: {entry.marks}</div>
            {isEditing ? (
              <input
                type="number"
                value={entry.rank}
                onChange={(e) => handleRankChange(entry.marks, e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                min="0"
              />
            ) : (
              <div className="text-sm text-gray-600 mt-1">Rank: {entry.rank}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;