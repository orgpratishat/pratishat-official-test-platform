




import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTestStore } from '../../store/testStore';
import { useAttemptStore } from '../../store/attemptStore';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import {  ChevronLeft, ChevronRight, Flag, BookOpen, CheckCircle, AlertCircle, X ,  
  FileText,
  Layers,
  Navigation,
  Send,
  PlayCircle,
  Zap,
  Headphones,
  Clock, 
  Shield,
  Check,
  Navigation as NavigationIcon,

 
} from 'lucide-react';
import toast from 'react-hot-toast';

// TestInstructions Component (unchanged)
const TestInstructions = ({ test, onStartTest, onBack }) => {
  const [agreementChecked, setAgreementChecked] = useState(false);

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
      icon: <Navigation className="w-5 h-5" />,
      title: "Navigation",
      content: "Use the Next and Previous buttons to navigate between questions. You can also use the question palette to jump to any question directly."
    },
    {
      icon: <Flag className="w-5 h-5" />,
      title: "Marking System",
      content: "Mark questions for review if you want to come back to them later. Use the flag icon to mark/unmark questions."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Answering Questions",
      content: "Click on any option to select your answer. You can change your answer anytime before submission."
    },
    {
      icon: <Send className="w-5 h-5" />,
      title: "Submission",
      content: "Once you submit the test, you cannot make any changes. Make sure to review all questions before submitting."
    }
  ];

  const importantNotes = [
    "Do not refresh the page or close the browser during the test as it may lead to loss of progress.",
    "All questions are mandatory, but you can choose to skip and come back later.",
    "Use the question palette to track your progress - answered, unanswered, and marked questions.",
    "The test will auto-submit when time expires, even if your device is switched off.",
    "Ensure you have a stable internet connection throughout the test for automatic saving."
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Fixed Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-1 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex-1 text-center px-4">
            <h1 className="text-xl md:text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              {test?.name || "Mock Test"}
            </h1>
            <p className="text-sm text-gray-600 hidden md:block">
              Read all instructions carefully before starting
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* Test Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">{test?.duration || 180} mins</div>
                          <div className="text-xs text-gray-600">Duration</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <FileText className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">{test?.totalQuestions || 0}</div>
                          <div className="text-xs text-gray-600">Total Questions</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Layers className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-gray-900">{test?.subjects?.length || 3}</div>
                          <div className="text-xs text-gray-600">Subjects</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                      <h2 className="text-xl font-bold text-gray-900">Test Instructions</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {instructions.map((instruction, index) => (
                        <div 
                          key={index} 
                          className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                              <div className="text-blue-600">
                                {instruction.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1 text-base">{instruction.title}</h3>
                              <p className="text-gray-600 text-xs leading-relaxed">{instruction.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                      <h2 className="text-xl font-bold text-gray-900">Important Notes</h2>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                      <div className="space-y-3">
                        {importantNotes.map((note, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-3 p-2 bg-white/70 rounded-lg backdrop-blur-sm"
                          >
                            <div className="flex-shrink-0 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                              <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                            </div>
                            <p className="text-gray-700 text-xs font-medium">{note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Action Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Agreement Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold text-gray-900">Declaration</h3>
                  </div>
                  
                  <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 mb-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={agreementChecked}
                          onChange={(e) => setAgreementChecked(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <span className="text-xs text-gray-700 leading-relaxed">
                        I have read and understood all the instructions mentioned above. I agree to follow all the test rules and regulations. I confirm that I will not use any unfair means during the test.
                      </span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={onStartTest}
                      disabled={!agreementChecked}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                        ${agreementChecked 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                          : 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-80'
                        }`}
                    >
                      <PlayCircle className="w-4 h-4" />
                      Start Test Now
                    </button>
                  </div>

                  {/* Quick Tips */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-amber-500" />
                      Quick Tips
                    </h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>Use full-screen for better focus</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>Keep water nearby</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>Use rough paper for calculations</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Support Card */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Headphones className="w-5 h-5 text-blue-300" />
                    <h3 className="text-base font-bold">Need Help?</h3>
                  </div>
                  <p className="text-xs text-gray-300 mb-3">
                    Having issues or questions about the test? Our support team is here to help.
                  </p>
                  <button className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 text-xs font-medium transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="max-w-full mx-auto text-center">
          <p className="text-xs text-gray-500">
            © 2024 EduTest Platform. All rights reserved. • Test content is confidential.
          </p>
        </div>
      </div>
    </div>
  );
};


// Format text for display
export const formatTextWithHTML = (text) => {
  if (!text) return '';
  return text
    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
    .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
};

// Safe HTML component
const SafeHTML = ({ html, className = '' }) => {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: formatTextWithHTML(html) }}
    />
  );
};

// Loader Component for Submission
const SubmissionLoader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full p-8 flex flex-col items-center">
        <Spinner size={48} className="mb-4" />
        <h2 className="text-xl font-bold mb-2 text-gray-900">Submitting Test</h2>
        <p className="text-gray-600 text-center">
          Please wait while we process your submission. This may take a few moments...
        </p>
      </Card>
    </div>
  );
};

// Premium Timer Component with Server Sync
const PremiumTimer = ({ timeLeft, totalTime, isSyncing = false, serverStatus = 'connected' }) => {
  const progress = (timeLeft / totalTime) * 100;
  const isWarning = timeLeft < 300; // 5 minutes
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center gap-3 px-4 py-3 text-black">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Clock className={`w-5 h-5 ${isWarning ? 'text-red-400 animate-pulse' : 'text-blue-400'} ${isSyncing ? 'animate-spin' : ''}`} />
        </div>
        {isWarning && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        )}
        {isSyncing && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-[140px]">
        <div className="flex justify-between items-center mb-1">
          <span className={`font-mono text-sm font-bold  tracking-wider ${
            isWarning ? 'text-red-400 animate-pulse' : 'text-black'
          }`}>
            {formatTime(timeLeft)}
          </span>
          <div className="flex flex-col items-end">
            {isSyncing && (
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded mb-1">Syncing...</span>
            )}
            {/* <span className={`text-xs px-2 py-1 rounded ${
              serverStatus === 'connected' 
                ? 'text-green-600 bg-green-100' 
                : serverStatus === 'client'
                ? 'text-yellow-600 bg-yellow-100'
                : 'text-red-600 bg-red-100'
            }`}>
              {serverStatus === 'connected' ? 'Server Connected' : 
               serverStatus === 'client' ? 'Client Timer' : 'Server Error'}
            </span> */}
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
              isWarning 
                ? 'bg-gradient-to-r from-red-500 to-red-400' 
                : 'bg-gradient-to-r from-green-500 to-blue-400'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// FIXED SHUFFLE UTILITY FUNCTIONS
// =============================================

// Generate compressed shuffled option orders (save as string to reduce size)
const generateShuffledOrders = (questions) => {
  const shuffledOrders = {};
  
  questions.forEach(question => {
    if (!question.options || question.options.length === 0) return;
    
    const optionCount = question.options.length;
    const order = Array.from({ length: optionCount }, (_, i) => i);
    
    // Fisher-Yates shuffle algorithm
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    
    // Create reverse lookup map - FIXED LOGIC
    const reverseOrder = Array.from({ length: optionCount }, (_, i) => order[i]);
    
    // Store in compact format: string of numbers
    // 'o' = order array (maps shuffled position → original index)
    shuffledOrders[question._id] = {
      o: order.join(','),          // order[shuffledPosition] = originalIndex
    };
  });
  
  return shuffledOrders;
};

// FIXED: Get original index from shuffled index
const getOriginalOptionIndex = (questionId, shuffledIndex, shuffledOrders) => {
  if (!shuffledOrders[questionId] || shuffledIndex === null || shuffledIndex === undefined) {
    return shuffledIndex;
  }
  
  try {
    const orderStr = shuffledOrders[questionId].o;
    const order = orderStr.split(',').map(Number);
    // order[shuffledPosition] = originalIndex
    return order[shuffledIndex] !== undefined ? order[shuffledIndex] : shuffledIndex;
  } catch (error) {
    console.error('Error parsing order:', error);
    return shuffledIndex;
  }
};

// FIXED: Get shuffled index from original index
const getShuffledOptionIndex = (questionId, originalIndex, shuffledOrders) => {
  if (!shuffledOrders[questionId] || originalIndex === null || originalIndex === undefined) {
    return originalIndex;
  }
  
  try {
    const orderStr = shuffledOrders[questionId].o;
    const order = orderStr.split(',').map(Number);
    // Find which shuffled position contains this original index
    return order.indexOf(originalIndex);
  } catch (error) {
    console.error('Error finding shuffled position:', error);
    return originalIndex;
  }
};

// Get shuffled options for display
const getShuffledOptions = (question, shuffledOrders) => {
  if (!question || !question.options || !shuffledOrders[question._id]) {
    return question?.options || [];
  }
  
  try {
    const orderStr = shuffledOrders[question._id].o;
    const order = orderStr.split(',').map(Number);
    return order.map(originalIndex => ({
      ...question.options[originalIndex],
      originalIndex: originalIndex
    }));
  } catch (error) {
    console.error('Error getting shuffled options:', error);
    return question?.options || [];
  }
};

// Save shuffled orders with size check
const saveShuffledOrders = (testId, orders) => {
  try {
    const dataStr = JSON.stringify(orders);
    
    // Check if data is too large (localStorage limit is usually 5MB)
    if (dataStr.length > 4 * 1024 * 1024) { // 4MB limit
      console.warn('Shuffled orders too large for localStorage, storing in memory only');
      return false;
    }
    
    localStorage.setItem(`shuffled-orders-${testId}`, dataStr);
    console.log('✅ [SHUFFLE] Saved orders to localStorage, size:', dataStr.length, 'bytes');
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded, storing in memory only');
      return false;
    }
    console.error('Error saving shuffled orders:', error);
    return false;
  }
};

// Load shuffled orders from localStorage
const loadShuffledOrders = (testId) => {
  try {
    const stored = localStorage.getItem(`shuffled-orders-${testId}`);
    if (stored) {
      console.log('📥 [SHUFFLE] Loaded orders from localStorage');
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading shuffled orders:', error);
  }
  return null;
};

// =============================================
// FIXED Shuffled QuestionCard Component
// =============================================
const ShuffledQuestionCard = ({ 
  question, 
  questionNumber, 
  selectedOption, // This is the ORIGINAL index
  onSelectOption, 
  onClearOption,
  isMarkedForReview, 
  onToggleReview,
  shuffledOrders 
}) => {
  const shuffledOptions = getShuffledOptions(question, shuffledOrders);
  
  // Convert selected option (original index) to shuffled index for display
  const getShuffledSelectedIndex = () => {
    if (selectedOption === undefined || selectedOption === null) return undefined;
    return getShuffledOptionIndex(question._id, selectedOption, shuffledOrders);
  };
  
  const shuffledSelectedIndex = getShuffledSelectedIndex();
  
  return (
    <div className="">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Question {questionNumber}
          </h3>
        </div>
        <div className="flex gap-2">
          {selectedOption !== undefined && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearOption}
              className="flex items-center gap-2 transition-all duration-300 ease-in-out bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 font-medium rounded-md px-3 py-2 border-2"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
          
          <Button
            variant={isMarkedForReview ? "secondary" : "outline"}
            size="sm"
            onClick={onToggleReview}
            className={`flex items-center gap-2 transition-all duration-300 ease-in-out
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
      </div>

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

      <div className="space-y-3">
        {shuffledOptions.map((option, shuffledIndex) => {
          const optionLetter = String.fromCharCode(65 + shuffledIndex);
          
          return (
            <div
              key={shuffledIndex}
              onClick={() => onSelectOption(shuffledIndex)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                shuffledSelectedIndex === shuffledIndex
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  shuffledSelectedIndex === shuffledIndex
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 bg-white text-gray-600'
                }`}>
                  {optionLetter}
                </div>
                
                <div className="flex-1">
                  <SafeHTML 
                    html={option.optionText} 
                    className="text-gray-900 leading-relaxed"
                  />
                  
                  {option.optionImage && (
                    <div className="mt-2">
                      <img 
                        src={option.optionImage} 
                        alt={`Option ${optionLetter}`}
                        className="max-w-full h-auto max-h-48 object-contain rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Navigation Buttons
const NavigationButtons = ({ 
  onPrev, 
  onNext, 
  prevDisabled, 
  nextDisabled 
}) => {
  return (
    <div className="fixed bottom-0 right-[1vw] transform -translate-x-4/12 flex gap-4 items-center justify-between w-[73vw] z-40">
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        className={`group relative flex items-center gap-3 px-3 py-3 font-semibold rounded-xl text-sm transition-all duration-300 ease-out transform ${
          prevDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'text-black shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 text-sm'
        }`}
      >
        <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-black" />
        <span className="relative text-sm text-black">
          Previous
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </button>

      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`group relative flex items-center gap-3 px-8 py-3 font-semibold rounded-xl transition-all duration-300 ease-out transform ${
          nextDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'text-white shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95'
        }`}
      >
        <span className="relative text-sm text-black">
          Next
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>
        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-black" />
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </button>
    </div>
  );
};

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { 
    currentTest, 
    testQuestions, 
    loading, 
    fetchTestQuestions, 
    startTestSession, 
    saveTestProgress 
  } = useTestStore();
  const { submit, loading: submitting } = useAttemptStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [marked, setMarked] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [activeSubject, setActiveSubject] = useState('Biology');
  const [showInstructions, setShowInstructions] = useState(true); 
  const [testStarted, setTestStarted] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [serverEndTime, setServerEndTime] = useState(null);
  const [serverStatus, setServerStatus] = useState('connected');
  
  // State for shuffled option orders
  const [shuffledOrders, setShuffledOrders] = useState({});
  
  // Refs
  const timerRef = useRef(null);
  const saveIntervalRef = useRef(null);
  const lastSaveRef = useRef(0);
  
  // CRITICAL FIX: Add refs to capture current state
  const responsesRef = useRef(responses);
  const markedRef = useRef(marked);
  const shuffledOrdersRef = useRef(shuffledOrders);

  // UPDATE REFS WHEN STATE CHANGES
  useEffect(() => {
    responsesRef.current = responses;
  }, [responses]);

  useEffect(() => {
    markedRef.current = marked;
  }, [marked]);

  useEffect(() => {
    shuffledOrdersRef.current = shuffledOrders;
  }, [shuffledOrders]);

  // Debug log
  console.log('🔍 [FRONTEND] TestInterface rendered', {
    testStarted,
    testId,
    questionsCount: testQuestions.length,
    shuffledOrdersCount: Object.keys(shuffledOrders).length
  });

  useEffect(() => {
    fetchTestQuestions(testId);
  }, [testId, fetchTestQuestions]);

  // FIXED: Generate shuffled orders with localStorage quota check
  useEffect(() => {
    if (testQuestions.length > 0 && Object.keys(shuffledOrders).length === 0) {
      console.log('🔀 [SHUFFLE] Generating shuffled option orders...');
      
      // Try to load from localStorage first
      const storedOrders = loadShuffledOrders(testId);
      if (storedOrders) {
        console.log('📥 [SHUFFLE] Loaded orders from localStorage');
        setShuffledOrders(storedOrders);
      } else {
        // Generate new orders
        const orders = generateShuffledOrders(testQuestions);
        setShuffledOrders(orders);
        
        // Try to save to localStorage (will fail gracefully if quota exceeded)
        saveShuffledOrders(testId, orders);
        console.log('✅ [SHUFFLE] Generated orders for', Object.keys(orders).length, 'questions');
      }
    }
  }, [testQuestions, testId]);

  const duration = (currentTest?.duration || 180) * 60;

  // SERVER-SIDE TIMER IMPLEMENTATION
  useEffect(() => {
    if (!testStarted || timeUp) return;

    console.log('🕒 [FRONTEND] Initializing server timer...');

    const initializeServerTimer = async () => {
      try {
        console.log('🎯 [FRONTEND] Starting server session...');
        
        // Start server session
        const session = await startTestSession(testId);
        const serverEndTime = new Date(session.endTime);
        setServerEndTime(serverEndTime);
        
        console.log('✅ [FRONTEND] Server session started:', {
          serverEndTime: serverEndTime.toISOString(),
          clientTime: new Date().toISOString(),
          duration: duration + ' seconds'
        });
        
        // Function to calculate time remaining from server
        const calculateTimeRemaining = () => {
          const now = new Date();
          const timeRemaining = Math.max(0, Math.floor((serverEndTime - now) / 1000));
          return timeRemaining;
        };

        // Initial time calculation
        const initialTimeRemaining = calculateTimeRemaining();
        setTimeLeft(initialTimeRemaining);

        // Start server-synced timer
        timerRef.current = setInterval(() => {
          const newTimeLeft = calculateTimeRemaining();
          setTimeLeft(newTimeLeft);
          
          if (newTimeLeft <= 0) {
            console.log('⏰ [FRONTEND] Time expired on server');
            handleAutoSubmit();
          }
        }, 1000);
        
        // Start periodic saving
        startPeriodicSaving();

        setServerStatus('connected');

      } catch (error) {
        console.error('❌ [FRONTEND] Failed to initialize server timer:', error);
        setServerStatus('error');
        toast.error('Failed to connect to server timer. Using client timer as fallback.');
        initializeClientTimer();
      }
    };

    const initializeClientTimer = () => {
      console.log('🕒 [FRONTEND] Starting client-side timer fallback...');
      const startTime = Date.now();
      const endTime = startTime + (duration * 1000);
      setServerEndTime(new Date(endTime));
      
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const timeRemaining = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(timeRemaining);
        
        if (timeRemaining <= 0) {
          handleAutoSubmit();
        }
      }, 1000);
      
      startPeriodicSaving();
      setServerStatus('client');
    };

    initializeServerTimer();

    // Setup beforeunload handler
    const handleBeforeUnload = (e) => {
      saveProgressToServer();
      e.preventDefault();
      e.returnValue = 'Your test progress will be saved. Are you sure you want to leave?';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testStarted, timeUp, testId, duration, startTestSession]);

  const startPeriodicSaving = () => {
    saveIntervalRef.current = setInterval(() => {
      if (Date.now() - lastSaveRef.current > 25000) { // Throttle to 25 seconds
        saveProgressToServer();
      }
    }, 30000); // Check every 30 seconds
  };

  const saveProgressToServer = async () => {
    if (isSyncing || timeUp) return;

    console.log('💾 [FRONTEND] Saving progress to server...', {
      responsesCount: Object.keys(responses).length,
      markedCount: Object.keys(marked).length,
      currentIndex
    });
    
    setIsSyncing(true);
    try {
      await saveTestProgress(testId, {
        responses,
        marked,
        currentQuestionIndex: currentIndex
      });
      
      // Update localStorage as backup (only save critical data)
      try {
        const criticalData = {
          responses,
          marked,
          lastSave: Date.now(),
          serverEndTime: serverEndTime?.toISOString()
        };
        localStorage.setItem(`test-${testId}`, JSON.stringify(criticalData));
      } catch (storageError) {
        console.warn('Could not save to localStorage:', storageError);
      }
      
      lastSaveRef.current = Date.now();
      console.log('✅ [FRONTEND] Progress saved to server');
      
    } catch (error) {
      if (error.message === 'TIME_EXPIRED') {
        console.log('⏰ [FRONTEND] Server reported time expired');
        handleAutoSubmit();
      } else {
        console.error('❌ [FRONTEND] Failed to save progress:', error);
        // Save to localStorage as fallback
        try {
          const criticalData = {
            responses,
            marked,
            lastSave: Date.now(),
            serverEndTime: serverEndTime?.toISOString()
          };
          localStorage.setItem(`test-${testId}`, JSON.stringify(criticalData));
        } catch (storageError) {
          console.warn('Could not save to localStorage:', storageError);
        }
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // UPDATED: Auto-submit with proper response capture
  const handleAutoSubmit = async () => {
    if (timeUp) return;
    
    console.log('🚀 [FRONTEND] Starting auto-submission...');
    
    // CAPTURE CURRENT STATE USING REFS
    const currentResponses = responsesRef.current;
    const currentMarked = markedRef.current;
    
    console.log('🔍 [AUTO_SUBMIT_DEBUG] Captured responses:', {
      responsesCount: Object.keys(currentResponses).length,
      markedCount: Object.keys(currentMarked).length
    });
    
    setTimeUp(true);
    
    // Clear intervals
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (saveIntervalRef.current) {
      clearInterval(saveIntervalRef.current);
      saveIntervalRef.current = null;
    }
    
    toast.error('Time is up! Your test is being submitted automatically.');
    
    try {
      // SUBMIT WITH CAPTURED RESPONSES
      await submitTest(currentResponses, currentMarked);
    } catch (error) {
      console.error('❌ [FRONTEND] Auto-submit failed:', error);
      toast.error('Auto-submission failed. Please submit manually.');
      setShowConfirm(true);
    }
  };

  // Save progress when responses or marked state changes
  useEffect(() => {
    if (testStarted && !timeUp) {
      const shouldSave = Date.now() - lastSaveRef.current > 5000;
      if (shouldSave) {
        // Add small delay to avoid race with session creation
        setTimeout(() => {
          saveProgressToServer();
        }, 1000);
      }
    }
  }, [responses, marked, testStarted, timeUp]);

  const handleStartTest = async () => {
    console.log('🎯 [FRONTEND] Starting test session...');
    console.log('📞 [FRONTEND] Calling startTestSession with testId:', testId);
    
    try {
      console.log('🕒 [FRONTEND] Calling startTestSession API...');
      
      // Call the store method
      const session = await startTestSession(testId);
      
      console.log('✅ [FRONTEND] Store method successful - Session:', session);
      
      if (!session) {
        throw new Error('No session data returned from store');
      }
      
      // Validate session has required fields
      if (!session.startTime || !session.endTime) {
        console.error('❌ [FRONTEND] Session missing required fields:', session);
        throw new Error('Invalid session data received from server');
      }
      
      console.log('✅ [FRONTEND] Session validated:', {
        startTime: session.startTime,
        endTime: session.endTime,
        serverTime: session.serverTime
      });
      
      // Now set the test as started
      setTestStarted(true);
      setShowInstructions(false);
      
      // Clean up old localStorage data
      try {
        localStorage.removeItem(`test-${testId}`);
      } catch (error) {
        console.warn('Could not clean localStorage:', error);
      }
      
      console.log('🚀 [FRONTEND] Test interface started with server timer');
      
    } catch (error) {
      console.error('❌ [FRONTEND] Failed to start test session:', {
        message: error.message,
        testId
      });
      
      let errorMessage = error.message || 'Failed to start test session';
      
      // Provide more specific error messages
      if (error.message.includes('404')) {
        errorMessage = 'Test not found. Please check the test ID.';
      } else if (error.message.includes('401')) {
        errorMessage = 'Authentication failed. Please log in again.';
      } else if (error.message.includes('No response')) {
        errorMessage = 'Server not responding. Please check your connection.';
      }
      
      toast.error(errorMessage);
    }
  };

  const handleBackFromInstructions = () => {
    navigate(-1);
  };

  // FIXED: selectOption now handles shuffled indices correctly
  const selectOption = (shuffledIndex) => {
    const qid = testQuestions[currentIndex]._id;
    const originalIndex = getOriginalOptionIndex(qid, shuffledIndex, shuffledOrders);
    
    console.log('🎯 [SHUFFLE] Option selected:', {
      questionId: qid,
      shuffledIndex,
      originalIndex,
      shuffledText: testQuestions[currentIndex].options[originalIndex]?.optionText?.substring(0, 50)
    });
    
    setResponses(r => ({ ...r, [qid]: originalIndex }));
  };

  const clearOption = () => {
    const qid = testQuestions[currentIndex]._id;
    setResponses(r => {
      const newResponses = { ...r };
      delete newResponses[qid];
      return newResponses;
    });
  };

  const toggleReview = () => {
    const qid = testQuestions[currentIndex]._id;
    setMarked(m => ({ ...m, [qid]: !m[qid] }));
  };

  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));
  const next = () => setCurrentIndex(i => Math.min(i + 1, testQuestions.length - 1));

  // UPDATED: submitTest now accepts parameters for auto-submit
  const submitTest = async (responsesData = responses, markedData = marked) => {
    console.log('🎯 [SUBMIT_TEST] Starting submission process');
    
    console.log('🔍 [SUBMIT_DEBUG] Submitting with:', {
      responsesCount: Object.keys(responsesData).length,
      markedCount: Object.keys(markedData).length,
      testQuestionsCount: testQuestions.length
    });

    if (!currentTest || !currentTest.type) {
      toast.error('Test not loaded properly. Please refresh the page.');
      setShowConfirm(false);
      setShowLoader(false);
      return;
    }

    setShowLoader(true);

    try {
      // IMPORTANT: Responses contain ORIGINAL indices (correctly mapped from shuffled)
      const formatted = testQuestions.map(q => ({
        questionId: q._id,
        selectedOption: responsesData[q._id] !== undefined ? responsesData[q._id] : null,
        timeSpent: 0,
        isMarkedForReview: markedData[q._id] || false
      }));

      console.log('📤 [SUBMIT_FORMATTED] Formatted responses:', formatted.length);
      console.log('📤 [SUBMIT_SAMPLE] Sample response:', formatted[0]);

      const totalTimeSpent = duration - timeLeft;

      const payload = {
        attemptType: currentTest.type,
        testId: testId,
        questions: testQuestions.map(q => q._id),
        responses: formatted,
        totalTimeSpent: Math.max(0, totalTimeSpent)
      };

      console.log('📤 [SUBMIT_PAYLOAD] Final payload prepared');

      const result = await submit(payload);
      
      // Clean up localStorage on successful submit
      try {
        localStorage.removeItem(`test-${testId}`);
        localStorage.removeItem(`shuffled-orders-${testId}`);
      } catch (error) {
        console.warn('Could not clean localStorage:', error);
      }

      if (result && result.success) {
        console.log('✅ [FRONTEND] Test submitted successfully');
        toast.success('Test submitted successfully!');
        const attemptId = result.attempt?._id || result._id;
        navigate(`/test-result/${attemptId}`, { 
          state: { 
            submissionResult: result,
            timeSpentData: formatted
          }
        });
      } else {
        console.error('❌ [FRONTEND] Submission failed:', result);
        toast.error('Submission failed');
      }
    } catch (error) {
      console.error('❌ [FRONTEND] Submit error:', error);
      toast.error(error.message || 'Failed to submit test');
    } finally {
      setShowLoader(false);
    }
  };

  const handleSubmit = async () => {
    await submitTest();
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed height */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 h-20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          <div className='flex gap-4 items-center'>
                   <div 
          onClick={() => navigate('/landing')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <span className="text-white font-bold text-lg">≋</span>
          </div>
          <span className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
            Med<span className="text-purple-600">Destiny</span>
          </span>
        </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div>
              <h1 className="text-md font-bold">{currentTest?.name}</h1>
              <p className="text-sm text-gray-600">
                Question {currentIndex + 1} of {total}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <PremiumTimer 
              timeLeft={timeLeft} 
              totalTime={duration} 
              isSyncing={isSyncing}
              serverStatus={serverStatus}
            />
         
              
              <button
  onClick={() => setShowConfirm(true)}
  disabled={!currentTest || submitting}
  className="group relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
>
  {/* Animated gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  {/* Shimmer effect */}
  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
  
  {/* Content */}
  <div className="relative flex items-center justify-center gap-3">
    <span className="text-sm tracking-tight">
      {submitting ? 'Submitting...' : 'Submit Test'}
    </span>
    
   
  </div>
  
  {/* Glow effect */}
  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
</button>


          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col mx-auto w-full">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4">
          {/* Question Panel - Scrollable */}
          <div className="lg:col-span-3 flex flex-col max-h-[80vh]">
            <Card className="flex-1 flex flex-col min-h-0 p-6">
              <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
                {/* Use ShuffledQuestionCard when shuffledOrders are available */}
                {Object.keys(shuffledOrders).length > 0 ? (
                  <ShuffledQuestionCard
                    question={current}
                    questionNumber={currentIndex + 1}
                    selectedOption={responses[current._id]}
                    onSelectOption={selectOption}
                    onClearOption={clearOption}
                    isMarkedForReview={marked[current._id]}
                    onToggleReview={toggleReview}
                    shuffledOrders={shuffledOrders}
                  />
                ) : (
                  // Fallback to simple display if shuffled orders not ready yet
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Question {currentIndex + 1}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        {responses[current._id] !== undefined && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearOption}
                            className="flex items-center gap-2 transition-all duration-300 ease-in-out bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 font-medium rounded-md px-3 py-2 border-2"
                          >
                            <X className="w-4 h-4" />
                            Clear
                          </Button>
                        )}
                        
                        <Button
                          variant={marked[current._id] ? "secondary" : "outline"}
                          size="sm"
                          onClick={toggleReview}
                          className={`flex items-center gap-2 transition-all duration-300 ease-in-out
                            ${marked[current._id] 
                              ? 'bg-purple-500 text-white shadow-md hover:bg-purple-600 ' 
                              : 'bg-white text-purple-500 border-purple-300 hover:bg-purple-50 hover:border-purple-500 hover:text-purple-600'
                            }
                            font-medium rounded-md px-3 py-2 border-2
                          `}
                        >
                          <Flag className={`w-4 h-4 transition-colors duration-300 ${marked[current._id] ? 'text-white' : 'text-purple-500'}`} />
                          {marked[current._id] ? 'Marked' : 'Mark for review'}
                        </Button>
                      </div>
                    </div>
                    <div className="text-center py-8">
                      <Spinner size={32} />
                      <p className="text-gray-600 mt-2">Loading question options...</p>
                    </div>
                  </div>
                )}

                <NavigationButtons 
                  onPrev={prev}
                  onNext={next}
                  prevDisabled={currentIndex === 0}
                  nextDisabled={currentIndex === total - 1}
                />
              </div>
            </Card>
          </div>

          {/* Enhanced Question Palette - Scrollable */}
          <div className="lg:col-span-1 flex flex-col max-h-[87vh]">
            <Card className="flex-1 flex flex-col min-h-0 p-4">
              <h3 className="font-semibold mb-4 text-lg text-gray-800">Question Navigation</h3>
              
              {/* Subject Tabs */}
              <div className="flex border-b mb-4 flex-shrink-0">
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
              <div className="grid grid-cols-3 gap-2 mb-4 flex-shrink-0">
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

              {/* Questions Grid - Scrollable */}
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
                        className={`w-10 h-10 rounded font-semibold text-sm transition-all duration-200 border relative ${
                          isCurr
                            ? 'bg-blue-500 text-white border-blue-600 shadow-md'
                            : isAns
                            ? 'bg-green-500 text-white border-green-600'
                            : isRev
                            ? 'bg-purple-500 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        } hover:scale-105`}
                      >
                        {globalIndex + 1}
                        {isRev && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs border-t pt-3 mt-2 flex-shrink-0">
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

      {/* Submission Loader */}
      {showLoader && <SubmissionLoader />}
    </div>
  );
};



export default TestInterface;