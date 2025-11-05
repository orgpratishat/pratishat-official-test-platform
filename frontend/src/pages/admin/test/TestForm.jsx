// components/TestForm.js
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { ArrowLeft } from 'lucide-react';

const TestForm = ({
  formData,
  editingTest,
  loading,
  onFormDataChange,
  onMarkingSchemeChange,
  onGoBack,
  onSubmit
}) => {
  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <div className="mb-6 flex items-center">
        <Button
          variant="outline"
          onClick={onGoBack}
          className="flex items-center gap-2 mr-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back to Test Management
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {editingTest ? 'Edit Test' : 'Create New Test'}
        </h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Basic Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Test Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="e.g., NEET Mock Test 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Test Type *</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
                required
              >
                <option value="DPP_TEST">DPP Test</option>
                <option value="NEET_MOCK">NEET Mock Test</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Scheduled Date *</label>
              <Input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Time *</label>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Time *</label>
              <Input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                required
              />
            </div>
          </div>
        </Card>

        {/* Marking Scheme */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Marking Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Total Marks *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.markingScheme.totalMarks}
                onChange={(e) => onMarkingSchemeChange('totalMarks', e.target.value)}
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Positive Marks *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.markingScheme.positiveMarks}
                onChange={(e) => onMarkingSchemeChange('positiveMarks', e.target.value)}
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Negative Marks *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.markingScheme.negativeMarks}
                onChange={(e) => onMarkingSchemeChange('negativeMarks', e.target.value)}
                required
                min="0"
              />
            </div>
          </div>
        </Card>

        {/* Active Status */}
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              id="isActiveCheck"
              className="w-4 h-4"
            />
            <label htmlFor="isActiveCheck" className="text-sm font-medium">
              Active (visible to students)
            </label>
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onGoBack}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading} 
            className="text-black outline cursor-pointer hover:bg-gray-800 hover:text-white"
          >
            {loading ? 'Saving...' : editingTest ? 'Update Test' : 'Create Test'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TestForm;