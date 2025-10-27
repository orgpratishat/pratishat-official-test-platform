import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Flag } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  selectedOption, 
  onSelectOption, 
  isMarkedForReview,
  onToggleReview 
}) => {
  return (
    <Card className="p-6">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge text={`Question ${questionNumber}`} />
            <Badge text={question.subject} />
            <Badge text={question.difficulty} />
          </div>
          <h3 className="text-sm text-gray-600">
            {question.chapter} → {question.topic}
          </h3>
        </div>
        <button
          onClick={onToggleReview}
          className={`p-2 rounded-lg transition-colors ${
            isMarkedForReview 
              ? 'bg-yellow-100 text-yellow-600' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          title="Mark for review"
        >
          <Flag className="w-5 h-5" fill={isMarkedForReview ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <p className="text-lg text-gray-900 font-medium mb-3">
          {question.questionText}
        </p>
        {question.questionImage && (
          <img 
            src={question.questionImage} 
            alt="Question" 
            className="max-w-md rounded-lg border border-gray-200"
          />
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(index)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedOption === index
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                selectedOption === index
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              }`}>
                {selectedOption === index && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{option.optionText}</p>
                {option.optionImage && (
                  <img 
                    src={option.optionImage} 
                    alt={`Option ${index + 1}`} 
                    className="mt-2 max-w-xs rounded border border-gray-200"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuestionCard;
