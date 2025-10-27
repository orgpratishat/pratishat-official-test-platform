// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getDPPById } from '../../services/dppService';
// import Card from '../ui/Card';
// import Button from '../ui/Button';
// import Spinner from '../ui/Spinner';
// import Badge from '../ui/Badge';
// import { 
//   Clock, 
//   BookOpen, 
//   Target, 
//   ArrowLeft, 
//   Flag,
//   CheckCircle,
//   ChevronLeft,
//   ChevronRight,
//   Send
// } from 'lucide-react';
// import toast from 'react-hot-toast';

// const DPPTestPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [dpp, setDpp] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [testStarted, setTestStarted] = useState(false);
//   const [testSubmitted, setTestSubmitted] = useState(false);
//   const [timer, setTimer] = useState(null);

//   useEffect(() => {
//     loadDPP();
//   }, [id]);

//   useEffect(() => {
//     if (testStarted && timeLeft > 0) {
//       const timerId = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1) {
//             handleAutoSubmit();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       setTimer(timerId);

//       return () => clearInterval(timerId);
//     }
//   }, [testStarted, timeLeft]);

//   const loadDPP = async () => {
//     setLoading(true);
//     try {
//       const response = await getDPPById(id);
//       setDpp(response.dpp);
//       setTimeLeft(response.dpp.duration * 60); // Convert minutes to seconds
//     } catch (error) {
//       toast.error('Failed to load DPP');
//       navigate('/dpp');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startTest = () => {
//     setTestStarted(true);
//   };

