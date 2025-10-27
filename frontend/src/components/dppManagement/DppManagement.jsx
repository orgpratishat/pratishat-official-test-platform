import React, { useState } from 'react';
import { Plus, List } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CreateDPPForm from './CreateDppform';
import DPPList from './DPPList';

const DPPManagement = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [editingDPP, setEditingDPP] = useState(null);

  const handleCreateNew = () => {
    setEditingDPP(null);
    setCurrentView('create');
  };

  const handleEditDPP = (dpp) => {
    setEditingDPP(dpp);
    setCurrentView('create');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingDPP(null);
  };

  const handleDPPCreated = () => {
    setCurrentView('list');
    setEditingDPP(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DPP Management</h1>
          <p className="text-gray-600 mt-2">
            Create and manage Daily Practice Problems
          </p>
        </div>
        
        {currentView === 'list' && (
          <Button onClick={handleCreateNew} className="bg-red-400">
            <Plus className="w-4 h-4 mr-2" />
            Create DPP
          </Button>
        )}
      </div>

      {currentView === 'list' && (
        <DPPList onEditDPP={handleEditDPP} />
      )}

      {currentView === 'create' && (
        <CreateDPPForm
          editingDPP={editingDPP}
          onBack={handleBackToList}
          onSuccess={handleDPPCreated}
        />
      )}
    </div>
  );
};

export default DPPManagement;