

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuestionsByTopic } from '../services/chapterwise';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { Search, X, Image as ImageIcon, ChevronLeft, ChevronRight, Lightbulb, Target, BookOpen, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';

// Function to format text with HTML tags for display and preserve line breaks
const formatTextWithHTML = (text) => {
  if (!text) return '';
  
  // First, split by newlines and process each line
  const lines = text.split('\n');
  
  // Process each line with HTML formatting and join with <br>
  return lines.map(line => 
    line
      // Process division syntax: {{numerator/denominator}}
      .replace(/\{\{([^}]+)\/([^}]+)\}\}/g, '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>')
      .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
      .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
      .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
      .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>')
  ).join('<br>');
};

const TopicPractice = () => {
  const { subject, chapter, topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  // Add CSS for fraction styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .fraction {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        vertical-align: middle;
        margin: 0 2px;
      }
      .numerator {
        padding: 0 4px;
        border-bottom: 1px solid currentColor;
        line-height: 1;
        font-size: 0.9em;
      }
      .denominator {
        padding: 0 4px;
        line-height: 1;
        font-size: 0.9em;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getQuestionsByTopic(subject, chapter, topic);
        console.log(res.questions)
        const qs = res.questions || [];
        setQuestions(qs);
        setFiltered(qs);
        setIndex(0);
        setAnswers({});
        setLockedAnswers({});
        setShowExplanation({});
      } catch {
        toast.error('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [subject, chapter, topic]);

  // Fuse.js setup - updated to include exam field
  const fuse = useMemo(() => new Fuse(questions, {
    keys: ['questionText', 'exam'], 
    threshold: 0.3, 
    ignoreLocation: true
  }), [questions]);

  useEffect(() => {
    if (!searchTerm.trim()) return setFiltered(questions);
    setFiltered(fuse.search(searchTerm).map(r => r.item));
  }, [searchTerm, fuse, questions]);

  const current = filtered[index];
  const total = filtered.length;
  const currentAnswer = answers[index];
  const isLocked = lockedAnswers[index];
  const currentShowExplanation = showExplanation[index];
  const selectedOption = currentAnswer !== undefined ? current.options?.[currentAnswer] : null;
  const isCorrect = selectedOption?.isCorrect;

  const selectAnswer = (i) => {
    if (!isLocked) {
      setAnswers(prev => ({ ...prev, [index]: i }));
    }
  };

  const lockAnswer = () => {
    if (currentAnswer !== undefined) {
      setLockedAnswers(prev => ({ ...prev, [index]: true }));
      setShowExplanation(prev => ({ ...prev, [index]: true }));
    }
  };

  const changeAnswer = () => {
    setLockedAnswers(prev => ({ ...prev, [index]: false }));
    setShowExplanation(prev => ({ ...prev, [index]: false }));
  };

  const next = () => {
    setIndex(i => Math.min(i + 1, total - 1));
    // Auto-scroll to top when changing questions
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    setIndex(i => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Spinner size={48} />
    </div>
  );

  if (!total) return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {subject} / {chapter} / {topic}
        </h1>
        <Link to="/chapterwise">
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Topics
          </Button>
        </Link>
      </div>
      <Card className="p-12 text-center">
        <div className="text-gray-500 text-lg">
          No questions found for this topic.
        </div>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {subject} / {chapter} / {topic}
          </h1>
          <div className="flex items-center gap-3">
            <Badge variant="primary" text={subject} />
            <Badge variant="secondary" text={`${questions.length} questions`} />
          </div>
        </div>
        <Link to="/chapterwise">
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Change Topic
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            className="pl-12 pr-10 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="Search questions in this topic..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="text-sm text-gray-600 mt-2">
            Found {filtered.length} of {questions.length} questions
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {index + 1} of {total}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((index + 1) / total) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-8 mb-6 shadow-lg border-2 border-gray-100">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">Q</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-600">Question {index + 1}</span>
              <span className="text-xs text-gray-500">Difficulty:</span>
              <Badge 
                variant={
                  current.difficulty === 'Easy' ? 'success' : 
                  current.difficulty === 'Medium' ? 'warning' : 'danger'
                } 
                text={current.difficulty} 
              />
            </div>
            {/* Exam Field Display */}
            {current.exam && (
              <div className="flex text-black items-center gap-2">
                <span className="text-xs text-black">Exam:</span>
                <Badge variant="info" text={current.exam} />
              </div>
            )}
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <div 
            className="text-xl font-medium text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ 
              __html: formatTextWithHTML(current.questionText) 
            }}
          />
          
          {/* Question Image */}
          {current.questionImage && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Question Image</span>
              </div>
              <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 flex justify-center">
                <img 
                  src={current.questionImage} 
                  alt="Question diagram"
                  className="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isLocked ? 'Your Answer:' : 'Select your answer:'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.options?.map((opt, i) => {
              const selected = currentAnswer === i;
              const showCorrect = isLocked && opt.isCorrect;
              const showIncorrect = isLocked && selected && !opt.isCorrect;
              
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  disabled={isLocked}
                  className={`
                    relative p-6 rounded-2xl border-2 text-left transition-all duration-200
                    ${selected 
                      ? showCorrect
                        ? 'border-green-500 bg-green-50 shadow-md' 
                        : showIncorrect
                        ? 'border-red-500 bg-red-50 shadow-md'
                        : 'border-blue-500 bg-blue-50 shadow-md'
                      : showCorrect && isLocked
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }
                    ${!isLocked && 'hover:scale-[1.01] active:scale-[0.99]'}
                    ${isLocked && !selected && !showCorrect && 'opacity-70'}
                  `}
                >
                  {/* Option letter badge */}
                  <div className={`
                    absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                    ${selected 
                      ? showCorrect
                        ? 'bg-green-500' 
                        : showIncorrect
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                      : showCorrect && isLocked
                      ? 'bg-green-500'
                      : 'bg-gray-400'
                    }
                  `}>
                    {String.fromCharCode(65 + i)}
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Option text with HTML formatting including fractions */}
                    <div 
                      className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ 
                        __html: formatTextWithHTML(opt.optionText) 
                      }}
                    />
                    
                    {/* Option image */}
                    {opt.optionImage && (
                      <div className="border border-gray-200 rounded-lg p-2 bg-white">
                        <img 
                          src={opt.optionImage} 
                          alt={`Option ${i + 1} diagram`}
                          className="max-w-full max-h-32 object-contain mx-auto"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Selection indicator */}
                  {selected && (
                    <div className={`
                      absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
                      ${showCorrect 
                        ? 'bg-green-500' 
                        : showIncorrect
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                      }
                    `}>
                      {showCorrect ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : showIncorrect ? (
                        <XCircle className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  )}

                  {/* Correct answer indicator */}
                  {!selected && showCorrect && isLocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        {!isLocked && currentAnswer !== undefined && (
          <div className="flex justify-center">
            <Button 
              onClick={lockAnswer}
              className="px-8 py-3 text-lg font-semibold bg-red-400 hover:bg-red-500"
            >
              Lock Answer & Show Explanation
            </Button>
          </div>
        )}

        {isLocked && (
          <div className="flex justify-center">
            <Button 
              onClick={changeAnswer}
              variant="outline"
              className="flex items-center gap-2 px-6 py-2"
            >
              <RotateCcw className="w-4 h-4" />
              Change Answer
            </Button>
          </div>
        )}
      </Card>

      {/* Explanation Section */}
      {currentShowExplanation && isLocked && (
        <div className="space-y-6 mb-6">
          {/* Result Banner */}
          <Card className={`p-6 border-2 ${
            isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? 'Correct! 🎉' : 'Incorrect! 💡'}
                </h3>
                <p className={`text-sm ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect 
                    ? 'Great job! You selected the correct answer.' 
                    : 'The correct answer is marked in green. Learn from the explanation below.'
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* Hint Section */}
          {current.hint?.text && (
            <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-yellow-800">Hint</h3>
              </div>
              <div 
                className="text-yellow-700 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ 
                  __html: formatTextWithHTML(current.hint.text) 
                }}
              />
              {current.hint.image && (
                <div className="mt-4 border border-yellow-200 rounded-lg p-3 bg-white">
                  <img 
                    src={current.hint.image} 
                    alt="Hint diagram"
                    className="max-w-full max-h-48 object-contain mx-auto rounded"
                  />
                </div>
              )}
            </Card>
          )}

          {/* Approach Section */}
          {current.approach?.text && (
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Concept</h3>
              </div>
              <div 
                className="text-blue-700 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ 
                  __html: formatTextWithHTML(current.approach.text) 
                }}
              />
              {current.approach.image && (
                <div className="mt-4 border border-blue-200 rounded-lg p-3 bg-white">
                  <img 
                    src={current.approach.image} 
                    alt="Approach diagram"
                    className="max-w-full max-h-48 object-contain mx-auto rounded"
                  />
                </div>
              )}
            </Card>
          )}

          {/* Solution Steps */}
          {current.solution?.length > 0 && (
            <Card className="p-6 border-2 border-purple-200 bg-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-purple-800">Step-by-Step Solution</h3>
              </div>
              <div className="space-y-4">
                {current.solution.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex gap-4 p-4 bg-white rounded-lg border border-purple-100">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">{step.stepNumber}</span>
                    </div>
                    <div className="flex-1">
                      <div 
                        className="text-purple-700 mb-2 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ 
                          __html: formatTextWithHTML(step.stepText) 
                        }}
                      />
                      {step.stepImage && (
                        <div className="mt-2 border border-purple-200 rounded p-2 bg-white">
                          <img 
                            src={step.stepImage} 
                            alt={`Step ${step.stepNumber} diagram`}
                            className="max-w-full max-h-40 object-contain mx-auto rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={prev} 
          disabled={index === 0}
          className="flex items-center gap-2 px-6 py-3"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">
            {index + 1} / {total}
          </span>
        </div>
        
        <Button 
          onClick={next} 
          disabled={index === total - 1}
          className="flex items-center gap-2 px-6 py-3 bg-red-400 hover:bg-red-500"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default TopicPractice;