//   const handleAnswerSelect = (questionId, optionIndex) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: optionIndex
//     }));
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < dpp.questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleQuestionNavigation = (index) => {
//     setCurrentQuestionIndex(index);
//   };

//   const handleAutoSubmit = () => {
//     if (timer) clearInterval(timer);
//     submitTest();
//     toast('Time\'s up! Test submitted automatically.');
//   };

//   const submitTest = () => {
//     if (timer) clearInterval(timer);
//     setTestSubmitted(true);
//     // Calculate score and show results
//     calculateResults();
//   };

//   const calculateResults = () => {
//     if (!dpp) return;

//     let score = 0;
//     let correctAnswers = 0;
//     let attempted = 0;

//     dpp.questions.forEach(question => {
//       const userAnswer = answers[question._id];
//       if (userAnswer !== undefined) {
//         attempted++;
//         const selectedOption = question.options[userAnswer];
//         if (selectedOption.isCorrect) {
//           correctAnswers++;
//           score += dpp.markingScheme.positiveMarks;
//         } else {
//           score -= dpp.markingScheme.negativeMarks;
//         }
//       }
//     });

//     return {
//       score: Math.max(0, score),
//       correctAnswers,
//       attempted,
//       totalQuestions: dpp.questions.length,
//       percentage: (score / (dpp.questions.length * dpp.markingScheme.positiveMarks)) * 100
//     };
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const currentQuestion = dpp?.questions[currentQuestionIndex];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   if (!dpp) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <Card className="p-12 text-center">
//           <p className="text-gray-500">DPP not found</p>
//           <Button onClick={() => navigate('/dpp')} className="mt-4 bg-red-400">
//             Back to DPPs
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   if (!testStarted) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <div className="mb-6">
//           <Button variant="outline" onClick={() => navigate('/dpp')}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to DPPs
//           </Button>
//         </div>

//         <Card className="p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">{dpp.title}</h1>
//             <p className="text-gray-600 text-lg">{dpp.description}</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                 <BookOpen className="w-6 h-6 text-blue-600" />
//                 <div>
//                   <p className="font-semibold">Total Questions</p>
//                   <p className="text-gray-600">{dpp.questions.length}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                 <Clock className="w-6 h-6 text-green-600" />
//                 <div>
//                   <p className="font-semibold">Duration</p>
//                   <p className="text-gray-600">{dpp.duration} minutes</p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                 <Target className="w-6 h-6 text-purple-600" />
//                 <div>
//                   <p className="font-semibold">Total Marks</p>
//                   <p className="text-gray-600">{dpp.totalMarks}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                 <Flag className="w-6 h-6 text-orange-600" />
//                 <div>
//                   <p className="font-semibold">Marking Scheme</p>
//                   <p className="text-gray-600">
//                     +{dpp.markingScheme.positiveMarks}/-{dpp.markingScheme.negativeMarks}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <h3 className="text-lg font-semibold mb-4">Instructions</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li>• This test contains {dpp.questions.length} questions</li>
//               <li>• You have {dpp.duration} minutes to complete the test</li>
//               <li>• Each correct answer awards {dpp.markingScheme.positiveMarks} marks</li>
//               <li>• Each wrong answer deducts {dpp.markingScheme.negativeMarks} marks</li>
//               <li>• Unattempted questions carry no marks</li>
//               <li>• Use the navigation to move between questions</li>
//               <li>• Timer will be shown during the test</li>
//             </ul>
//           </div>

//           <div className="flex justify-center mt-8">
//             <Button onClick={startTest} size="lg" className="bg-red-400 px-8 py-3">
//               Start Test
//             </Button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   if (testSubmitted) {
//     const results = calculateResults();
    
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <Card className="p-8">
//           <div className="text-center mb-8">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Submitted!</h1>
//             <p className="text-gray-600">You have completed {dpp.title}</p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <p className="text-2xl font-bold text-blue-600">{results.score.toFixed(1)}</p>
//               <p className="text-sm text-gray-600">Score</p>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <p className="text-2xl font-bold text-green-600">{results.correctAnswers}/{results.totalQuestions}</p>
//               <p className="text-sm text-gray-600">Correct</p>
//             </div>
//             <div className="text-center p-4 bg-purple-50 rounded-lg">
//               <p className="text-2xl font-bold text-purple-600">{results.attempted}</p>
//               <p className="text-sm text-gray-600">Attempted</p>
//             </div>
//             <div className="text-center p-4 bg-orange-50 rounded-lg">
//               <p className="text-2xl font-bold text-orange-600">{results.percentage.toFixed(1)}%</p>
//               <p className="text-sm text-gray-600">Percentage</p>
//             </div>
//           </div>

//           <div className="border-t pt-6">
//             <h3 className="text-lg font-semibold mb-4">Question-wise Analysis</h3>
//             <div className="grid grid-cols-5 gap-2 mb-4">
//               {dpp.questions.map((question, index) => {
//                 const userAnswer = answers[question._id];
//                 const isCorrect = userAnswer !== undefined && 
//                                  question.options[userAnswer]?.isCorrect;
//                 const isAttempted = userAnswer !== undefined;
                
//                 return (
//                   <button
//                     key={question._id}
//                     onClick={() => handleQuestionNavigation(index)}
//                     className={`p-3 rounded-lg text-sm font-medium ${
//                       isAttempted 
//                         ? isCorrect 
//                           ? 'bg-green-100 text-green-800 border-2 border-green-500'
//                           : 'bg-red-100 text-red-800 border-2 border-red-500'
//                         : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
//                     }`}
//                   >
//                     Q{index + 1}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="flex gap-4 justify-center mt-8">
//             <Button onClick={() => navigate('/dpp')} variant="outline">
//               Back to DPPs
//             </Button>
//             <Button onClick={() => window.location.reload()} className="bg-red-400">
//               Retry Test
//             </Button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-10 py-4 mb-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">{dpp.title}</h1>
//             <p className="text-gray-600 text-sm">Question {currentQuestionIndex + 1} of {dpp.questions.length}</p>
//           </div>
          
//           <div className="flex items-center gap-6">
//             <div className="text-center">
//               <div className={`text-2xl font-bold ${
//                 timeLeft < 300 ? 'text-red-600' : 'text-gray-900'
//               }`}>
//                 {formatTime(timeLeft)}
//               </div>
//               <div className="text-xs text-gray-500">Time Left</div>
//             </div>
            
//             <Button onClick={submitTest} className="bg-red-400">
//               <Send className="w-4 h-4 mr-2" />
//               Submit Test
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Questions Navigation */}
//         <div className="lg:col-span-1">
//           <Card className="p-4 sticky top-20">
//             <h3 className="font-semibold mb-3">Questions</h3>
//             <div className="grid grid-cols-5 gap-2">
//               {dpp.questions.map((question, index) => {
//                 const isAnswered = answers[question._id] !== undefined;
//                 const isCurrent = index === currentQuestionIndex;
                
//                 return (
//                   <button
//                     key={question._id}
//                     onClick={() => handleQuestionNavigation(index)}
//                     className={`p-2 rounded text-xs font-medium ${
//                       isCurrent
//                         ? 'bg-red-400 text-white border-2 border-red-500'
//                         : isAnswered
//                         ? 'bg-green-100 text-green-800 border-2 border-green-500'
//                         : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 );
//               })}
//             </div>
            
