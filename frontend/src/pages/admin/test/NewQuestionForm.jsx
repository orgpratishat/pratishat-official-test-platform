// components/NewQuestionForm.js
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import RichTextEditor from './RichTextEditor';
import { X } from 'lucide-react';

const NewQuestionForm = ({
  newQuestion,
  loading,
  onNewQuestionChange,
  onUpdateOption,
  onCreateQuestion,
  onClose
}) => {
  const handleQuestionFieldChange = (field, value) => {
    onNewQuestionChange({
      ...newQuestion,
      [field]: value
    });
  };

  return (
    <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Create New Question</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Subject *</label>
            <select
              value={newQuestion.subject}
              onChange={(e) => handleQuestionFieldChange('subject', e.target.value)}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Chapter *</label>
            <Input
              value={newQuestion.chapter}
              onChange={(e) => handleQuestionFieldChange('chapter', e.target.value)}
              placeholder="Chapter name"
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Topic *</label>
            <Input
              value={newQuestion.topic}
              onChange={(e) => handleQuestionFieldChange('topic', e.target.value)}
              placeholder="Topic name"
              className="text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Difficulty</label>
          <select
            value={newQuestion.difficulty}
            onChange={(e) => handleQuestionFieldChange('difficulty', e.target.value)}
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Question Text *</label>
          <RichTextEditor
            value={newQuestion.questionText}
            onChange={(value) => handleQuestionFieldChange('questionText', value)}
            placeholder="Enter question text"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Options *</label>
          {newQuestion.options.map((opt, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="radio"
                name="correctOption"
                checked={opt.isCorrect}
                onChange={() => onUpdateOption(i, 'isCorrect', true)}
                className="mt-1 cursor-pointer"
              />
              <div className="flex-1">
                <RichTextEditor
                  value={opt.optionText}
                  onChange={(value) => onUpdateOption(i, 'optionText', value)}
                  placeholder={`Option ${i + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={onCreateQuestion}
          disabled={loading}
          size="sm"
          className="w-full bg-red-400 cursor-pointer"
        >
          {loading ? 'Creating...' : 'Create & Add to Test'}
        </Button>
      </div>
    </Card>
  );
};

export default NewQuestionForm;