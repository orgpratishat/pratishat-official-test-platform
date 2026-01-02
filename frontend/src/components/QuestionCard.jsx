import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BookOpen, 
  FileText, 
  Target,
  BarChart3,
  Lightbulb,
  Zap,
  GraduationCap
} from 'lucide-react';

const QuestionCard = ({ question, index, status, correctOption, userSelectedOption, correctAnswers }) => {
  const [expandedSections, setExpandedSections] = useState({
    hint: false,
    approach: false,
    solution: false,
    analytics: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 bg-white">
      {/* Question Header - Always Visible */}
      <div className={`p-4 border-b ${
        status === 'correct' ? 'bg-green-50 border-green-200' : 
        status === 'wrong' ? 'bg-red-50 border-red-200' :
        'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gray-900">Q{index + 1}</span>
            <span className={`px-3 py-1 text-sm font-bold rounded-full ${
              status === 'correct' ? 'bg-green-100 text-green-800' : 
              status === 'wrong' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {status === 'correct' ? 'Correct' : 
               status === 'wrong' ? 'Wrong' : 'Unattempted'}
            </span>
            <span className={`px-2 py-1 text-xs rounded font-medium ${
              question.difficulty === 'Easy' ? 'bg-green-100 text-green-800 border border-green-200' :
              question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
              'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {question.difficulty}
            </span>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-4 h-4" />
              {Math.round(Math.random() * 120 + 30)}s spent
            </div>
            <div className="text-xs">
              {question.year} • {question.exam}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-700 flex flex-wrap gap-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <strong>Subject:</strong> {question.subject}
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <strong>Chapter:</strong> {question.chapter}
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <strong>Topic:</strong> {question.topics?.join(', ') || 'General'}
          </div>
        </div>
      </div>

      {/* Main Content - Always Visible */}
      <div className="p-6 space-y-6">
        {/* Question Text */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Question</span>
          </h4>
          <div 
            className="prose prose-sm max-w-none text-gray-800 bg-gray-50 p-4 rounded-lg border"
            dangerouslySetInnerHTML={{ __html: question.questionText }}
          />
          {question.questionImage && (
            <div className="mt-3 p-2 border rounded bg-white">
              <img 
                src={question.questionImage} 
                alt="Question diagram" 
                className="max-w-full h-auto mx-auto"
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Options</span>
          </h4>
          <div className="space-y-3">
            {question.options.map((option, optIndex) => {
              const isUserAnswer = userSelectedOption === option.optionText;
              const isCorrectAnswer = option.isCorrect;
              const isUserCorrect = isUserAnswer && isCorrectAnswer;
              const isUserWrong = isUserAnswer && !isCorrectAnswer;
              const isCorrectButNotSelected = isCorrectAnswer && !isUserAnswer;
              
              return (
                <div
                  key={optIndex}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    isUserCorrect
                      ? 'bg-green-50 border-green-300 shadow-md' 
                      : isUserWrong
                      ? 'bg-red-50 border-red-300 shadow-md'
                      : isCorrectButNotSelected
                      ? 'bg-green-50 border-green-200 shadow-sm'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Option Letter */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isUserCorrect
                        ? 'bg-green-500 text-white' 
                        : isUserWrong
                        ? 'bg-red-500 text-white'
                        : isCorrectButNotSelected
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {String.fromCharCode(65 + optIndex)}
                    </div>
                    
                    {/* Option Text */}
                    <div className="flex-1">
                      <div 
                        className="text-gray-800"
                        dangerouslySetInnerHTML={{ __html: option.optionText }}
                      />
                      {option.optionImage && (
                        <img 
                          src={option.optionImage} 
                          alt={`Option ${String.fromCharCode(65 + optIndex)}`}
                          className="max-w-xs h-auto mt-2 border rounded"
                        />
                      )}
                    </div>
                    
                    {/* Status Badges */}
                    <div className="flex gap-2">
                      {isUserCorrect && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full border border-green-300">
                          ✓ Your Answer (Correct)
                        </span>
                      )}
                      {isUserWrong && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full border border-red-300">
                          ✗
                           Your Answer (Wrong)
                        </span>
                      )}
                      {isCorrectButNotSelected && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full border border-green-300">
                          ✓ Correct Answer
                        </span>
                      )}
                      {!isUserAnswer && !isCorrectAnswer && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-full border border-gray-300">
                          Option {String.fromCharCode(65 + optIndex)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Answer Summary */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Answer Summary
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                {String.fromCharCode(65 + question.options.findIndex(opt => opt.isCorrect))}
              </div>
              <div>
                <div className="text-green-800 font-medium" dangerouslySetInnerHTML={{ __html: correctOption?.optionText || 'Not available' }} />
                <div className="text-sm text-green-600">Correct Answer</div>
              </div>
            </div>
            
            {userSelectedOption && (
              <div className={`flex items-center gap-3 p-3 rounded ${
                status === 'correct' ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  status === 'correct' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {String.fromCharCode(65 + question.options.findIndex(opt => opt.optionText === userSelectedOption))}
                </div>
                <div>
                  <div 
                    className={`font-medium ${status === 'correct' ? 'text-green-800' : 'text-red-800'}`}
                    dangerouslySetInnerHTML={{ __html: userSelectedOption }} 
                  />
                  <div className={`text-sm ${status === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                    Your Answer 
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          {/* Hint Section */}
          {question.hint?.text && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('hint')}
                className="w-full p-4 bg-yellow-50 hover:bg-yellow-100 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-gray-900">Hint</span>
                </div>
                {expandedSections.hint ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSections.hint && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <div 
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: question.hint.text }}
                  />
                  {question.hint.image && (
                    <img 
                      src={question.hint.image} 
                      alt="Hint diagram" 
                      className="max-w-xs h-auto mt-3 border rounded"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Approach Section */}
          {question.approach?.text && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('approach')}
                className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-gray-900">Approach & Strategy</span>
                </div>
                {expandedSections.approach ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSections.approach && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <div 
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: question.approach.text }}
                  />
                  {question.approach.image && (
                    <img 
                      src={question.approach.image} 
                      alt="Approach diagram" 
                      className="max-w-xs h-auto mt-3 border rounded"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Solution Section */}
          {question.solution && question.solution.length > 0 && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('solution')}
                className="w-full p-4 bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Step-by-Step Solution</span>
                </div>
                {expandedSections.solution ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSections.solution && (
                <div className="p-4 bg-white border-t border-gray-200 space-y-4">
                  {question.solution.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <div 
                          className="prose prose-sm max-w-none text-gray-800"
                          dangerouslySetInnerHTML={{ __html: step.stepText }}
                        />
                        {step.stepImage && (
                          <img 
                            src={step.stepImage} 
                            alt={`Step ${step.stepNumber}`}
                            className="max-w-xs h-auto mt-2 border rounded"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Analytics Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('analytics')}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Question Analytics</span>
              </div>
              {expandedSections.analytics ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {expandedSections.analytics && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(question.analytics?.averageTime || 0)}s
                    </div>
                    <div className="text-gray-600">Avg Time</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {(question.analytics?.bestTime || 0)}s
                    </div>
                    <div className="text-gray-600">Best Time</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {(question.analytics?.worstTime || 0)}s
                    </div>
                    <div className="text-gray-600">Worst Time</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {question.analytics?.totalAttempts || 0}
                    </div>
                    <div className="text-gray-600">Total Attempts</div>
                  </div>
                </div>
                
                {/* Meta Information */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div>
                      <strong>Question ID:</strong> {question._id}
                    </div>
                    <div>
                      <strong>Created by:</strong> {question.createdBy?.username}
                    </div>
                    <div>
                      <strong>Created:</strong> {new Date(question.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Updated:</strong> {new Date(question.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;