//             <div className="mt-4 pt-4 border-t">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="w-3 h-3 bg-green-100 border-2 border-green-500 rounded"></div>
//                 <span className="text-xs text-gray-600">Answered</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gray-100 border-2 border-gray-300 rounded"></div>
//                 <span className="text-xs text-gray-600">Unanswered</span>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Question Content */}
//         <div className="lg:col-span-3">
//           <Card className="p-6">
//             {/* Question Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <Badge text={currentQuestion.subject} />
//                 <Badge text={currentQuestion.difficulty} />
//                 <Badge text={`Marks: ${dpp.markingScheme.positiveMarks}`} />
//               </div>
//               <div className="text-sm text-gray-500">
//                 Question {currentQuestionIndex + 1}/{dpp.questions.length}
//               </div>
//             </div>

//             {/* Question Text */}
//             <div className="mb-6">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">
//                 {currentQuestion.questionText}
//               </h3>
              
//               {currentQuestion.questionImage && (
//                 <div className="mb-4">
//                   <img 
//                     src={currentQuestion.questionImage} 
//                     alt="Question" 
//                     className="max-w-full h-auto rounded-lg"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Options */}
//             <div className="space-y-3 mb-8">
//               {currentQuestion.options.map((option, optionIndex) => {
//                 const isSelected = answers[currentQuestion._id] === optionIndex;
                
//                 return (
//                   <div
//                     key={optionIndex}
//                     onClick={() => handleAnswerSelect(currentQuestion._id, optionIndex)}
//                     className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                       isSelected
//                         ? 'border-red-400 bg-red-50'
//                         : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                         isSelected 
//                           ? 'border-red-400 bg-red-400 text-white' 
//                           : 'border-gray-300'
//                       }`}>
//                         {String.fromCharCode(65 + optionIndex)}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-gray-900">{option.optionText}</p>
//                         {option.optionImage && (
//                           <img 
//                             src={option.optionImage} 
//                             alt={`Option ${optionIndex + 1}`}
//                             className="mt-2 max-w-xs h-auto rounded"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-between items-center pt-4 border-t">
//               <Button
//                 onClick={handlePrevQuestion}
//                 disabled={currentQuestionIndex === 0}
//                 variant="outline"
//               >
//                 <ChevronLeft className="w-4 h-4 mr-2" />
//                 Previous
//               </Button>
              
