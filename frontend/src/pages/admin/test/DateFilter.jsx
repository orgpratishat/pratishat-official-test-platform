// components/DateFilter.js
import React from 'react';
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { Filter } from 'lucide-react';

const DateFilter = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  onApplyFilter, 
  onClearFilter,
  isFilterActive 
}) => {
  return (
    <Card className="p-4 mb-4 bg-gray-50 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-gray-600" />
        <h3 className="font-medium text-gray-800">Filter Questions by Creation Date</h3>
        {isFilterActive && (
          <Badge text="Filter Active" color="blue" />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Start Date & Time
          </label>
          <Input
            type="datetime-local"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            End Date & Time
          </label>
          <Input
            type="datetime-local"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={onApplyFilter}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            size="sm"
          >
            Apply Filter
          </Button>
          <Button
            type="button"
            onClick={onClearFilter}
            variant="outline"
            className="flex-1 cursor-pointer"
            size="sm"
          >
            Clear
          </Button>
        </div>
      </div>
      
      {isFilterActive && (
        <div className="mt-3 text-xs text-gray-600">
          <p>Showing questions created between {new Date(startDate).toLocaleString()} and {new Date(endDate).toLocaleString()}</p>
        </div>
      )}
    </Card>
  );
};

export default DateFilter;