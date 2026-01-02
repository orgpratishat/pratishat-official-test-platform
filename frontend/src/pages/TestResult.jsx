
// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import QuestionCard from '../components/QuestionCard'
// import { 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   AlertTriangle, 
//   BookOpen, 
//   Target, 
//   TrendingUp, 
//   ArrowLeft,
//   Zap, 
//   Star, 
//   Award, 
//   FileText,
//   BarChart3,
//   PieChart as PieChartIcon
// } from 'lucide-react';

// const TestAnalysis = () => {
//   const { attemptId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [submissionResult, setSubmissionResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     console.log("📍 Location state:", location.state);
    
//     // Load from location state or localStorage
//     if (location.state?.submissionResult) {
//       console.log("✅ Found submissionResult in location state");
//       setSubmissionResult(location.state.submissionResult);
//       localStorage.setItem(`submissionResult_${attemptId}`, JSON.stringify(location.state.submissionResult));
//       setLoading(false);
//     } else {
//       // Try localStorage for page refresh
//       const storedResult = localStorage.getItem(`submissionResult_${attemptId}`);
//       if (storedResult) {
//         console.log("✅ Found submissionResult in localStorage");
//         setSubmissionResult(JSON.parse(storedResult));
//         setLoading(false);
//       } else {
//         console.log("❌ No submissionResult found");
//         setLoading(false);
//       }
//     }
//   }, [attemptId, location.state]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your performance analysis...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!submissionResult) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <Card className="p-8 text-center max-w-md">
//           <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Available</h2>
//           <p className="text-gray-600 mb-6">
//             Unable to load test results. Please go back and try again.
//           </p>
//           <Button onClick={() => navigate('/tests')}>
//             Back to Tests
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   // Extract data from your submissionResult structure
//   const attempt = submissionResult.attempt;
//   const analytics = attempt?.analytics;
//   const scoreData = attempt?.score;
//   const user = attempt?.user;
//   const questions = attempt?.questions || [];

//   // Calculate basic metrics from your data
//   const totalQuestions = scoreData?.unattempted + scoreData?.wrongAnswers + scoreData?.correctAnswers || 0;
//   const correctAnswers = scoreData?.correctAnswers || 0;
//   const wrongAnswers = scoreData?.wrongAnswers || 0;
//   const unattempted = scoreData?.unattempted || 0;
//   const accuracy = scoreData?.accuracy || 0;
//   const obtainedMarks = scoreData?.obtainedMarks || 0;
//   const totalMarks = scoreData?.totalMarks || 0;

//   // Analytics data from your structure
//   const strongSubjects = analytics?.strongSubjects || [];
//   const weakSubjects = analytics?.weakSubjects || [];
//   const strongChapters = analytics?.strongChapters || [];
//   const weakChapters = analytics?.weakChapters || [];
//   const subjectWiseAnalysis = analytics?.subjectWiseAnalysis || [];

//   // Process subject data for charts
//   const subjectData = subjectWiseAnalysis.map(item => ({
//     name: item.subject,
//     correct: item.correct,
//     incorrect: item.wrong,
//     unanswered: item.attempted - item.correct - item.wrong,
//     total: item.attempted,
//     accuracy: item.accuracy
//   }));

//   // Process chapter data from weak/strong chapters
//   const allChapters = [...weakChapters, ...strongChapters];
//   const chapterData = allChapters.slice(0, 10).map((chapter, index) => ({
//     name: chapter.length > 20 ? chapter.substring(0, 20) + '...' : chapter,
//     fullName: chapter,
//     accuracy: weakChapters.includes(chapter) ? 40 : 80, // Approximate values
//     correct: weakChapters.includes(chapter) ? 2 : 8, // Approximate values
//     incorrect: weakChapters.includes(chapter) ? 3 : 1, // Approximate values
//     total: weakChapters.includes(chapter) ? 5 : 10 // Approximate values
//   }));

//   // Difficulty analysis (approximated from your data)
//   const difficultyData = [
//     { level: 'Easy', correct: Math.round(correctAnswers * 0.3), total: Math.round(totalQuestions * 0.3), color: '#10B981' },
//     { level: 'Medium', correct: Math.round(correctAnswers * 0.5), total: Math.round(totalQuestions * 0.5), color: '#F59E0B' },
//     { level: 'Hard', correct: Math.round(correctAnswers * 0.2), total: Math.round(totalQuestions * 0.2), color: '#EF4444' }
//   ].map(item => ({
//     ...item,
//     accuracy: Math.round((item.correct / item.total) * 100) || 0,
//     incorrect: item.total - item.correct
//   }));

//   // Question analysis from your questions data
//   const questionAnalysis = questions.map((question, index) => ({
//     number: index + 1,
//     subject: question.subject,
//     chapter: question.chapter,
//     difficulty: question.difficulty,
//     topic: question.topics?.[0] || 'General',
//     timeSpent: Math.random() * 120 + 30, // Approximate time
//     status: index < correctAnswers ? 'correct' : index < correctAnswers + wrongAnswers ? 'wrong' : 'unattempted'
//   }));

//   // Colors for UI
//   const COLORS = ['#10B981', '#EF4444', '#6B7280', '#3B82F6', '#8B5CF6', '#F59E0B'];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </Button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Performance Analysis</h1>
//                 <p className="text-gray-600">{attempt?.attemptType || "NEET Mock Test"}</p>
//                 <p className="text-sm text-gray-500">Student: {user?.profile?.fullName || "User"}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold text-gray-900">
//                 {correctAnswers}/{totalQuestions}
//               </div>
//               <div className="text-lg text-gray-600">{accuracy}% Accuracy</div>
//               <div className="text-sm text-gray-500">{obtainedMarks}/{totalMarks} Marks</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4">
//           <nav className="flex space-x-8">
//             {[
//               { id: 'overview', label: 'Overview', icon: BarChart3 },
//               { id: 'subjects', label: 'Subjects', icon: BookOpen },
//               { id: 'chapters', label: 'Chapters', icon: FileText },
//               { id: 'questions', label: 'Questions', icon: Target },
//               { id: 'improvement', label: 'Improvement', icon: TrendingUp }
//             ].map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab.id
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto ">
//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             {/* Performance Summary */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
//                 <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
//                 <div className="text-3xl font-bold text-gray-900">{correctAnswers}</div>
//                 <div className="text-gray-600 font-medium">Correct Answers</div>
//                 <div className="text-sm text-green-600 mt-1">
//                   {((correctAnswers / totalQuestions) * 100).toFixed(1)}% of total
//                 </div>
//               </Card>
              
//               <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
//                 <XCircle className="w-12 h-12 mx-auto mb-3 text-red-600" />
//                 <div className="text-3xl font-bold text-gray-900">{wrongAnswers}</div>
//                 <div className="text-gray-600 font-medium">Wrong Answers</div>
//                 <div className="text-sm text-red-600 mt-1">
//                   {((wrongAnswers / totalQuestions) * 100).toFixed(1)}% of total
//                 </div>
//               </Card>
              
//               <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
//                 <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
//                 <div className="text-3xl font-bold text-gray-900">{unattempted}</div>
//                 <div className="text-gray-600 font-medium">Unattempted</div>
//                 <div className="text-sm text-yellow-600 mt-1">
//                   {((unattempted / totalQuestions) * 100).toFixed(1)}% of total
//                 </div>
//               </Card>
              
//               <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
//                 <Award className="w-12 h-12 mx-auto mb-3 text-blue-600" />
//                 <div className="text-3xl font-bold text-gray-900">{accuracy}%</div>
//                 <div className="text-gray-600 font-medium">Overall Accuracy</div>
//                 <div className="text-sm text-blue-600 mt-1">
//                   Based on attempted questions
//                 </div>
//               </Card>
//             </div>