//               <div className="flex gap-2">
//                 {currentQuestionIndex < dpp.questions.length - 1 ? (
//                   <Button onClick={handleNextQuestion} className="bg-red-400">
//                     Next
//                     <ChevronRight className="w-4 h-4 ml-2" />
//                   </Button>
//                 ) : (
//                   <Button onClick={submitTest} className="bg-green-600">
//                     <Send className="w-4 h-4 mr-2" />
//                     Submit Test
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DPPTestPage;





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDPPById } from '../../services/dppService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Badge from '../ui/Badge';
import { 
  Clock, 
  BookOpen, 
  Target, 
  ArrowLeft, 
  Flag,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

const DPPTestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [dpp, setDpp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    loadDPP();
  }, [id]);

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(timerId);

      return () => clearInterval(timerId);
    }
  }, [testStarted, timeLeft]);

  const loadDPP = async () => {
    setLoading(true);
    try {
      const response = await getDPPById(id);
      setDpp(response.dpp);
      setTimeLeft(response.dpp.duration * 60); // Convert minutes to seconds
    } catch (error) {
      toast.error('Failed to load DPP');
      navigate('/dpp');
    } finally {
      setLoading(false);
    }
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < dpp.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleAutoSubmit = () => {
    if (timer) clearInterval(timer);
    submitTest();
    toast('Time\'s up! Test submitted automatically.');
  };

  const submitTest = () => {
    if (timer) clearInterval(timer);
    setTestSubmitted(true);
    // Calculate score and show results
    calculateResults();
  };

  const calculateResults = () => {
    if (!dpp) return;

    let score = 0;
    let correctAnswers = 0;
    let attempted = 0;

    dpp.questions.forEach(question => {
      const userAnswer = answers[question._id];
      if (userAnswer !== undefined) {
        attempted++;
        const selectedOption = question.options[userAnswer];
        if (selectedOption.isCorrect) {
          correctAnswers++;
          score += dpp.markingScheme.positiveMarks;
        } else {
          score -= dpp.markingScheme.negativeMarks;
        }
      }
    });

    return {
      score: Math.max(0, score),
      correctAnswers,
      attempted,
      totalQuestions: dpp.questions.length,
      percentage: (score / (dpp.questions.length * dpp.markingScheme.positiveMarks)) * 100
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = dpp?.questions[currentQuestionIndex];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  if (!dpp) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <p className="text-gray-500">DPP not found</p>
          <Button onClick={() => navigate('/dpp')} className="mt-4 bg-red-400">
            Back to DPPs
          </Button>
        </Card>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/dpp')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to DPPs
          </Button>
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{dpp.title}</h1>
            <p className="text-gray-600 text-lg">{dpp.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold">Total Questions</p>
                  <p className="text-gray-600">{dpp.questions.length}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold">Duration</p>
                  <p className="text-gray-600">{dpp.duration} minutes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold">Total Marks</p>
                  <p className="text-gray-600">{dpp.totalMarks}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Flag className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-semibold">Marking Scheme</p>
                  <p className="text-gray-600">
                    +{dpp.markingScheme.positiveMarks}/-{dpp.markingScheme.negativeMarks}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={startTest} size="lg" className="bg-red-400 px-8 py-3">
              Start Test
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (testSubmitted) {
    const results = calculateResults();
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Submitted!</h1>
            <p className="text-gray-600">You have completed {dpp.title}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{results.score.toFixed(1)}</p>
              <p className="text-sm text-gray-600">Score</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{results.correctAnswers}/{results.totalQuestions}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{results.attempted}</p>
              <p className="text-sm text-gray-600">Attempted</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{results.percentage.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Percentage</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Question-wise Analysis</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {dpp.questions.map((question, index) => {
                const userAnswer = answers[question._id];
                const isCorrect = userAnswer !== undefined && 
                                 question.options[userAnswer]?.isCorrect;
                const isAttempted = userAnswer !== undefined;
                
                return (
                  <button
                    key={question._id}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`p-3 rounded-lg text-sm font-medium ${
                      isAttempted 
                        ? isCorrect 
                          ? 'bg-green-100 text-green-800 border-2 border-green-500'
                          : 'bg-red-100 text-red-800 border-2 border-red-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                    }`}
                  >
                    Q{index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={() => navigate('/dpp')} variant="outline">
              Back to DPPs
            </Button>
            <Button onClick={() => window.location.reload()} className="bg-red-400">
              Retry Test
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{dpp.title}</h1>
            <p className="text-gray-600 text-sm">Question {currentQuestionIndex + 1} of {dpp.questions.length}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                timeLeft < 300 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-gray-500">Time Left</div>
            </div>
            
            <Button onClick={submitTest} className="bg-red-400">
              <Send className="w-4 h-4 mr-2" />
              Submit Test
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Questions Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-20">
            <h3 className="font-semibold mb-3">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {dpp.questions.map((question, index) => {
                const isAnswered = answers[question._id] !== undefined;
                const isCurrent = index === currentQuestionIndex;
                
                return (
                  <button
                    key={question._id}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`p-2 rounded text-xs font-medium ${
                      isCurrent
                        ? 'bg-red-400 text-white border-2 border-red-500'
                        : isAnswered
                        ? 'bg-green-100 text-green-800 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-100 border-2 border-green-500 rounded"></div>
                <span className="text-xs text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-100 border-2 border-gray-300 rounded"></div>
                <span className="text-xs text-gray-600">Unanswered</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Question Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Badge text={currentQuestion.subject} />
                <Badge text={currentQuestion.difficulty} />
                <Badge text={`Marks: ${dpp.markingScheme.positiveMarks}`} />
              </div>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1}/{dpp.questions.length}
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {currentQuestion.questionText}
              </h3>
              
              {currentQuestion.questionImage && (
                <div className="mb-4">
                  <img 
                    src={currentQuestion.questionImage} 
                    alt="Question" 
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = answers[currentQuestion._id] === optionIndex;
                
                return (
                  <div
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(currentQuestion._id, optionIndex)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'border-red-400 bg-red-400 text-white' 
                          : 'border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + optionIndex)}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{option.optionText}</p>
                        {option.optionImage && (
                          <img 
                            src={option.optionImage} 
                            alt={`Option ${optionIndex + 1}`}
                            className="mt-2 max-w-xs h-auto rounded"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentQuestionIndex < dpp.questions.length - 1 ? (
                  <Button onClick={handleNextQuestion} className="bg-red-400">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={submitTest} className="bg-green-600">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Test
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DPPTestPage;