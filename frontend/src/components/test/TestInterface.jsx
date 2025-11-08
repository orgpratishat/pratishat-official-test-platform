import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTestStore } from '../../store/testStore';
import { useAttemptStore } from '../../store/attemptStore';
import { useTimer } from '../../hooks/useTimer';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { Clock, ChevronLeft, ChevronRight, Flag, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { formatTime } from '../../utils/formatters';
import toast from 'react-hot-toast';

// TestInstructions Component
const TestInstructions = ({ test, onStartTest, onBack }) => {
  const instructions = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Time Limit",
      content: `You have ${test?.duration || 180} minutes to complete this test. The timer will start once you begin and cannot be paused.`
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Test Structure",
      content: `This test contains ${test?.totalQuestions || 0} questions across ${test?.subjects?.length || 3} subjects: ${test?.subjects?.join(', ') || 'Physics, Chemistry, Biology'}.`
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Navigation",
      content: "Use the Next and Previous buttons to navigate between questions. You can also use the question palette to jump to any question directly."
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Marking System",
      content: "Mark questions for review if you want to come back to them later. Use the flag icon to mark/unmark questions."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Answering Questions",
      content: "Click on any option to select your answer. You can change your answer anytime before submission."
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Submission",
      content: "Once you submit the test, you cannot make any changes. Make sure to review all questions before submitting."
    }
  ];

  const importantNotes = [
    "Do not refresh the page or close the browser during the test as it may lead to loss of progress.",
    "All questions are mandatory, but you can choose to skip and come back later.",
    "Use the question palette to track your progress - answered, unanswered, and marked questions.",
    "The test will auto-submit when time expires.",
    "Ensure you have a stable internet connection throughout the test."
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{test?.name}</h1>
          <p className="text-lg text-gray-600">Please read all instructions carefully before starting</p>
        </div>

        <Card className="p-6 mb-6">
          {/* Test Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{test?.duration || 180} mins</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{test?.totalQuestions || 0}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{test?.subjects?.length || 3}</div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Instructions</h2>
            <div className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-4 p-3 bg-white rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {instruction.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{instruction.title}</h3>
                    <p className="text-gray-600 text-sm">{instruction.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h2>
            <div className="space-y-2">
              {importantNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <p className="text-gray-600 text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="agreement"
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                I have read and understood all the instructions mentioned above. I agree to follow all the test rules and regulations.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={onBack}
              className="min-w-[120px]"
            >
              Go Back
            </Button>
            <Button
              onClick={onStartTest}
              className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
            >
              Start Test
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

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
    <div className="">
      {/* Question Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Question {questionNumber}
          </h3>
          
        </div>
       <Button
  variant={isMarkedForReview ? "secondary" : "outline"}
  size="sm"
  onClick={onToggleReview}
  className={`
    flex items-center gap-2 transition-all duration-300 ease-in-out
    ${isMarkedForReview 
      ? 'bg-purple-500 text-white shadow-md hover:bg-purple-600 ' 
      : 'bg-white text-purple-500 border-purple-300 hover:bg-purple-50 hover:border-purple-500 hover:text-purple-600'
    }
    font-medium rounded-md px-3 py-2 border-2
  `}
>
  <Flag className={`w-4 h-4 transition-colors duration-300 ${isMarkedForReview ? 'text-white' : 'text-purple-500'}`} />
  {isMarkedForReview ? 'Marked' : 'Mark for review'}
</Button>
      </div>

      {/* Question Text - Using SafeHTML for formatted display */}
      <div className="mb-6">
        <SafeHTML 
          html={question.questionText} 
          className="text-lg text-gray-900 leading-relaxed"
        />
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
    </div>
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
  const [activeSubject, setActiveSubject] = useState('Biology');
  const [showInstructions, setShowInstructions] = useState(true); 
  const [testStarted, setTestStarted] = useState(false); 
  const [testStartTime, setTestStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetchTestQuestions(testId);
  }, [testId]);

  const duration = (currentTest?.duration || 180) * 60;

  // Custom timer implementation
  useEffect(() => {
    if (!testStarted || timeUp) return;

    // Initialize timer when test starts
    if (testStarted && timeLeft === 0) {
      setTimeLeft(duration);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          toast.error('Time up! Please submit your test');
          setShowConfirm(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, timeUp, duration]);

  useEffect(() => {
    if (testQuestions.length > 0 && testStarted) {
      const qid = testQuestions[currentIndex]._id;
      setStartTimes(prev => ({
        ...prev,
        [qid]: prev[qid] || Date.now()
      }));
    }
  }, [currentIndex, testQuestions, testStarted]);

  // Add function to handle test start
  const handleStartTest = () => {
    const agreementCheckbox = document.getElementById('agreement');
    if (!agreementCheckbox?.checked) {
      toast.error('Please accept the instructions to continue');
      return;
    }
    setTestStarted(true);
    setShowInstructions(false);
    setTestStartTime(Date.now());
    setTimeLeft(duration); // Initialize the timer with full duration
  };

  // Add function to handle back from instructions
  const handleBackFromInstructions = () => {
    navigate(-1);
  };

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

      const totalTimeSpent = testStartTime ? Math.floor((Date.now() - testStartTime) / 1000) : 0;

      const payload = {
        attemptType: currentTest.type,
        testId: testId,
        questions: testQuestions.map(q => q._id),
        responses: formatted,
        totalTimeSpent: totalTimeSpent
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

  // Show instructions if not started
  if (showInstructions) {
    return (
      <TestInstructions 
        test={{
          ...currentTest,
          totalQuestions: testQuestions.length,
          subjects: [...new Set(testQuestions.map(q => q.subject))].filter(Boolean)
        }}
        onStartTest={handleStartTest}
        onBack={handleBackFromInstructions}
      />
    );
  }

  const current = testQuestions[currentIndex];
  const total = testQuestions.length;
  const answered = Object.keys(responses).length;
  const reviewed = Object.values(marked).filter(Boolean).length;
  const unanswered = total - answered;

  // Get questions for active subject
  const subjectQuestions = testQuestions.filter(q => q.subject === activeSubject);
  
  // Get all unique subjects
  const subjects = [...new Set(testQuestions.map(q => q.subject))].filter(Boolean);
  const availableSubjects = subjects.length > 0 ? subjects : ['Physics', 'Chemistry', 'Biology'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 h-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className='flex gap-4'>
            <div>
              <span className='text-2xl font-bold text-primary-600'>Crack</span>
              <span className='text-2xl font-bold text-blue-600'>G</span>
              <div className='text-sm font-bold'>Mentor Dashboard</div>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div>
              <h1 className="text-xl font-bold">{currentTest?.name}</h1>
              <p className="text-sm text-gray-600">
                Question {currentIndex + 1} of {total}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className={`font-mono font-semibold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Button 
              variant="danger" 
              onClick={() => setShowConfirm(true)}
              disabled={!currentTest || submitting}
              className="cursor-pointer border bg-red-600 text-white hover:scale-95 transition-all duration-300 ease-in-out transform"
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
            <Button className="text-black" onClick={prev} disabled={currentIndex === 0}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button onClick={next} disabled={currentIndex === total - 1} className="text-black">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Enhanced Question Palette - Exactly like the image */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-24 max-h-[85vh] overflow-hidden flex flex-col">
            <h3 className="font-semibold mb-4 text-lg text-gray-800">Question Navigation</h3>
            
            {/* Subject Tabs - Horizontal like the image */}
            <div className="flex border-b mb-4">
              {availableSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`flex-1 py-2 font-medium text-sm transition-all duration-200 border-b-2 ${
                    activeSubject === subject
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            
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

            {/* Questions Grid - 5 columns exactly like the image */}
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
              <div className="grid grid-cols-5 gap-2">
                {subjectQuestions.map((q, index) => {
                  const globalIndex = testQuestions.findIndex(item => item._id === q._id);
                  const isCurr = globalIndex === currentIndex;
                  const isAns = responses[q._id] !== undefined;
                  const isRev = marked[q._id];
                  
                  return (
                    <button
                      key={q._id}
                      onClick={() => setCurrentIndex(globalIndex)}
                      className={`
                        w-10 h-10 rounded font-semibold text-sm transition-all duration-200
                        border relative
                        ${isCurr
                          ? 'bg-blue-500 text-white border-blue-600 shadow-md'
                          : isAns
                          ? 'bg-green-500 text-white border-green-600'
                          : isRev
                          ? 'bg-purple-500 text-white border-purple-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }
                        hover:scale-105
                      `}
                    >
                      {globalIndex + 1}
                      {/* Small indicator for marked questions */}
                      {isRev && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs border-t pt-3 mt-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded" />
                  <span>Marked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 rounded" />
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span>Current</span>
                </div>
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