//             {/* Score Breakdown */}
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-4">Marks Distribution</h4>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Total Marks:</span>
//                       <span className="font-bold">{totalMarks}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Marks Obtained:</span>
//                       <span className="font-bold text-green-600">{obtainedMarks}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Percentage:</span>
//                       <span className="font-bold text-blue-600">
//                         {((obtainedMarks / totalMarks) * 100).toFixed(2)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-4">Question Analysis</h4>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-3 h-3 bg-green-500 rounded"></div>
//                         <span>Correct</span>
//                       </div>
//                       <span className="font-semibold">{correctAnswers}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-3 h-3 bg-red-500 rounded"></div>
//                         <span>Wrong</span>
//                       </div>
//                       <span className="font-semibold">{wrongAnswers}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-3 h-3 bg-yellow-500 rounded"></div>
//                         <span>Unattempted</span>
//                       </div>
//                       <span className="font-semibold">{unattempted}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Difficulty Performance */}
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Performance by Difficulty Level</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {difficultyData.map((difficulty) => (
//                   <div key={difficulty.level} className="text-center p-6 border-2 rounded-xl bg-white hover:shadow-lg transition-shadow">
//                     <div 
//                       className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-lg"
//                       style={{ backgroundColor: difficulty.color }}
//                     >
//                       {difficulty.accuracy}%
//                     </div>
//                     <div className="text-lg font-bold text-gray-900 mb-2">{difficulty.level}</div>
//                     <div className="text-sm text-gray-600 mb-1">
//                       {difficulty.correct}/{difficulty.total} Correct
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       Accuracy: {difficulty.accuracy}%
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>
//         )}

//         {/* Subjects Tab */}
//         {activeTab === 'subjects' && (
//           <div className="space-y-6">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Subject-wise Performance</h3>
              
//               {subjectData.length > 0 ? (
//                 <div className="space-y-6">
//                   {subjectData.map((subject, index) => (
//                     <div key={subject.name} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h4 className="text-lg font-bold text-gray-900">{subject.name}</h4>
//                           <p className="text-gray-600 text-sm">
//                             {subject.attempted || subject.total} questions attempted
//                           </p>
//                         </div>
//                         <span className={`px-4 py-2 rounded-full text-sm font-bold ${
//                           subject.accuracy >= 70 ? 'bg-green-100 text-green-800 border border-green-200' :
//                           subject.accuracy >= 40 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
//                           'bg-red-100 text-red-800 border border-red-200'
//                         }`}>
//                           {subject.accuracy}% Accuracy
//                         </span>
//                       </div>
                      
//                       <div className="grid grid-cols-3 gap-4 mb-4">
//                         <div className="text-center p-3 bg-green-50 rounded-lg">
//                           <div className="text-xl font-bold text-green-600">{subject.correct}</div>
//                           <div className="text-sm text-green-700">Correct</div>
//                         </div>
//                         <div className="text-center p-3 bg-red-50 rounded-lg">
//                           <div className="text-xl font-bold text-red-600">{subject.incorrect}</div>
//                           <div className="text-sm text-red-700">Wrong</div>
//                         </div>
//                         <div className="text-center p-3 bg-gray-50 rounded-lg">
//                           <div className="text-xl font-bold text-gray-600">{subject.unanswered}</div>
//                           <div className="text-sm text-gray-700">Unattempted</div>
//                         </div>
//                       </div>
                      
//                       <div className="w-full bg-gray-200 rounded-full h-3">
//                         <div 
//                           className={`h-3 rounded-full transition-all duration-1000 ${
//                             subject.accuracy >= 70 ? 'bg-green-500' :
//                             subject.accuracy >= 40 ? 'bg-yellow-500' :
//                             'bg-red-500'
//                           }`}
//                           style={{ width: `${subject.accuracy}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p>No subject-wise data available</p>
//                 </div>
//               )}
//             </Card>
//           </div>
//         )}

//         {/* Chapters Tab */}
//         {activeTab === 'chapters' && (
//           <div className="space-y-6">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Chapter Performance Analysis</h3>
              
//               {chapterData.length > 0 ? (
//                 <div className="space-y-4">
//                   {chapterData.map((chapter, index) => (
//                     <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 transition-colors">
//                       <div className="flex-1">
//                         <div className="font-bold text-gray-900 text-lg mb-1">{chapter.fullName}</div>
//                         <div className="text-sm text-gray-600">
//                           {chapter.correct} correct • {chapter.incorrect} wrong • {chapter.total} total
//                         </div>
//                       </div>
//                       <div className={`text-right ${
//                         chapter.accuracy >= 70 ? 'text-green-600' : 
//                         chapter.accuracy >= 40 ? 'text-yellow-600' : 'text-red-600'
//                       }`}>
//                         <div className="text-2xl font-bold">{chapter.accuracy}%</div>
//                         <div className="text-sm">Accuracy</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p>No chapter-wise data available</p>
//                 </div>
//               )}
//             </Card>
//           </div>
//         )}

     

//         {/* Questions Tab */}
// {activeTab === 'questions' && (
//   <div className="space-y-6">
//     <Card className="p-6">
//       <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Question Analysis</h3>
      
//       {questions.length > 0 ? (
//         <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
//           {questions.map((question, index) => {
//             const status = index < correctAnswers ? 'correct' : 
//                           index < correctAnswers + wrongAnswers ? 'wrong' : 'unattempted';
//             const correctOption = question.options.find(opt => opt.isCorrect);
//             const userResponse = attempt?.responses?.find(r => r.question === question._id);
//             const userSelectedOption = userResponse?.selectedOption;
            
//             return (
//               <QuestionCard 
//                 key={index}
//                 question={question}
//                 index={index}
//                 status={status}
//                 correctOption={correctOption}
//                 userSelectedOption={userSelectedOption}
//                 correctAnswers={correctAnswers}
//               />
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center py-12 text-gray-500">
//           <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//           <p className="text-lg">No question data available</p>
//           <p className="text-sm mt-2">Complete a test to see detailed question analysis</p>
//         </div>
//       )}
//     </Card>
//   </div>
// )}


//         {/* Improvement Tab */}
//         {activeTab === 'improvement' && (
//           <div className="space-y-6">
//             {/* Weak Subjects */}
//             {weakSubjects.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                   <AlertTriangle className="w-6 h-6 text-orange-500" />
//                   Subjects Needing Improvement
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {weakSubjects.map((subject, index) => (
//                     <div key={subject} className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
//                       <div className="flex items-center gap-3">
//                         <Zap className="w-5 h-5 text-orange-500" />
//                         <span className="font-semibold text-gray-900">{subject}</span>
//                       </div>
//                       <div className="text-orange-600 font-bold">
//                         Priority {index + 1}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Weak Chapters */}
//             {weakChapters.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                   <BookOpen className="w-6 h-6 text-red-500" />
//                   Chapters Requiring Focus
//                 </h3>
//                 <div className="space-y-3">
//                   {weakChapters.slice(0, 15).map((chapter, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
//                       <div className="flex items-center gap-3 flex-1">
//                         <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
//                         <span className="text-sm text-gray-800">{chapter}</span>
//                       </div>
//                       <span className="text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded">
//                         Revise
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 {weakChapters.length > 15 && (
//                   <div className="text-center text-red-600 text-sm mt-4">
//                     +{weakChapters.length - 15} more chapters to focus on
//                   </div>
//                 )}
//               </Card>
//             )}

//             {/* Strong Areas */}
//             {strongSubjects.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                   <TrendingUp className="w-6 h-6 text-green-500" />
//                   Your Strong Areas
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {strongSubjects.map((subject, index) => (
//                     <span key={subject} className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold shadow-sm">
//                       {subject}
//                     </span>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Action Plan */}
//             <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
//               <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                 <Star className="w-6 h-6 text-blue-500" />
//                 Recommended Action Plan
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     1
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Focus on Weak Subjects</div>
//                     <div className="text-sm text-gray-600">Start with {weakSubjects[0] || 'your weakest subject'} and practice regularly</div>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     2
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Revise Key Chapters</div>
//                     <div className="text-sm text-gray-600">Master the fundamental chapters from your weak subjects</div>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     3
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Practice Mock Tests</div>
//                     <div className="text-sm text-gray-600">Take regular mock tests to improve time management</div>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestAnalysis;








// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import QuestionCard from '../components/QuestionCard';
// import { 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   AlertTriangle, 
//   BookOpen, 
//   Target, 
//   TrendingUp, 
//   ArrowLeft,
//   Zap, 
//   Star, 
//   Award, 
//   FileText,
//   BarChart3,
//   PieChart,
//   Users,
//   Calendar
// } from 'lucide-react';

// const TestAnalysis = () => {
//   const { attemptId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [submissionResult, setSubmissionResult] = useState(null);
//   const [timeSpentData, setTimeSpentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     console.log("📍 Location state:", location.state);
    
//     // Load from location state or localStorage
//     if (location.state?.submissionResult) {
//       console.log("✅ Found submissionResult in location state");
//       setSubmissionResult(location.state.submissionResult);
//       setTimeSpentData(location.state.timeSpentData);
//       localStorage.setItem(`submissionResult_${attemptId}`, JSON.stringify(location.state.submissionResult));
//       localStorage.setItem(`timeSpentData_${attemptId}`, JSON.stringify(location.state.timeSpentData));
//       setLoading(false);
//     } else {
//       // Try localStorage for page refresh
//       const storedResult = localStorage.getItem(`submissionResult_${attemptId}`);
//       const storedTimeData = localStorage.getItem(`timeSpentData_${attemptId}`);
//       if (storedResult) {
//         console.log("✅ Found submissionResult in localStorage");
//         setSubmissionResult(JSON.parse(storedResult));
//         setTimeSpentData(storedTimeData ? JSON.parse(storedTimeData) : null);
//         setLoading(false);
//       } else {
//         console.log("❌ No submissionResult found");
//         setLoading(false);
//       }
//     }
//   }, [attemptId, location.state]);

//   // Format time from seconds to readable format
//   const formatTime = (seconds) => {
//     if (!seconds || seconds < 0) return '0s';
    
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
    
//     if (hours > 0) {
//       return `${hours}h ${minutes}m ${secs}s`;
//     } else if (minutes > 0) {
//       return `${minutes}m ${secs}s`;
//     } else {
//       return `${secs}s`;
//     }
//   };

//   // Calculate percentage
//   const calculatePercentage = (part, total) => {
//     if (!total || total === 0) return 0;
//     return Math.round((part / total) * 100);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your performance analysis...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!submissionResult) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <Card className="p-8 text-center max-w-md">
//           <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Available</h2>
//           <p className="text-gray-600 mb-6">
//             Unable to load test results. Please go back and try again.
//           </p>
//           <Button onClick={() => navigate('/tests')}>
//             Back to Tests
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   // Extract data from submissionResult structure
//   const attempt = submissionResult.attempt;
//   const analytics = attempt?.analytics || {};
//   const scoreData = attempt?.score || {};
//   const user = attempt?.user || {};
//   const questions = attempt?.questions || [];
//   const responses = attempt?.responses || [];

//   // Calculate basic metrics
//   const totalQuestions = questions.length || 0;
//   const correctAnswers = scoreData?.correctAnswers || 0;
//   const wrongAnswers = scoreData?.wrongAnswers || 0;
//   const unattempted = scoreData?.unattempted || 0;
//   const accuracy = scoreData?.accuracy || 0;
//   const obtainedMarks = scoreData?.obtainedMarks || 0;
//   const totalMarks = scoreData?.totalMarks || 0;
//   const totalTimeSpent = attempt?.totalTimeSpent || 0;

//   // Create a map of question ID to time spent for easy lookup
//   const timeSpentMap = {};
//   if (timeSpentData) {
//     timeSpentData.forEach(item => {
//       timeSpentMap[item.questionId] = item.timeSpent;
//     });
//   } else {
//     // Fallback to responses data
//     responses.forEach(response => {
//       timeSpentMap[response.question] = response.timeSpent || 0;
//     });
//   }

//   // Analytics data
//   const strongSubjects = analytics?.strongSubjects || [];
//   const weakSubjects = analytics?.weakSubjects || [];
//   const strongChapters = analytics?.strongChapters || [];
//   const weakChapters = analytics?.weakChapters || [];
//   const subjectWiseAnalysis = analytics?.subjectWiseAnalysis || [];

//   // Calculate time analytics
//   const totalTimeSpentOnQuestions = Object.values(timeSpentMap).reduce((sum, time) => sum + (time || 0), 0);
//   const averageTimePerQuestion = totalQuestions > 0 ? Math.round(totalTimeSpentOnQuestions / totalQuestions) : 0;
//   const averageTimePerAttemptedQuestion = (correctAnswers + wrongAnswers) > 0 
//     ? Math.round(totalTimeSpentOnQuestions / (correctAnswers + wrongAnswers)) 
//     : 0;

//   // Process subject data for display
//   const subjectData = subjectWiseAnalysis.map(item => ({
//     name: item.subject,
//     correct: item.correct || 0,
//     incorrect: item.wrong || 0,
//     unanswered: (item.attempted || 0) - (item.correct || 0) - (item.wrong || 0),
//     total: item.attempted || 0,
//     accuracy: item.accuracy || 0
//   }));

//   // Process chapter data
//   const allChapters = [...new Set([...weakChapters, ...strongChapters])];
//   const chapterData = allChapters.slice(0, 10).map((chapter, index) => ({
//     name: chapter.length > 20 ? chapter.substring(0, 20) + '...' : chapter,
//     fullName: chapter,
//     accuracy: weakChapters.includes(chapter) ? 40 : 80,
//     status: weakChapters.includes(chapter) ? 'weak' : 'strong'
//   }));

//   // Difficulty analysis
//   const difficultyData = [
//     { 
//       level: 'Easy', 
//       correct: Math.round(correctAnswers * 0.4), 
//       total: Math.round(totalQuestions * 0.4), 
//       color: '#10B981' 
//     },
//     { 
//       level: 'Medium', 
//       correct: Math.round(correctAnswers * 0.4), 
//       total: Math.round(totalQuestions * 0.4), 
//       color: '#F59E0B' 
//     },
//     { 
//       level: 'Hard', 
//       correct: Math.round(correctAnswers * 0.2), 
//       total: Math.round(totalQuestions * 0.2), 
//       color: '#EF4444' 
//     }
//   ].map(item => ({
//     ...item,
//     accuracy: calculatePercentage(item.correct, item.total),
//     incorrect: item.total - item.correct
//   }));

//   // Time distribution analysis
//   const timeDistribution = [
//     { range: '0-30s', count: 0 },
//     { range: '31-60s', count: 0 },
//     { range: '1-2m', count: 0 },
//     { range: '2-3m', count: 0 },
//     { range: '3m+', count: 0 }
//   ];

//   // Calculate time distribution
//   Object.values(timeSpentMap).forEach(time => {
//     if (time <= 30) timeDistribution[0].count++;
//     else if (time <= 60) timeDistribution[1].count++;
//     else if (time <= 120) timeDistribution[2].count++;
//     else if (time <= 180) timeDistribution[3].count++;
//     else timeDistribution[4].count++;
//   });

//   // Question analysis with accurate time spent
//   const questionAnalysis = questions.map((question, index) => {
//     const response = responses.find(r => r.question === question._id);
//     const timeSpent = timeSpentMap[question._id] || response?.timeSpent || 0;
//     const isAttempted = response?.selectedOption !== null && response?.selectedOption !== undefined;
    
//     return {
//       number: index + 1,
//       questionId: question._id,
//       subject: question.subject,
//       chapter: question.chapter,
//       difficulty: question.difficulty,
//       topic: question.topics?.[0] || 'General',
//       timeSpent: timeSpent,
//       status: response?.isCorrect ? 'correct' : 
//               isAttempted ? 'wrong' : 'unattempted',
//       isMarkedForReview: response?.isMarkedForReview || false
//     };
//   });

//   // Performance metrics
//   const performanceMetrics = {
//     speed: calculatePercentage(correctAnswers, totalQuestions) > 70 ? 'Fast' : 'Moderate',
//     accuracy: accuracy > 80 ? 'High' : accuracy > 60 ? 'Medium' : 'Low',
//     completion: calculatePercentage((correctAnswers + wrongAnswers), totalQuestions) > 90 ? 'Complete' : 'Partial',
//     timeManagement: averageTimePerQuestion < 60 ? 'Efficient' : 'Needs Improvement'
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </Button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Performance Analysis</h1>
//                 <p className="text-gray-600">{attempt?.attemptType || "NEET Mock Test"} • {attempt?.test?.name || "Test"}</p>
//                 <p className="text-sm text-gray-500">
//                   Student: {user?.profile?.fullName || user?.username || "User"} • 
//                   Attempt: #{attempt?.attemptNumber || 1} • 
//                   Date: {new Date(attempt?.completedAt || Date.now()).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold text-gray-900">
//                 {correctAnswers}/{totalQuestions}
//               </div>
//               <div className="text-lg text-gray-600">{accuracy.toFixed(1)}% Accuracy</div>
//               <div className="text-sm text-gray-500">{obtainedMarks}/{totalMarks} Marks</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4">
//           <nav className="flex space-x-8">
//             {[
//               { id: 'overview', label: 'Overview', icon: BarChart3 },
//               { id: 'subjects', label: 'Subjects', icon: BookOpen },
//               { id: 'chapters', label: 'Chapters', icon: FileText },
//               { id: 'questions', label: 'Questions', icon: Target },
//               { id: 'time', label: 'Time Analysis', icon: Clock },
//               { id: 'improvement', label: 'Improvement', icon: TrendingUp }
//             ].map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab.id
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             {/* Performance Summary */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
//                 <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
//                 <div className="text-3xl font-bold text-gray-900">{correctAnswers}</div>
//                 <div className="text-gray-600 font-medium">Correct Answers</div>
//                 <div className="text-sm text-green-600 mt-1">
//                   {calculatePercentage(correctAnswers, totalQuestions)}% of total
//                 </div>
//               </Card>
              
//               <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
//                 <XCircle className="w-12 h-12 mx-auto mb-3 text-red-600" />
//                 <div className="text-3xl font-bold text-gray-900">{wrongAnswers}</div>
//                 <div className="text-gray-600 font-medium">Wrong Answers</div>
//                 <div className="text-sm text-red-600 mt-1">
//                   {calculatePercentage(wrongAnswers, totalQuestions)}% of total
//                 </div>
//               </Card>
              
//               <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
//                 <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
//                 <div className="text-3xl font-bold text-gray-900">{unattempted}</div>
//                 <div className="text-gray-600 font-medium">Unattempted</div>
//                 <div className="text-sm text-yellow-600 mt-1">
//                   {calculatePercentage(unattempted, totalQuestions)}% of total
//                 </div>
//               </Card>
              
//               <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
//                 <Award className="w-12 h-12 mx-auto mb-3 text-blue-600" />
//                 <div className="text-3xl font-bold text-gray-900">{accuracy.toFixed(1)}%</div>
//                 <div className="text-gray-600 font-medium">Overall Accuracy</div>
//                 <div className="text-sm text-blue-600 mt-1">
//                   Based on attempted questions
//                 </div>
//               </Card>
//             </div>

//             {/* Score and Time Analysis */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-700">Total Marks:</span>
//                     <span className="font-bold text-gray-900">{totalMarks}</span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//                     <span className="text-gray-700">Marks Obtained:</span>
//                     <span className="font-bold text-green-600">{obtainedMarks}</span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                     <span className="text-gray-700">Percentage:</span>
//                     <span className="font-bold text-blue-600">
//                       {calculatePercentage(obtainedMarks, totalMarks)}%
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
//                     <span className="text-gray-700">Rank Prediction:</span>
//                     <span className="font-bold text-purple-600">
//                       {attempt?.predictedRank ? `#${attempt.predictedRank}` : 'N/A'}
//                     </span>
//                   </div>
//                 </div>
//               </Card>

//               <Card className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Time Analysis</h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <span className="text-gray-700">Total Time Spent:</span>
//                     <span className="font-bold text-gray-900">{formatTime(totalTimeSpent)}</span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                     <span className="text-gray-700">Avg Time/Question:</span>
//                     <span className="font-bold text-blue-600">{formatTime(averageTimePerQuestion)}</span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//                     <span className="text-gray-700">Avg Time/Attempted:</span>
//                     <span className="font-bold text-green-600">{formatTime(averageTimePerAttemptedQuestion)}</span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
//                     <span className="text-gray-700">Time Efficiency:</span>
//                     <span className={`font-bold ${
//                       performanceMetrics.timeManagement === 'Efficient' ? 'text-green-600' : 'text-yellow-600'
//                     }`}>
//                       {performanceMetrics.timeManagement}
//                     </span>
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* Performance Metrics */}
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
//                   <Zap className={`w-8 h-8 mx-auto mb-2 ${
//                     performanceMetrics.speed === 'Fast' ? 'text-green-500' : 'text-yellow-500'
//                   }`} />
//                   <div className="font-semibold text-gray-900">{performanceMetrics.speed}</div>
//                   <div className="text-sm text-gray-600">Speed</div>
//                 </div>
//                 <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
//                   <Target className={`w-8 h-8 mx-auto mb-2 ${
//                     performanceMetrics.accuracy === 'High' ? 'text-green-500' : 
//                     performanceMetrics.accuracy === 'Medium' ? 'text-yellow-500' : 'text-red-500'
//                   }`} />
//                   <div className="font-semibold text-gray-900">{performanceMetrics.accuracy}</div>
//                   <div className="text-sm text-gray-600">Accuracy</div>
//                 </div>
//                 <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
//                   <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${
//                     performanceMetrics.completion === 'Complete' ? 'text-green-500' : 'text-yellow-500'
//                   }`} />
//                   <div className="font-semibold text-gray-900">{performanceMetrics.completion}</div>
//                   <div className="text-sm text-gray-600">Completion</div>
//                 </div>
//                 <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
//                   <Clock className={`w-8 h-8 mx-auto mb-2 ${
//                     performanceMetrics.timeManagement === 'Efficient' ? 'text-green-500' : 'text-yellow-500'
//                   }`} />
//                   <div className="font-semibold text-gray-900">{performanceMetrics.timeManagement}</div>
//                   <div className="text-sm text-gray-600">Time Mgmt</div>
//                 </div>
//               </div>
//             </Card>

//             {/* Difficulty Performance */}
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Performance by Difficulty Level</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {difficultyData.map((difficulty) => (
//                   <div key={difficulty.level} className="text-center p-6 border-2 rounded-xl bg-white hover:shadow-lg transition-shadow">
//                     <div 
//                       className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-lg"
//                       style={{ backgroundColor: difficulty.color }}
//                     >
//                       {difficulty.accuracy}%
//                     </div>
//                     <div className="text-lg font-bold text-gray-900 mb-2">{difficulty.level}</div>
//                     <div className="text-sm text-gray-600 mb-1">
//                       {difficulty.correct}/{difficulty.total} Correct
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       Accuracy: {difficulty.accuracy}%
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>
//         )}

//         {/* Subjects Tab */}
//         {activeTab === 'subjects' && (
//           <div className="space-y-6">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Subject-wise Performance</h3>
              
//               {subjectData.length > 0 ? (
//                 <div className="space-y-6">
//                   {subjectData.map((subject, index) => (
//                     <div key={subject.name} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h4 className="text-lg font-bold text-gray-900">{subject.name}</h4>
//                           <p className="text-gray-600 text-sm">
//                             {subject.total} questions • {subject.correct + subject.incorrect} attempted
//                           </p>
//                         </div>
//                         <span className={`px-4 py-2 rounded-full text-sm font-bold ${
//                           subject.accuracy >= 70 ? 'bg-green-100 text-green-800 border border-green-200' :
//                           subject.accuracy >= 40 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
//                           'bg-red-100 text-red-800 border border-red-200'
//                         }`}>
//                           {subject.accuracy}% Accuracy
//                         </span>
//                       </div>
                      
//                       <div className="grid grid-cols-3 gap-4 mb-4">
//                         <div className="text-center p-3 bg-green-50 rounded-lg">
//                           <div className="text-xl font-bold text-green-600">{subject.correct}</div>
//                           <div className="text-sm text-green-700">Correct</div>
//                         </div>
//                         <div className="text-center p-3 bg-red-50 rounded-lg">
//                           <div className="text-xl font-bold text-red-600">{subject.incorrect}</div>
//                           <div className="text-sm text-red-700">Wrong</div>
//                         </div>
//                         <div className="text-center p-3 bg-gray-50 rounded-lg">
//                           <div className="text-xl font-bold text-gray-600">{subject.unanswered}</div>
//                           <div className="text-sm text-gray-700">Unattempted</div>
//                         </div>
//                       </div>
                      
//                       <div className="w-full bg-gray-200 rounded-full h-3">
//                         <div 
//                           className={`h-3 rounded-full transition-all duration-1000 ${
//                             subject.accuracy >= 70 ? 'bg-green-500' :
//                             subject.accuracy >= 40 ? 'bg-yellow-500' :
//                             'bg-red-500'
//                           }`}
//                           style={{ width: `${Math.min(subject.accuracy, 100)}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p>No subject-wise data available</p>
//                 </div>
//               )}
//             </Card>
//           </div>
//         )}

//         {/* Chapters Tab */}
//         {activeTab === 'chapters' && (
//           <div className="space-y-6">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Chapter Performance Analysis</h3>
              
//               {chapterData.length > 0 ? (
//                 <div className="space-y-4">
//                   {chapterData.map((chapter, index) => (
//                     <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 transition-colors">
//                       <div className="flex-1">
//                         <div className="font-bold text-gray-900 text-lg mb-1">{chapter.fullName}</div>
//                         <div className="text-sm text-gray-600">
//                           {chapter.status === 'strong' ? 'Strong Area' : 'Needs Improvement'}
//                         </div>
//                       </div>
//                       <div className={`text-right ${
//                         chapter.accuracy >= 70 ? 'text-green-600' : 
//                         chapter.accuracy >= 40 ? 'text-yellow-600' : 'text-red-600'
//                       }`}>
//                         <div className="text-2xl font-bold">{chapter.accuracy}%</div>
//                         <div className="text-sm">Accuracy</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p>No chapter-wise data available</p>
//                 </div>
//               )}
//             </Card>
//           </div>
//         )}

//         {/* Questions Tab */}
//         {activeTab === 'questions' && (
//           <div className="space-y-6">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Question Analysis</h3>
              
//               {questions.length > 0 ? (
//                 <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
//                   {questions.map((question, index) => {
//                     const response = responses.find(r => r.question === question._id);
//                     const status = response?.isCorrect ? 'correct' : 
//                                   response?.selectedOption !== null && response?.selectedOption !== undefined ? 'wrong' : 'unattempted';
//                     const correctOption = question.options.find(opt => opt.isCorrect);
//                     const userSelectedOptionIndex = response?.selectedOption;
//                     const userSelectedOption = userSelectedOptionIndex !== null && userSelectedOptionIndex !== undefined 
//                       ? question.options[userSelectedOptionIndex]?.optionText 
//                       : null;
//                     const timeSpent = timeSpentMap[question._id] || 0;
                    
//                     return (
//                       <QuestionCard 
//                         key={question._id}
//                         question={question}
//                         index={index}
//                         status={status}
//                         correctOption={correctOption}
//                         userSelectedOption={userSelectedOption}
//                         correctAnswers={correctAnswers}
//                         timeSpent={timeSpent}
//                       />
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 text-gray-500">
//                   <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p className="text-lg">No question data available</p>
//                   <p className="text-sm mt-2">Complete a test to see detailed question analysis</p>
//                 </div>
//               )}
//             </Card>
//           </div>
//         )}

//         {/* Time Analysis Tab */}
//         {activeTab === 'time' && (
//           <div className="space-y-6">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Time Distribution Analysis</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-4">Time Spent Distribution</h4>
//                   <div className="space-y-3">
//                     {timeDistribution.map((item, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <span className="text-gray-700">{item.range}</span>
//                         <span className="font-semibold text-gray-900">
//                           {item.count} questions ({calculatePercentage(item.count, totalQuestions)}%)
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-4">Time Efficiency</h4>
//                   <div className="space-y-4">
//                     <div className="p-4 bg-blue-50 rounded-lg">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-700">Fast Questions ({formatTime(0)}-{formatTime(30)})</span>
//                         <span className="font-bold text-blue-600">{timeDistribution[0].count}</span>
//                       </div>
//                       <div className="w-full bg-blue-200 rounded-full h-2">
//                         <div 
//                           className="bg-blue-500 h-2 rounded-full"
//                           style={{ width: `${calculatePercentage(timeDistribution[0].count, totalQuestions)}%` }}
//                         ></div>
//                       </div>
//                     </div>
                    
//                     <div className="p-4 bg-green-50 rounded-lg">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-700">Optimal Questions ({formatTime(31)}-{formatTime(120)})</span>
//                         <span className="font-bold text-green-600">
//                           {timeDistribution[1].count + timeDistribution[2].count}
//                         </span>
//                       </div>
//                       <div className="w-full bg-green-200 rounded-full h-2">
//                         <div 
//                           className="bg-green-500 h-2 rounded-full"
//                           style={{ width: `${calculatePercentage(timeDistribution[1].count + timeDistribution[2].count, totalQuestions)}%` }}
//                         ></div>
//                       </div>
//                     </div>
                    
//                     <div className="p-4 bg-red-50 rounded-lg">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-700">Slow Questions ({formatTime(121)}+)</span>
//                         <span className="font-bold text-red-600">
//                           {timeDistribution[3].count + timeDistribution[4].count}
//                         </span>
//                       </div>
//                       <div className="w-full bg-red-200 rounded-full h-2">
//                         <div 
//                           className="bg-red-500 h-2 rounded-full"
//                           style={{ width: `${calculatePercentage(timeDistribution[3].count + timeDistribution[4].count, totalQuestions)}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Time vs Accuracy Analysis</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                   <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" />
//                   <div className="text-2xl font-bold text-gray-900">{formatTime(averageTimePerQuestion)}</div>
//                   <div className="text-gray-600">Average Time per Question</div>
//                   <div className="text-sm text-blue-600 mt-2">
//                     {averageTimePerQuestion < 60 ? 'Excellent pace' : 
//                      averageTimePerQuestion < 120 ? 'Good pace' : 'Consider improving speed'}
//                   </div>
//                 </div>
                
//                 <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                   <Target className="w-12 h-12 mx-auto mb-3 text-green-600" />
//                   <div className="text-2xl font-bold text-gray-900">{accuracy.toFixed(1)}%</div>
//                   <div className="text-gray-600">Accuracy at Current Pace</div>
//                   <div className="text-sm text-green-600 mt-2">
//                     {accuracy > 80 ? 'Great accuracy!' : 
//                      accuracy > 60 ? 'Good accuracy' : 'Focus on accuracy'}
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         )}

//         {/* Improvement Tab */}
//         {activeTab === 'improvement' && (
//           <div className="space-y-6">
//             {/* Weak Subjects */}
//             {weakSubjects.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                   <AlertTriangle className="w-6 h-6 text-orange-500" />
//                   Subjects Needing Improvement
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {weakSubjects.map((subject, index) => (
//                     <div key={subject} className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
//                       <div className="flex items-center gap-3">
//                         <Zap className="w-5 h-5 text-orange-500" />
//                         <span className="font-semibold text-gray-900">{subject}</span>
//                       </div>
//                       <div className="text-orange-600 font-bold">
//                         Priority {index + 1}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Weak Chapters */}
//             {weakChapters.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                   <BookOpen className="w-6 h-6 text-red-500" />
//                   Chapters Requiring Focus
//                 </h3>
//                 <div className="space-y-3">
//                   {weakChapters.slice(0, 10).map((chapter, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
//                       <div className="flex items-center gap-3 flex-1">
//                         <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
//                         <span className="text-sm text-gray-800">{chapter}</span>
//                       </div>
//                       <span className="text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded">
//                         High Priority
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 {weakChapters.length > 10 && (
//                   <div className="text-center text-red-600 text-sm mt-4">
//                     +{weakChapters.length - 10} more chapters to focus on
//                   </div>
//                 )}
//               </Card>
//             )}

//             {/* Time Management Tips */}
//             <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
//               <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                 <Clock className="w-6 h-6 text-blue-500" />
//                 Time Management Recommendations
//               </h3>
//               <div className="space-y-4">
//                 {averageTimePerQuestion > 120 && (
//                   <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
//                     <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                       1
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">Improve Question Solving Speed</div>
//                       <div className="text-sm text-gray-600">
//                         Your average time per question is {formatTime(averageTimePerQuestion)}. 
//                         Practice with time limits to improve speed.
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {unattempted > 0 && (
//                   <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
//                     <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                       2
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">Reduce Unattempted Questions</div>
//                       <div className="text-sm text-gray-600">
//                         You left {unattempted} questions unanswered. Develop a strategy to attempt all questions.
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     3
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Practice Mock Tests Regularly</div>
//                     <div className="text-sm text-gray-600">
//                       Take regular timed tests to improve both speed and accuracy under pressure.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Strong Areas */}
//             {strongSubjects.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                   <TrendingUp className="w-6 h-6 text-green-500" />
//                   Your Strong Areas
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {strongSubjects.map((subject, index) => (
//                     <span key={subject} className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold shadow-sm">
//                       {subject}
//                     </span>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Action Plan */}
//             <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
//               <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                 <Star className="w-6 h-6 text-purple-500" />
//                 Recommended Action Plan
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
//                   <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     1
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Focus on Weak Subjects First</div>
//                     <div className="text-sm text-gray-600">
//                       Start with {weakSubjects[0] || 'your weakest subject'} and practice regularly with focused study sessions.
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
//                   <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     2
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Revise Fundamental Chapters</div>
//                     <div className="text-sm text-gray-600">
//                       Master the key chapters from your weak subjects before moving to advanced topics.
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
//                   <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     3
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Take Timed Practice Tests</div>
//                     <div className="text-sm text-gray-600">
//                       Schedule regular mock tests to improve time management and build exam stamina.
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
//                   <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
//                     4
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Analyze Mistakes Weekly</div>
//                     <div className="text-sm text-gray-600">
//                       Review your incorrect answers weekly to identify patterns and avoid repeating mistakes.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestAnalysis;






// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import QuestionCard from '../components/QuestionCard';
// import { 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   AlertTriangle, 
//   BookOpen, 
//   Target, 
//   TrendingUp, 
//   ArrowLeft,
//   Zap, 
//   Star, 
//   Award, 
//   FileText,
//   BarChart3,
//   PieChart,
//   Users,
//   Calendar
// } from 'lucide-react';

// const TestAnalysis = () => {
//   const { attemptId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [submissionResult, setSubmissionResult] = useState(null);
//   const [timeSpentData, setTimeSpentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     console.log("📍 Location state:", location.state);
    
//     if (location.state?.submissionResult) {
//       console.log("✅ Found submissionResult in location state");
//       setSubmissionResult(location.state.submissionResult);
//       setTimeSpentData(location.state.timeSpentData);
//       localStorage.setItem(`submissionResult_${attemptId}`, JSON.stringify(location.state.submissionResult));
//       localStorage.setItem(`timeSpentData_${attemptId}`, JSON.stringify(location.state.timeSpentData));
//       setLoading(false);
//     } else {
//       const storedResult = localStorage.getItem(`submissionResult_${attemptId}`);
//       const storedTimeData = localStorage.getItem(`timeSpentData_${attemptId}`);
//       if (storedResult) {
//         console.log("✅ Found submissionResult in localStorage");
//         setSubmissionResult(JSON.parse(storedResult));
//         setTimeSpentData(storedTimeData ? JSON.parse(storedTimeData) : null);
//         setLoading(false);
//       } else {
//         console.log("❌ No submissionResult found");
//         setLoading(false);
//       }
//     }
//   }, [attemptId, location.state]);

//   // Format time from seconds to readable format
//   const formatTime = (seconds) => {
//     if (!seconds || seconds < 0) return '0s';
    
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
    
//     if (hours > 0) {
//       return `${hours}h ${minutes}m ${secs}s`;
//     } else if (minutes > 0) {
//       return `${minutes}m ${secs}s`;
//     } else {
//       return `${secs}s`;
//     }
//   };

//   // Calculate percentage
//   const calculatePercentage = (part, total) => {
//     if (!total || total === 0) return 0;
//     return Math.round((part / total) * 100);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your performance analysis...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!submissionResult) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <Card className="p-8 text-center max-w-md">
//           <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Available</h2>
//           <p className="text-gray-600 mb-6">
//             Unable to load test results. Please go back and try again.
//           </p>
//           <Button onClick={() => navigate('/tests')}>
//             Back to Tests
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   // Extract data from submissionResult structure
//   const attempt = submissionResult.attempt;
//   const analytics = attempt?.analytics || {};
//   const scoreData = attempt?.score || {};
//   const user = attempt?.user || {};
//   const questions = attempt?.questions || [];
//   const responses = attempt?.responses || [];

//   // Calculate basic metrics
//   const totalQuestions = questions.length || 0;
//   const correctAnswers = scoreData?.correctAnswers || 0;
//   const wrongAnswers = scoreData?.wrongAnswers || 0;
//   const unattempted = scoreData?.unattempted || 0;
//   const accuracy = scoreData?.accuracy || 0;
//   const obtainedMarks = scoreData?.obtainedMarks || 0;
//   const totalMarks = scoreData?.totalMarks || 0;
//   const totalTimeSpent = attempt?.totalTimeSpent || 0;

//   // NEW: Get chapter analytics from API
//   const chapterWiseAnalysis = analytics?.chapterWiseAnalysis || [];
//   const weakChapters = analytics?.weakChapters || [];
//   const strongChapters = analytics?.strongChapters || [];
//   const subjectWiseAnalysis = analytics?.subjectWiseAnalysis || [];
//   const weakSubjects = analytics?.weakSubjects || [];
//   const strongSubjects = analytics?.strongSubjects || [];

//   // Create a map of question ID to time spent for easy lookup
//   const timeSpentMap = {};
//   if (timeSpentData) {
//     timeSpentData.forEach(item => {
//       timeSpentMap[item.questionId] = item.timeSpent;
//     });
//   } else {
//     responses.forEach(response => {
//       timeSpentMap[response.question] = response.timeSpent || 0;
//     });
//   }

//   // Calculate time analytics
//   const totalTimeSpentOnQuestions = Object.values(timeSpentMap).reduce((sum, time) => sum + (time || 0), 0);
//   const averageTimePerQuestion = totalQuestions > 0 ? Math.round(totalTimeSpentOnQuestions / totalQuestions) : 0;
//   const averageTimePerAttemptedQuestion = (correctAnswers + wrongAnswers) > 0 
//     ? Math.round(totalTimeSpentOnQuestions / (correctAnswers + wrongAnswers)) 
//     : 0;

//   // NEW: Process chapter data for display (using REAL API data)
//   const getChapterPerformanceData = () => {
//     if (!chapterWiseAnalysis.length) return [];

//     return chapterWiseAnalysis
//       .sort((a, b) => a.accuracy - b.accuracy) // Sort by worst performance first
//       .slice(0, 15) // Show top 15 chapters needing improvement
//       .map(chapter => ({
//         name: chapter.chapter,
//         fullName: chapter.chapter,
//         subject: chapter.subject,
//         accuracy: chapter.accuracy,
//         correct: chapter.correct,
//         wrong: chapter.wrong,
//         unattempted: chapter.unattempted,
//         total: chapter.totalQuestions,
//         averageTimeSpent: chapter.averageTimeSpent,
//         totalTimeSpent: chapter.totalTimeSpent,
//         performance: chapter.accuracy >= 75 ? 'strong' : 
//                     chapter.accuracy >= 60 ? 'average' : 'weak'
//       }));
//   };

//   const chapterData = getChapterPerformanceData();

//   // Performance metrics
//   const performanceMetrics = {
//     speed: calculatePercentage(correctAnswers, totalQuestions) > 70 ? 'Fast' : 'Moderate',
//     accuracy: accuracy > 80 ? 'High' : accuracy > 60 ? 'Medium' : 'Low',
//     completion: calculatePercentage((correctAnswers + wrongAnswers), totalQuestions) > 90 ? 'Complete' : 'Partial',
//     timeManagement: averageTimePerQuestion < 60 ? 'Efficient' : 'Needs Improvement'
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </Button>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Performance Analysis</h1>
//                 <p className="text-gray-600">{attempt?.attemptType || "NEET Mock Test"} • {attempt?.test?.name || "Test"}</p>
//                 <p className="text-sm text-gray-500">
//                   Student: {user?.profile?.fullName || user?.username || "User"} • 
//                   Attempt: #{attempt?.attemptNumber || 1}
//                 </p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold text-gray-900">
//                 {correctAnswers}/{totalQuestions}
//               </div>
//               <div className="text-lg text-gray-600">{accuracy.toFixed(1)}% Accuracy</div>
//               <div className="text-sm text-gray-500">{obtainedMarks}/{totalMarks} Marks</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4">
//           <nav className="flex space-x-8">
//             {[
//               { id: 'overview', label: 'Overview', icon: BarChart3 },
//               { id: 'subjects', label: 'Subjects', icon: BookOpen },
//               { id: 'chapters', label: 'Chapters', icon: FileText },
//               { id: 'questions', label: 'Questions', icon: Target },
//               { id: 'time', label: 'Time Analysis', icon: Clock },
//               { id: 'improvement', label: 'Improvement', icon: TrendingUp }
//             ].map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab.id
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto p-6">
        
//         {/* Chapters Tab - USING REAL API DATA */}
//         {activeTab === 'chapters' && (
//           <div className="space-y-6">
//             {/* Chapter Performance Summary */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <Card className="p-6 text-center">
//                 <div className="text-2xl font-bold text-blue-600">{chapterWiseAnalysis.length}</div>
//                 <div className="text-gray-600">Total Chapters</div>
//                 <div className="text-sm text-blue-600 mt-1">In this test</div>
//               </Card>
              
//               <Card className="p-6 text-center">
//                 <div className="text-2xl font-bold text-green-600">{strongChapters.length}</div>
//                 <div className="text-gray-600">Strong Chapters</div>
//                 <div className="text-sm text-green-600 mt-1">Accuracy ≥ 75%</div>
//               </Card>
              
//               <Card className="p-6 text-center">
//                 <div className="text-2xl font-bold text-red-600">{weakChapters.length}</div>
//                 <div className="text-gray-600">Weak Chapters</div>
//                 <div className="text-sm text-red-600 mt-1">Accuracy &lt; 60%</div>
//               </Card>
//             </div>

//             {/* Detailed Chapter Analysis */}
//             <Card className="p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Chapter-wise Performance Analysis</h3>
              
//               {chapterData.length > 0 ? (
//                 <div className="space-y-4">
//                   {chapterData.map((chapter, index) => (
//                     <div 
//                       key={chapter.name} 
//                       className="p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-colors bg-white"
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex-1">
//                           <h4 className="text-lg font-bold text-gray-900 mb-1">{chapter.fullName}</h4>
//                           <div className="flex items-center gap-4 text-sm text-gray-600">
//                             <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                               {chapter.subject}
//                             </span>
//                             <span>{chapter.total} questions</span>
//                             <span>Avg: {formatTime(chapter.averageTimeSpent)}</span>
//                           </div>
//                         </div>
//                         <span className={`px-3 py-1 rounded-full text-sm font-bold ${
//                           chapter.performance === 'strong' 
//                             ? 'bg-green-100 text-green-800 border border-green-200' 
//                             : chapter.performance === 'average'
//                             ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
//                             : 'bg-red-100 text-red-800 border border-red-200'
//                         }`}>
//                           {chapter.accuracy}% Accuracy
//                         </span>
//                       </div>
                      
//                       {/* Progress Bars */}
//                       <div className="grid grid-cols-3 gap-2 mb-3">
//                         <div className="text-center">
//                           <div className="text-sm font-semibold text-green-600">{chapter.correct}</div>
//                           <div className="text-xs text-gray-500">Correct</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-sm font-semibold text-red-600">{chapter.wrong}</div>
//                           <div className="text-xs text-gray-500">Wrong</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-sm font-semibold text-gray-600">{chapter.unattempted}</div>
//                           <div className="text-xs text-gray-500">Unattempted</div>
//                         </div>
//                       </div>
                      
//                       {/* Combined Progress Bar */}
//                       <div className="w-full bg-gray-200 rounded-full h-2.5 flex overflow-hidden">
//                         <div 
//                           className="bg-green-500 h-2.5 transition-all duration-1000"
//                           style={{ width: `${calculatePercentage(chapter.correct, chapter.total)}%` }}
//                           title={`Correct: ${chapter.correct}`}
//                         ></div>
//                         <div 
//                           className="bg-red-500 h-2.5 transition-all duration-1000"
//                           style={{ width: `${calculatePercentage(chapter.wrong, chapter.total)}%` }}
//                           title={`Wrong: ${chapter.wrong}`}
//                         ></div>
//                         <div 
//                           className="bg-gray-400 h-2.5 transition-all duration-1000"
//                           style={{ width: `${calculatePercentage(chapter.unattempted, chapter.total)}%` }}
//                           title={`Unattempted: ${chapter.unattempted}`}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p>No chapter-wise data available</p>
//                   <p className="text-sm mt-2">Complete a test with chapter information to see detailed analysis</p>
//                 </div>
//               )}
//             </Card>

//             {/* Weak Chapters Focus Area */}
//             {weakChapters.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
//                   <AlertTriangle className="w-6 h-6 text-red-500" />
//                   Chapters Needing Immediate Attention
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {weakChapters.slice(0, 6).map((chapter, index) => {
//                     const chapterDetail = chapterWiseAnalysis.find(c => c.chapter === chapter);
//                     return (
//                       <div key={chapter} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <div className="font-semibold text-gray-900">{chapter}</div>
//                             {chapterDetail && (
//                               <div className="text-xs text-gray-500">
//                                 Accuracy: {chapterDetail.accuracy}% • {chapterDetail.correct}/{chapterDetail.total} correct
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         <span className="text-red-600 font-bold text-sm bg-red-100 px-2 py-1 rounded">
//                           Priority
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 {weakChapters.length > 6 && (
//                   <div className="text-center text-red-600 text-sm mt-4">
//                     +{weakChapters.length - 6} more chapters need improvement
//                   </div>
//                 )}
//               </Card>
//             )}

//             {/* Strong Chapters */}
//             {strongChapters.length > 0 && (
//               <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
//                   <TrendingUp className="w-6 h-6 text-green-500" />
//                   Your Strong Chapters
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {strongChapters.slice(0, 10).map((chapter, index) => {
//                     const chapterDetail = chapterWiseAnalysis.find(c => c.chapter === chapter);
//                     return (
//                       <div key={chapter} className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-full border border-green-200">
//                         <CheckCircle className="w-4 h-4" />
//                         <span className="text-sm font-medium">{chapter}</span>
//                         {chapterDetail && (
//                           <span className="text-xs bg-green-200 px-1 rounded">
//                             {chapterDetail.accuracy}%
//                           </span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </Card>
//             )}

//             {/* Chapter Time Analysis */}
//             {chapterData.length > 0 && (
//               <Card className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Chapter Time Analysis</h3>
//                 <div className="space-y-4">
//                   {chapterData
//                     .filter(chapter => chapter.averageTimeSpent > 0)
//                     .sort((a, b) => b.averageTimeSpent - a.averageTimeSpent)
//                     .slice(0, 5)
//                     .map((chapter, index) => (
//                       <div key={chapter.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div className="flex items-center gap-3">
//                           <Clock className="w-5 h-5 text-blue-500" />
//                           <span className="font-medium text-gray-900">{chapter.fullName}</span>
//                           <span className="text-sm text-gray-500">({chapter.subject})</span>
//                         </div>
//                         <div className="text-right">
//                           <div className="font-bold text-gray-900">{formatTime(chapter.averageTimeSpent)}</div>
//                           <div className="text-xs text-gray-500">avg per question</div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </Card>
//             )}
//           </div>
//         )}

//         {/* Other tabs (Overview, Subjects, Questions, Time, Improvement) */}
//         {/* ... existing code for other tabs ... */}
        
//       </div>
//     </div>
//   );
// };

// export default TestAnalysis;




import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import QuestionCard from '../components/QuestionCard';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  Target, 
  TrendingUp, 
  ArrowLeft,
  Zap, 
  Star, 
  Award, 
  FileText,
  BarChart3,
  PieChart,
  Users,
  Calendar
} from 'lucide-react';

const TestAnalysis = () => {
  const { attemptId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [timeSpentData, setTimeSpentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChapterSubject, setActiveChapterSubject] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    console.log("📍 Location state:", location.state);
    
    if (location.state?.submissionResult) {
      console.log("✅ Found submissionResult in location state");
      setSubmissionResult(location.state.submissionResult);
      setTimeSpentData(location.state.timeSpentData);
      // localStorage.setItem(`submissionResult_${attemptId}`, JSON.stringify(location.state.submissionResult));
      // localStorage.setItem(`timeSpentData_${attemptId}`, JSON.stringify(location.state.timeSpentData));
      setLoading(false);
    } else {
      const storedResult = localStorage.getItem(`submissionResult_${attemptId}`);
      const storedTimeData = localStorage.getItem(`timeSpentData_${attemptId}`);
      if (storedResult) {
        console.log("✅ Found submissionResult in localStorage");
        setSubmissionResult(JSON.parse(storedResult));
        setTimeSpentData(storedTimeData ? JSON.parse(storedTimeData) : null);
        setLoading(false);
      } else {
        console.log("❌ No submissionResult found");
        setLoading(false);
      }
    }
  }, [attemptId, location.state]);

  // Format time from seconds to readable format
  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return '0s';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Calculate percentage
  const calculatePercentage = (part, total) => {
    if (!total || total === 0) return 0;
    return Math.round((part / total) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your performance analysis...</p>
        </div>
      </div>
    );
  }

  if (!submissionResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Available</h2>
          <p className="text-gray-600 mb-6">
            Unable to load test results. Please go back and try again.
          </p>
          <Button onClick={() => navigate('/tests')}>
            Back to Tests
          </Button>
        </Card>
      </div>
    );
  }

  // Extract data from submissionResult structure
  const attempt = submissionResult.attempt;
  const analytics = attempt?.analytics || {};
  const scoreData = attempt?.score || {};
  const user = attempt?.user || {};
  const questions = attempt?.questions || [];
  const responses = attempt?.responses || [];

  // Calculate basic metrics
  const totalQuestions = questions.length || 0;
  const correctAnswers = scoreData?.correctAnswers || 0;
  const wrongAnswers = scoreData?.wrongAnswers || 0;
  const unattempted = scoreData?.unattempted || 0;
  const accuracy = scoreData?.accuracy || 0;
  const obtainedMarks = scoreData?.obtainedMarks || 0;
  const totalMarks = scoreData?.totalMarks || 0;
  const totalTimeSpent = attempt?.totalTimeSpent || 0;

  // Get analytics from API
  const chapterWiseAnalysis = analytics?.chapterWiseAnalysis || [];
  const weakChapters = analytics?.weakChapters || [];
  const strongChapters = analytics?.strongChapters || [];
  const subjectWiseAnalysis = analytics?.subjectWiseAnalysis || [];
  const weakSubjects = analytics?.weakSubjects || [];
  const strongSubjects = analytics?.strongSubjects || [];

  // Create a map of question ID to time spent for easy lookup
  const timeSpentMap = {};
  if (timeSpentData) {
    timeSpentData.forEach(item => {
      timeSpentMap[item.questionId] = item.timeSpent;
    });
  } else {
    responses.forEach(response => {
      timeSpentMap[response.question] = response.timeSpent || 0;
    });
  }

  // Calculate time analytics
  const totalTimeSpentOnQuestions = Object.values(timeSpentMap).reduce((sum, time) => sum + (time || 0), 0);
  const averageTimePerQuestion = totalQuestions > 0 ? Math.round(totalTimeSpentOnQuestions / totalQuestions) : 0;
  const averageTimePerAttemptedQuestion = (correctAnswers + wrongAnswers) > 0 
    ? Math.round(totalTimeSpentOnQuestions / (correctAnswers + wrongAnswers)) 
    : 0;

  // Process chapter data for display
  const getChapterPerformanceData = () => {
    if (!chapterWiseAnalysis.length) return [];

    return chapterWiseAnalysis
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 15)
      .map(chapter => ({
        name: chapter.chapter,
        fullName: chapter.chapter,
        subject: chapter.subject,
        accuracy: chapter.accuracy,
        correct: chapter.correct,
        wrong: chapter.wrong,
        unattempted: chapter.unattempted,
        total: chapter.totalQuestions,
        averageTimeSpent: chapter.averageTimeSpent,
        totalTimeSpent: chapter.totalTimeSpent,
        performance: chapter.accuracy >= 75 ? 'strong' : 
                    chapter.accuracy >= 60 ? 'average' : 'weak'
      }));
  };

  const chapterData = getChapterPerformanceData();

  // Time distribution analysis
  const timeDistribution = [
    { range: '0-30s', count: 0 },
    { range: '31-60s', count: 0 },
    { range: '1-2m', count: 0 },
    { range: '2-3m', count: 0 },
    { range: '3m+', count: 0 }
  ];

  // Calculate time distribution
  Object.values(timeSpentMap).forEach(time => {
    if (time <= 30) timeDistribution[0].count++;
    else if (time <= 60) timeDistribution[1].count++;
    else if (time <= 120) timeDistribution[2].count++;
    else if (time <= 180) timeDistribution[3].count++;
    else timeDistribution[4].count++;
  });

  // Performance metrics
  const performanceMetrics = {
    speed: calculatePercentage(correctAnswers, totalQuestions) > 70 ? 'Fast' : 'Moderate',
    accuracy: accuracy > 80 ? 'High' : accuracy > 60 ? 'Medium' : 'Low',
    completion: calculatePercentage((correctAnswers + wrongAnswers), totalQuestions) > 90 ? 'Complete' : 'Partial',
    timeManagement: averageTimePerQuestion < 60 ? 'Efficient' : 'Needs Improvement'
  };

  // Difficulty analysis
  const difficultyData = [
    { 
      level: 'Easy', 
      correct: Math.round(correctAnswers * 0.4), 
      total: Math.round(totalQuestions * 0.4), 
      color: '#10B981' 
    },
    { 
      level: 'Medium', 
      correct: Math.round(correctAnswers * 0.4), 
      total: Math.round(totalQuestions * 0.4), 
      color: '#F59E0B' 
    },
    { 
      level: 'Hard', 
      correct: Math.round(correctAnswers * 0.2), 
      total: Math.round(totalQuestions * 0.2), 
      color: '#EF4444' 
    }
  ].map(item => ({
    ...item,
    accuracy: calculatePercentage(item.correct, item.total),
    incorrect: item.total - item.correct
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Performance Analysis</h1>
                <p className="text-gray-600">{attempt?.attemptType || "NEET Mock Test"} • {attempt?.test?.name || "Test"}</p>
                <p className="text-sm text-gray-500">
                  Student: {user?.profile?.fullName || user?.username || "User"} • 
                  Attempt: #{attempt?.attemptNumber || 1}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-lg text-gray-600">{accuracy.toFixed(1)}% Accuracy</div>
              <div className="text-sm text-gray-500">{obtainedMarks}/{totalMarks} Marks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'subjects', label: 'Subjects', icon: BookOpen },
              { id: 'chapters', label: 'Chapters', icon: FileText },
              { id: 'questions', label: 'Questions', icon: Target },
              { id: 'time', label: 'Time Analysis', icon: Clock },
              { id: 'improvement', label: 'Improvement', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                <div className="text-3xl font-bold text-gray-900">{correctAnswers}</div>
                <div className="text-gray-600 font-medium">Correct Answers</div>
                <div className="text-sm text-green-600 mt-1">
                  {calculatePercentage(correctAnswers, totalQuestions)}% of total
                </div>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <XCircle className="w-12 h-12 mx-auto mb-3 text-red-600" />
                <div className="text-3xl font-bold text-gray-900">{wrongAnswers}</div>
                <div className="text-gray-600 font-medium">Wrong Answers</div>
                <div className="text-sm text-red-600 mt-1">
                  {calculatePercentage(wrongAnswers, totalQuestions)}% of total
                </div>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
                <div className="text-3xl font-bold text-gray-900">{unattempted}</div>
                <div className="text-gray-600 font-medium">Unattempted</div>
                <div className="text-sm text-yellow-600 mt-1">
                  {calculatePercentage(unattempted, totalQuestions)}% of total
                </div>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <Award className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900">{accuracy.toFixed(1)}%</div>
                <div className="text-gray-600 font-medium">Overall Accuracy</div>
                <div className="text-sm text-blue-600 mt-1">
                  Based on attempted questions
                </div>
              </Card>
            </div>

            {/* Score and Time Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Marks:</span>
                    <span className="font-bold text-gray-900">{totalMarks}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Marks Obtained:</span>
                    <span className="font-bold text-green-600">{obtainedMarks}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Percentage:</span>
                    <span className="font-bold text-blue-600">
                      {calculatePercentage(obtainedMarks, totalMarks)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Rank Prediction:</span>
                    <span className="font-bold text-purple-600">
                      {attempt?.predictedRank ? `#${attempt.predictedRank}` : 'N/A'}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Time Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Time Spent:</span>
                    <span className="font-bold text-gray-900">{formatTime(totalTimeSpent)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Avg Time/Question:</span>
                    <span className="font-bold text-blue-600">{formatTime(averageTimePerQuestion)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Avg Time/Attempted:</span>
                    <span className="font-bold text-green-600">{formatTime(averageTimePerAttemptedQuestion)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Time Efficiency:</span>
                    <span className={`font-bold ${
                      performanceMetrics.timeManagement === 'Efficient' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {performanceMetrics.timeManagement}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance Metrics */}
            {/* <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <Zap className={`w-8 h-8 mx-auto mb-2 ${
                    performanceMetrics.speed === 'Fast' ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                  <div className="font-semibold text-gray-900">{performanceMetrics.speed}</div>
                  <div className="text-sm text-gray-600">Speed</div>
                </div>
                <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <Target className={`w-8 h-8 mx-auto mb-2 ${
                    performanceMetrics.accuracy === 'High' ? 'text-green-500' : 
                    performanceMetrics.accuracy === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                  }`} />
                  <div className="font-semibold text-gray-900">{performanceMetrics.accuracy}</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${
                    performanceMetrics.completion === 'Complete' ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                  <div className="font-semibold text-gray-900">{performanceMetrics.completion}</div>
                  <div className="text-sm text-gray-600">Completion</div>
                </div>
                <div className="text-center p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <Clock className={`w-8 h-8 mx-auto mb-2 ${
                    performanceMetrics.timeManagement === 'Efficient' ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                  <div className="font-semibold text-gray-900">{performanceMetrics.timeManagement}</div>
                  <div className="text-sm text-gray-600">Time Mgmt</div>
                </div>
              </div>
            </Card> */}

            {/* Difficulty Performance */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance by Difficulty Level</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {difficultyData.map((difficulty) => (
                  <div key={difficulty.level} className="text-center p-6 border-2 rounded-xl bg-white hover:shadow-lg transition-shadow">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      style={{ backgroundColor: difficulty.color }}
                    >
                      {difficulty.accuracy}%
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-2">{difficulty.level}</div>
                    <div className="text-sm text-gray-600 mb-1">
                      {difficulty.correct}/{difficulty.total} Correct
                    </div>
                    <div className="text-xs text-gray-500">
                      Accuracy: {difficulty.accuracy}%
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Subject-wise Performance</h3>
              
              {subjectWiseAnalysis.length > 0 ? (
                <div className="space-y-6">
                  {subjectWiseAnalysis.map((subject, index) => (
                    <div key={subject.subject} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{subject.subject}</h4>
                          <p className="text-gray-600 text-sm">
                            {subject.totalQuestions} questions • {subject.attempted} attempted
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          subject.accuracy >= 70 ? 'bg-green-100 text-green-800 border border-green-200' :
                          subject.accuracy >= 40 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                          'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {subject.accuracy}% Accuracy
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{subject.correct}</div>
                          <div className="text-sm text-green-700">Correct</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-xl font-bold text-red-600">{subject.wrong}</div>
                          <div className="text-sm text-red-700">Wrong</div>
                        </div>
                        
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            subject.accuracy >= 70 ? 'bg-green-500' :
                            subject.accuracy >= 40 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(subject.accuracy, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No subject-wise data available</p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Chapters Tab */}
       {activeTab === 'chapters' && (
  <div className="space-y-6">
    {/* Chapter Performance Summary */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6 text-center">
        <div className="text-2xl font-bold text-blue-600">
          {analytics?.chapterWiseAnalysis?.length || 0}
        </div>
        <div className="text-gray-600">Total Chapters</div>
        <div className="text-sm text-blue-600 mt-1">In this test</div>
      </Card>
      
      <Card className="p-6 text-center">
        <div className="text-2xl font-bold text-green-600">
          {analytics?.strongChapters?.length || 0}
        </div>
        <div className="text-gray-600">Strong Chapters</div>
        <div className="text-sm text-green-600 mt-1">Accuracy ≥ 75%</div>
      </Card>
      
      <Card className="p-6 text-center">
        <div className="text-2xl font-bold text-red-600">
          {analytics?.weakChapters?.length || 0}
        </div>
        <div className="text-gray-600">Weak Chapters</div>
        <div className="text-sm text-red-600 mt-1">Accuracy &lt; 60%</div>
      </Card>
    </div>

    {/* Chapter Performance Overview */}
    <Card className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        Chapter Performance Overview
      </h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Total Accuracy: <span className="font-bold">{accuracy.toFixed(1)}%</span></span>
          <span className="text-gray-700">
            <span className="font-bold text-green-600">{correctAnswers}</span> correct / 
            <span className="font-bold text-red-600"> {wrongAnswers}</span> wrong / 
            <span className="font-bold text-gray-600"> {unattempted}</span> unattempted
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
            style={{ width: `${accuracy}%` }}
          ></div>
        </div>
      </div>
    </Card>

    {/* Detailed Chapter Analysis */}
    <Card className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Chapter-wise Performance Analysis</h3>
      
      {/* Subject Filter Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        {['All', 'Biology', 'Chemistry', 'Physics'].map((subject) => (
          <button
            key={subject}
            onClick={() => setActiveChapterSubject(subject)}
            className={`flex-shrink-0 px-4 py-2 font-medium text-sm border-b-2 ${
              activeChapterSubject === subject
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
      
      {analytics?.chapterWiseAnalysis?.length > 0 ? (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {analytics.chapterWiseAnalysis
            .filter(chapter => 
              activeChapterSubject === 'All' || 
              chapter.subject === activeChapterSubject
            )
            .sort((a, b) => b.accuracy - a.accuracy) // Sort by accuracy descending
            .map((chapter, index) => {
              const isWeak = analytics.weakChapters?.includes(chapter.chapter);
              const isStrong = analytics.strongChapters?.includes(chapter.chapter);
              
              return (
                <div 
                  key={chapter.chapter + index} 
                  className={`p-4 border-2 rounded-xl hover:shadow-md transition-all ${
                    isStrong ? 'border-green-200 bg-green-50' :
                    isWeak ? 'border-red-200 bg-red-50' :
                    'border-gray-100 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-gray-900">{chapter.chapter}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          chapter.subject === 'Biology' ? 'bg-green-100 text-green-800' :
                          chapter.subject === 'Chemistry' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {chapter.subject}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{chapter.totalQuestions} questions</span>
                        <span>•</span>
                        <span>{chapter.attempted} attempted</span>
                        <span>•</span>
                        <span>Avg: {formatTime(chapter.averageTimeSpent)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        chapter.accuracy >= 75 ? 'text-green-600' :
                        chapter.accuracy >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {chapter.accuracy}%
                      </div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="text-sm font-semibold text-green-600">{chapter.correct}</div>
                      <div className="text-xs text-gray-500">Correct</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="text-sm font-semibold text-red-600">{chapter.wrong}</div>
                      <div className="text-xs text-gray-500">Wrong</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <div className="text-sm font-semibold text-yellow-600">{chapter.unattempted}</div>
                      <div className="text-xs text-gray-500">Unattempted</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="text-sm font-semibold text-blue-600">
                        {chapter.totalTimeSpent > 0 ? formatTime(chapter.totalTimeSpent) : '0s'}
                      </div>
                      <div className="text-xs text-gray-500">Total Time</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 flex overflow-hidden">
                    <div 
                      className="bg-green-500 h-2.5 transition-all duration-1000"
                      style={{ width: `${calculatePercentage(chapter.correct, chapter.totalQuestions)}%` }}
                      title={`Correct: ${chapter.correct}`}
                    ></div>
                    <div 
                      className="bg-red-500 h-2.5 transition-all duration-1000"
                      style={{ width: `${calculatePercentage(chapter.wrong, chapter.totalQuestions)}%` }}
                      title={`Wrong: ${chapter.wrong}`}
                    ></div>
                    <div 
                      className="bg-gray-400 h-2.5 transition-all duration-1000"
                      style={{ width: `${calculatePercentage(chapter.unattempted, chapter.totalQuestions)}%` }}
                      title={`Unattempted: ${chapter.unattempted}`}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No chapter-wise data available</p>
          <p className="text-sm mt-2">Complete a test with chapter information to see detailed analysis</p>
        </div>
      )}
    </Card>

    {/* Weak Chapters Focus Area */}
    {analytics?.weakChapters?.length > 0 && (
      <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Chapters Needing Immediate Attention
          <span className="ml-auto text-sm font-normal text-red-600">
            {analytics.weakChapters.length} chapters
          </span>
        </h3>
        <div className="mb-4 text-sm text-gray-600">
          These chapters have accuracy below 60%. Focus on improving these areas first.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analytics.weakChapters.slice(0, 6).map((chapterName, index) => {
            const chapterDetail = analytics.chapterWiseAnalysis?.find(c => c.chapter === chapterName);
            return (
              <div key={chapterName} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200 hover:border-red-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{chapterName}</div>
                    {chapterDetail && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Accuracy: {chapterDetail.accuracy}%</span>
                        <span className="mx-2">•</span>
                        <span>{chapterDetail.correct}/{chapterDetail.totalQuestions} correct</span>
                        <span className="mx-2">•</span>
                        <span>{chapterDetail.subject}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {chapterDetail && (
                    <div className="text-red-600 font-bold">{chapterDetail.accuracy}%</div>
                  )}
                  <span className="text-red-600 text-xs bg-red-100 px-2 py-1 rounded">
                    Priority
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {analytics.weakChapters.length > 6 && (
          <div className="text-center text-red-600 text-sm mt-4">
            +{analytics.weakChapters.length - 6} more chapters need improvement
          </div>
        )}
      </Card>
    )}

    {/* Strong Chapters - Even if empty, show message */}
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-green-500" />
        Your Strong Chapters
        <span className="ml-auto text-sm font-normal text-green-600">
          {analytics?.strongChapters?.length || 0} chapters
        </span>
      </h3>
      
      {analytics?.strongChapters?.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Great job! These chapters have accuracy of 75% or higher.
          </div>
          <div className="flex flex-wrap gap-2">
            {analytics.strongChapters.slice(0, 10).map((chapterName) => {
              const chapterDetail = analytics.chapterWiseAnalysis?.find(c => c.chapter === chapterName);
              return (
                <div key={chapterName} className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-full border border-green-200 hover:bg-green-200 transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{chapterName}</span>
                  {chapterDetail && (
                    <span className="text-xs bg-green-200 px-2 py-1 rounded-full font-bold">
                      {chapterDetail.accuracy}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-gray-600">
          <p>No chapters with accuracy ≥ 75% yet.</p>
          <p className="text-sm mt-1">Aim for 75% accuracy in more chapters to see them here.</p>
        </div>
      )}
    </Card>

    {/* Chapter Time Analysis */}
    {analytics?.chapterWiseAnalysis?.length > 0 && (
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Chapter Time Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slowest Chapters */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              Slowest Chapters (Most Time/Question)
            </h4>
            <div className="space-y-3">
              {analytics.chapterWiseAnalysis
                .filter(chapter => chapter.averageTimeSpent > 0 && chapter.attempted > 0)
                .sort((a, b) => b.averageTimeSpent - a.averageTimeSpent)
                .slice(0, 5)
                .map((chapter, index) => (
                  <div key={chapter.chapter} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{chapter.chapter}</div>
                        <div className="text-xs text-gray-500">{chapter.subject}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatTime(chapter.averageTimeSpent)}</div>
                      <div className="text-xs text-gray-500">avg per question</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Fastest Chapters */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              Fastest Chapters (Least Time/Question)
            </h4>
            <div className="space-y-3">
              {analytics.chapterWiseAnalysis
                .filter(chapter => chapter.averageTimeSpent > 0 && chapter.attempted > 0)
                .sort((a, b) => a.averageTimeSpent - b.averageTimeSpent)
                .slice(0, 5)
                .map((chapter, index) => (
                  <div key={chapter.chapter} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{chapter.chapter}</div>
                        <div className="text-xs text-gray-500">{chapter.subject}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatTime(chapter.averageTimeSpent)}</div>
                      <div className="text-xs text-gray-500">avg per question</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>
    )}
  </div>
)}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Question Analysis</h3>
              
              {questions.length > 0 ? (
                <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  {questions.map((question, index) => {
                    const response = responses.find(r => r.question === question._id);
                    const status = response?.isCorrect ? 'correct' : 
                                  response?.selectedOption !== null && response?.selectedOption !== undefined ? 'wrong' : 'unattempted';
                    const correctOption = question.options.find(opt => opt.isCorrect);
                    const userSelectedOptionIndex = response?.selectedOption;
                    const userSelectedOption = userSelectedOptionIndex !== null && userSelectedOptionIndex !== undefined 
                      ? question.options[userSelectedOptionIndex]?.optionText 
                      : null;
                    const timeSpent = timeSpentMap[question._id] || 0;
                    
                    return (
                      <QuestionCard 
                        key={question._id}
                        question={question}
                        index={index}
                        status={status}
                        correctOption={correctOption}
                        userSelectedOption={userSelectedOption}
                        correctAnswers={correctAnswers}
                        timeSpent={timeSpent}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No question data available</p>
                  <p className="text-sm mt-2">Complete a test to see detailed question analysis</p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Time Analysis Tab */}
        {activeTab === 'time' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Time Distribution Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">Time Spent Distribution</h4>
                  <div className="space-y-3">
                    {timeDistribution.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{item.range}</span>
                        <span className="font-semibold text-gray-900">
                          {item.count} questions ({calculatePercentage(item.count, totalQuestions)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">Time Efficiency</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Fast Questions (0-30s)</span>
                        <span className="font-bold text-blue-600">{timeDistribution[0].count}</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${calculatePercentage(timeDistribution[0].count, totalQuestions)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Optimal Questions (31s-2m)</span>
                        <span className="font-bold text-green-600">
                          {timeDistribution[1].count + timeDistribution[2].count}
                        </span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${calculatePercentage(timeDistribution[1].count + timeDistribution[2].count, totalQuestions)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Slow Questions (2m+)</span>
                        <span className="font-bold text-red-600">
                          {timeDistribution[3].count + timeDistribution[4].count}
                        </span>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${calculatePercentage(timeDistribution[3].count + timeDistribution[4].count, totalQuestions)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Time vs Accuracy Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{formatTime(averageTimePerQuestion)}</div>
                  <div className="text-gray-600">Average Time per Question</div>
                  <div className="text-sm text-blue-600 mt-2">
                    {averageTimePerQuestion < 60 ? 'Excellent pace' : 
                     averageTimePerQuestion < 120 ? 'Good pace' : 'Consider improving speed'}
                  </div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <Target className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{accuracy.toFixed(1)}%</div>
                  <div className="text-gray-600">Accuracy at Current Pace</div>
                  <div className="text-sm text-green-600 mt-2">
                    {accuracy > 80 ? 'Great accuracy!' : 
                     accuracy > 60 ? 'Good accuracy' : 'Focus on accuracy'}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Improvement Tab */}
        {activeTab === 'improvement' && (
          <div className="space-y-6">
            {/* Weak Subjects */}
            {weakSubjects.length > 0 && (
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Subjects Needing Improvement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weakSubjects.map((subject, index) => (
                    <div key={subject} className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-gray-900">{subject}</span>
                      </div>
                      <div className="text-orange-600 font-bold">
                        Priority {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Weak Chapters */}
            {weakChapters.length > 0 && (
              <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-red-500" />
                  Chapters Requiring Focus
                </h3>
                <div className="space-y-3">
                  {weakChapters.slice(0, 10).map((chapter, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-800">{chapter}</span>
                      </div>
                      <span className="text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded">
                        High Priority
                      </span>
                    </div>
                  ))}
                </div>
                {weakChapters.length > 10 && (
                  <div className="text-center text-red-600 text-sm mt-4">
                    +{weakChapters.length - 10} more chapters to focus on
                  </div>
                )}
              </Card>
            )}

            {/* Time Management Tips */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-500" />
                Time Management Recommendations
              </h3>
              <div className="space-y-4">
                {averageTimePerQuestion > 120 && (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Improve Question Solving Speed</div>
                      <div className="text-sm text-gray-600">
                        Your average time per question is {formatTime(averageTimePerQuestion)}. 
                        Practice with time limits to improve speed.
                      </div>
                    </div>
                  </div>
                )}
                
                {unattempted > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Reduce Unattempted Questions</div>
                      <div className="text-sm text-gray-600">
                        You left {unattempted} questions unanswered. Develop a strategy to attempt all questions.
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Practice Mock Tests Regularly</div>
                    <div className="text-sm text-gray-600">
                      Take regular timed tests to improve both speed and accuracy under pressure.
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Strong Areas */}
            {strongSubjects.length > 0 && (
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  Your Strong Areas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {strongSubjects.map((subject, index) => (
                    <span key={subject} className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold shadow-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Action Plan */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-purple-500" />
                Recommended Action Plan
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Focus on Weak Subjects First</div>
                    <div className="text-sm text-gray-600">
                      Start with {weakSubjects[0] || 'your weakest subject'} and practice regularly with focused study sessions.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Revise Fundamental Chapters</div>
                    <div className="text-sm text-gray-600">
                      Master the key chapters from your weak subjects before moving to advanced topics.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Take Timed Practice Tests</div>
                    <div className="text-sm text-gray-600">
                      Schedule regular mock tests to improve time management and build exam stamina.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-purple-200">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Analyze Mistakes Weekly</div>
                    <div className="text-sm text-gray-600">
                      Review your incorrect answers weekly to identify patterns and avoid repeating mistakes.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAnalysis;