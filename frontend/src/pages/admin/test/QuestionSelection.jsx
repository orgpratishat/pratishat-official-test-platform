// components/QuestionSelection.js
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { Search, X, Plus, CheckSquare, Square } from 'lucide-react';
import SafeHTML from './SafeHtml';

const QuestionSelection = ({
  questions,
  selectedQuestions,
  searchTerm,
  onSearchChange,
  onToggleQuestion,
  onSelectAll,
  onDeselectAll,
  onAddSubjectQuestions,
  allSelected,
  someSelected
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          Select Questions ({selectedQuestions.length} selected) *
        </h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddSubjectQuestions('Physics')}
            className="cursor-pointer"
          >
            + Physics
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddSubjectQuestions('Chemistry')}
            className="cursor-pointer"
          >
            + Chemistry
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddSubjectQuestions('Biology')}
            className="cursor-pointer"
          >
            + Biology
          </Button>
        </div>
      </div>

      {/* Search and Select All Bar */}
      <div className="flex gap-3 mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search questions by keyword, subject, chapter, topic..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {questions.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={allSelected ? onDeselectAll : onSelectAll}
            className="flex items-center gap-2 whitespace-nowrap cursor-pointer"
            size="sm"
          >
            {allSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : someSelected ? (
              <Square className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>
        )}
      </div>

      {/* Questions List */}
      <div className="max-h-96 overflow-y-auto border rounded p-3 space-y-2">
        {questions.length === 0 ? (
          <p className="text-center text-gray-500 py-4 text-sm">
            {searchTerm ? 'No questions match your search criteria' : 'No questions available'}
          </p>
        ) : (
          questions.map((q) => (
            <div key={q._id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(q._id)}
                onChange={() => onToggleQuestion(q._id)}
                className="mt-1 cursor-pointer"
              />
              <div className="flex-1">
                <SafeHTML 
                  html={q.questionText} 
                  className="text-sm font-medium"
                />
                <div className="flex gap-2 mt-1">
                  <Badge text={q.subject} />
                  <Badge text={q.difficulty} />
                  <Badge text={`${q.chapter} → ${q.topic}`} />
                  <Badge 
                    text={new Date(q.createdAt).toLocaleDateString('en-GB')} 
                    color="gray"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default QuestionSelection;