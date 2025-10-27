
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTestStore } from '../../store/testStore';
import { useAttemptStore } from '../../store/attemptStore';
import { useTimer } from '../../hooks/useTimer';
import QuestionCard from './QuestionCard';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { Clock, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { formatTime } from '../../utils/formatters';
import toast from 'react-hot-toast';

// Format text for display - CRITICAL FUNCTION for showing formatted text
export const formatTextWithHTML = (text) => {
  if (!text) return '';
  
  return text
    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
    .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
};

// Safe HTML component for rendering formatted text
const SafeHTML = ({ html, className = '' }) => {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: formatTextWithHTML(html) }}
    />
  );
};

// Updated QuestionCard component to handle formatted text
const FormattedQuestionCard = ({ 
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
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Question {questionNumber}
          </h3>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              {question.subject}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              question.difficulty === 'Easy' 
                ? 'bg-green-100 text-green-800' 
                : question.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {question.difficulty}
            </span>
          </div>
        </div>
        <Button
          variant={isMarkedForReview ? "secondary" : "outline"}
          size="sm"
          onClick={onToggleReview}
          className="flex items-center gap-2"
        >
          <Flag className="w-4 h-4" />
          {isMarkedForReview ? 'Marked' : 'Mark'}
        </Button>
      </div>

      {/* Question Text - Using SafeHTML for formatted display */}
      <div className="mb-6">
        <SafeHTML 
          html={question.questionText} 
          className="text-lg text-gray-900 leading-relaxed"
        />
        
        {/* Question Image */}
        {question.questionImage && (
          <div className="mt-4">
            <img 
              src={question.questionImage} 
              alt="Question" 
              className="max-w-full h-auto max-h-64 object-contain rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(index)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedOption === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                selectedOption === index
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-white text-gray-600'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              
              <div className="flex-1">
                {/* Option Text with SafeHTML for formatted display */}
                <SafeHTML 
                  html={option.optionText} 
                  className="text-gray-900 leading-relaxed"
                />
                
                {/* Option Image */}
                {option.optionImage && (
                  <div className="mt-2">
                    <img 
                      src={option.optionImage} 
                      alt={`Option ${String.fromCharCode(65 + index)}`}
                      className="max-w-full h-auto max-h-48 object-contain rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { currentTest, testQuestions, loading, fetchTestQuestions } = useTestStore();
  const { submit, loading: submitting } = useAttemptStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [marked, setMarked] = useState({});
  const [startTimes, setStartTimes] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    fetchTestQuestions(testId);
  }, [testId]);

  useEffect(() => {
    if (testQuestions.length > 0) {
      const qid = testQuestions[currentIndex]._id;
      setStartTimes(prev => ({
        ...prev,
        [qid]: prev[qid] || Date.now()
      }));
    }
  }, [currentIndex, testQuestions]);

  const duration = (currentTest?.duration || 180) * 60;
  const { timeLeft } = useTimer(duration, () => setTimeUp(true));

  useEffect(() => {
    if (timeUp && !showConfirm) {
      toast.error('Time up! Please submit your test');
      setShowConfirm(true);
    }
  }, [timeUp, showConfirm]);

  const selectOption = idx => {
    const qid = testQuestions[currentIndex]._id;
    setResponses(r => ({ ...r, [qid]: idx }));
  };

  const toggleReview = () => {
    const qid = testQuestions[currentIndex]._id;
    setMarked(m => ({ ...m, [qid]: !m[qid] }));
  };

  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));
  const next = () => setCurrentIndex(i => Math.min(i + 1, testQuestions.length - 1));

  const handleSubmit = async () => {
    console.log('Submit clicked');
    console.log('currentTest:', currentTest);
    
    if (!currentTest || !currentTest.type) {
      toast.error('Test not loaded properly. Please refresh the page.');
      setShowConfirm(false);
      return;
    }

    setShowConfirm(false);

    try {
      const formatted = testQuestions.map(q => ({
        questionId: q._id,
        selectedOption: responses[q._id] !== undefined ? responses[q._id] : null,
        timeSpent: Math.floor((Date.now() - (startTimes[q._id] || Date.now())) / 1000),
        isMarkedForReview: marked[q._id] || false
      }));

      const payload = {
        attemptType: currentTest.type,
        testId: testId,
        questions: testQuestions.map(q => q._id),
        responses: formatted,
        totalTimeSpent: duration - timeLeft
      };

      console.log('Submitting payload:', payload);

      const result = await submit(payload);
      
      console.log('Result:', result);

      if (result && result.success) {
        toast.success('Test submitted successfully!');
        const attemptId = result.attempt?._id || result._id;
        navigate(`/test-result/${attemptId}`);
      } else {
        toast.error('Submission failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to submit test');
    }
  };

  if (loading || !testQuestions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  const current = testQuestions[currentIndex];
  const total = testQuestions.length;
  const answered = Object.keys(responses).length;
  const reviewed = Object.values(marked).filter(Boolean).length;
  const unanswered = total - answered;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{currentTest?.name}</h1>
            <p className="text-sm text-gray-600">
              Question {currentIndex + 1} of {total}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className={`font-mono font-semibold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Button 
              variant="danger" 
              onClick={() => setShowConfirm(true)}
              disabled={!currentTest || submitting}
              className="bg-red-400"
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-3">
          <FormattedQuestionCard
            question={current}
            questionNumber={currentIndex + 1}
            selectedOption={responses[current._id]}
            onSelectOption={selectOption}
            isMarkedForReview={marked[current._id]}
            onToggleReview={toggleReview}
          />
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prev} disabled={currentIndex === 0}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button variant="secondary" onClick={toggleReview}>
              <Flag className="w-4 h-4 mr-2" />
              {marked[current._id] ? 'Unmark' : 'Mark'} for Review
            </Button>
            <Button onClick={next} disabled={currentIndex === total - 1} className="bg-red-400">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Palette */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-24">
            <h3 className="font-semibold mb-4">Question Palette</h3>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">{answered}</div>
                <div className="text-xs text-gray-600">Answered</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="text-lg font-bold text-yellow-600">{reviewed}</div>
                <div className="text-xs text-gray-600">Marked</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-gray-600">{unanswered}</div>
                <div className="text-xs text-gray-600">Unanswered</div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {testQuestions.map((q, i) => {
                const isCurr = i === currentIndex;
                const isAns = responses[q._id] !== undefined;
                const isRev = marked[q._id];
                return (
                  <button
                    key={q._id}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-10 h-10 rounded font-semibold text-sm transition ${
                      isCurr
                        ? 'bg-blue-500 text-white'
                        : isAns
                        ? 'bg-green-500 text-white'
                        : isRev
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs border-t pt-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded" />
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <span>Current</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Submit Test?</h2>
            <div className="mb-6 space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>Answered:</strong> {answered} / {total}
              </p>
              <p className="text-gray-700">
                <strong>Marked for Review:</strong> {reviewed}
              </p>
              <p className="text-gray-700">
                <strong>Unanswered:</strong> {unanswered}
              </p>
              <p className="text-red-600 font-medium mt-4">
                Are you sure you want to submit? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1 bg-red-400"
                onClick={handleSubmit}
                disabled={submitting}
               
              >
                {submitting ? 'Submitting...' : 'Yes, Submit'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TestInterface;