






// // src/pages/TestResult.jsx

// import React, { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAttemptStore } from '../store/attemptStore';
// import ScoreCard from '../components/analytics/ScoreCard';
// import SubjectChart from '../components/analytics/SubjectChart';
// import WeakAreasAlert from '../components/analytics/WeakAreasAlert';
// import LeaderboardWidget from '../components/analytics/LeaderBoardWidget';
// import ChapterChart from '../components/analytics/ChapterChart';
// import TopicChart from '../components/analytics/TopicChart';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import Spinner from '../components/ui/Spinner';
// import { downloadReportPDF } from '../utils/reportGenerator';
// import { formatPercentage } from '../utils/formatters';

// const TestResult = () => {
//   const { attemptId } = useParams();
//   const navigate = useNavigate();
//   const { report, fetchReport, loading } = useAttemptStore();

//   useEffect(() => {
//     fetchReport(attemptId);
//   }, [attemptId]);

//   if (loading || !report) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   const {
//     score,
//     totalTimeSpent,
//     predictedRank,
//     analytics,
//     test,
//     responses,
//     leaderboard
//   } = report;

//   const subjectData = analytics?.subjectWiseAnalysis.map(item => ({
//     label: item.subject,
//     value: parseFloat(item.accuracy?.toFixed(2))
//   }));

//   const chapterData = analytics?.chapterWiseAnalysis.map(item => ({
//     label: item.chapter,
//     value: parseFloat(item.accuracy?.toFixed(2))
//   }));

//   const topicData = analytics?.topicWiseAnalysis.map(item => ({
//     label: item.topic,
//     value: parseFloat(item.accuracy?.toFixed(2))
//   }));

//   const weakTopics = analytics?.weakTopics;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Score Section */}
//       <ScoreCard
//         score={score}
//         totalTime={totalTimeSpent}
//         predictedRank={predictedRank}
//         onDownload={() => downloadReportPDF(report)}
//       />

//       {/* Subject Chart */}
//       <Card className="p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject-wise Accuracy</h2>
//         <SubjectChart data={subjectData} />
//       </Card>

//       {/* Chapter Chart */}
//       <Card className="p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Chapter-wise Accuracy</h2>
//         <ChapterChart data={chapterData} />
//       </Card>

//       {/* Topic Chart */}
//       <Card className="p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Topic-wise Accuracy</h2>
//         <TopicChart data={topicData} />
//       </Card>

//       {/* Weak Areas */}
//       {weakTopics && weakTopics.length > 0 && (
//         <WeakAreasAlert
//           topics={weakTopics}
//           onPractice={(topics) => {
//             // Navigate to chapterwise practice for the first weak topic
//             const [subject, chapter, topic] = topics[0].split(' / ');
//             navigate(`/chapterwise/${subject}/${chapter}/${topic}`);
//           }}
//         />
//       )}

//       {/* Leaderboard */}
//       <Card className="p-6 mb-6">
//         <LeaderboardWidget
//           leaderboard={leaderboard}
//           userRank={leaderboard?.userRank}
//           totalParticipants={leaderboard?.entries?.length || 0}
//         />
//       </Card>

//       {/* Detailed Responses */}
//       <Card className="p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Per-Question Report</h2>
//         {responses.map((r, idx) => (
//           <div key={idx} className="mb-4">
//             <p className="font-medium">
//               Q{idx + 1}: {r.questionText}
//             </p>
//             <p>
//               Your Answer: {r.selectedOption} — {r.isCorrect ? 'Correct' : 'Wrong'}
//             </p>
//             <p>Time Spent: {r.timeSpent}s</p>
//             <hr className="my-2" />
//           </div>
//         ))}
//       </Card>

//       {/* View Full Report Button */}
//       <div className="text-center mt-8">
//         <Button onClick={() => navigate(`/attempts/${attemptId}/report`)}>
//           View Full Report
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TestResult;

// src/pages/TestAnalysis.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAttemptStore } from '../store/attemptStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { 
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  CheckCircle, XCircle, Clock, AlertTriangle, 
  BookOpen, Target, TrendingUp, ArrowLeft,
  Zap, Star, Award, FileText
} from 'lucide-react';

const TestAnalysis = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { report, fetchReport, loading } = useAttemptStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchReport(attemptId);
  }, [attemptId]);

  if (loading || !report) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Spinner size={48} className="mx-auto mb-4" />
          <p className="text-gray-600">Loading your performance analysis...</p>
        </div>
      </div>
    );
  }

  const {
    score,
    totalMarks,
    totalTimeSpent,
    analytics,
    test,
    responses
  } = report;

  // Calculate basic metrics
  const accuracy = Math.round((score.correct / score.total) * 100);
  const averageTimePerQuestion = Math.round(totalTimeSpent / score.total);

  // Process subject data
  const subjectData = analytics?.subjectWiseAnalysis?.map(item => ({
    name: item.subject,
    correct: item.correct,
    incorrect: item.incorrect,
    unanswered: item.unanswered,
    total: item.correct + item.incorrect + item.unanswered,
    accuracy: Math.round(item.accuracy),
    timeSpent: item.timeSpent
  })) || [];

  // Process chapter data
  const chapterData = analytics?.chapterWiseAnalysis?.map(item => ({
    name: item.chapter.length > 20 ? item.chapter.substring(0, 20) + '...' : item.chapter,
    fullName: item.chapter,
    accuracy: Math.round(item.accuracy),
    correct: item.correct,
    incorrect: item.incorrect,
    total: item.totalQuestions
  })) || [];

  // Process topic data
  const topicData = analytics?.topicWiseAnalysis?.map(item => ({
    name: item.topic.length > 15 ? item.topic.substring(0, 15) + '...' : item.topic,
    fullName: item.topic,
    accuracy: Math.round(item.accuracy),
    correct: item.correct,
    incorrect: item.incorrect,
    total: item.totalQuestions
  })) || [];

  // Difficulty analysis
  const difficultyData = [
    { 
      level: 'Easy', 
      correct: analytics?.difficultyAnalysis?.easy?.correct || 0, 
      total: analytics?.difficultyAnalysis?.easy?.total || 1,
      color: '#10B981'
    },
    { 
      level: 'Medium', 
      correct: analytics?.difficultyAnalysis?.medium?.correct || 0, 
      total: analytics?.difficultyAnalysis?.medium?.total || 1,
      color: '#F59E0B'
    },
    { 
      level: 'Hard', 
      correct: analytics?.difficultyAnalysis?.hard?.correct || 0, 
      total: analytics?.difficultyAnalysis?.hard?.total || 1,
      color: '#EF4444'
    }
  ].map(item => ({
    ...item,
    accuracy: Math.round((item.correct / item.total) * 100),
    incorrect: item.total - item.correct
  }));

  // Identify weak areas
  const weakSubjects = subjectData.filter(subject => subject.accuracy < 70);
  const weakChapters = chapterData.filter(chapter => chapter.accuracy < 70);
  const weakTopics = topicData.filter(topic => topic.accuracy < 70);

  // Time analysis per question
  const timeAnalysis = responses?.map((response, index) => ({
    question: index + 1,
    timeSpent: response.timeSpent,
    correct: response.isCorrect,
    subject: response.subject,
    difficulty: response.difficulty
  })) || [];

  // Colors for charts
  const COLORS = ['#10B981', '#EF4444', '#6B7280', '#3B82F6', '#8B5CF6', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
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
                <p className="text-gray-600">{test?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {score.correct}/{score.total} Correct
                </div>
                <div className="text-sm text-gray-600">{accuracy}% Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart },
              { id: 'subjects', label: 'Subjects', icon: BookOpen },
              { id: 'chapters', label: 'Chapters', icon: FileText },
              { id: 'questions', label: 'Questions', icon: Target },
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{score.correct}</div>
                <div className="text-gray-600">Correct Answers</div>
              </Card>
              
              <Card className="p-6 text-center">
                <XCircle className="w-8 h-8 mx-auto mb-3 text-red-600" />
                <div className="text-2xl font-bold text-gray-900">{score.incorrect}</div>
                <div className="text-gray-600">Incorrect Answers</div>
              </Card>
              
              <Card className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{averageTimePerQuestion}s</div>
                <div className="text-gray-600">Avg Time per Question</div>
              </Card>
              
              <Card className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
                <div className="text-gray-600">Overall Accuracy</div>
              </Card>
            </div>

            {/* Difficulty Performance */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Difficulty Level</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {difficultyData.map((difficulty) => (
                  <div key={difficulty.level} className="text-center p-4 border rounded-lg">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: difficulty.color }}
                    >
                      {difficulty.accuracy}%
                    </div>
                    <div className="font-semibold text-gray-900">{difficulty.level}</div>
                    <div className="text-sm text-gray-600">
                      {difficulty.correct}/{difficulty.total} Correct
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Time Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Spent per Question</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="question" />
                  <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar 
                    dataKey="timeSpent" 
                    fill="#3B82F6"
                    radius={[2, 2, 0, 0]}
                  >
                    {timeAnalysis.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.correct ? '#10B981' : '#EF4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Correct Answers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Incorrect Answers</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" name="Correct" fill="#10B981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="incorrect" name="Incorrect" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="unanswered" name="Unanswered" fill="#6B7280" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Subject Accuracy */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Accuracy</h3>
              <div className="space-y-4">
                {subjectData.map((subject, index) => (
                  <div key={subject.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {subject.correct}/{subject.total}
                      </span>
                      <span className={`font-semibold ${
                        subject.accuracy >= 80 ? 'text-green-600' : 
                        subject.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {subject.accuracy}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Chapters Tab */}
        {activeTab === 'chapters' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapter-wise Accuracy</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chapterData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                    labelFormatter={(value, payload) => payload?.[0]?.payload.fullName || value}
                  />
                  <Bar dataKey="accuracy" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                    {chapterData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.accuracy >= 70 ? '#10B981' : entry.accuracy >= 50 ? '#F59E0B' : '#EF4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Chapter Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapter Performance Details</h3>
              <div className="space-y-3">
                {chapterData.map((chapter, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{chapter.fullName}</div>
                      <div className="text-sm text-gray-600">
                        {chapter.correct} correct, {chapter.incorrect} incorrect out of {chapter.total} questions
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      chapter.accuracy >= 80 ? 'text-green-600' : 
                      chapter.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {chapter.accuracy}%
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Question Analysis</h3>
              <div className="space-y-4">
                {responses?.map((response, index) => (
                  <div
                    key={index}
                    className={`p-4 border-l-4 rounded-r-lg ${
                      response.isCorrect 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">Q{index + 1}</span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          response.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {response.isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          response.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          response.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {response.difficulty}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {response.timeSpent}s
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Subject:</strong> {response.subject} | 
                      <strong> Chapter:</strong> {response.chapter} | 
                      <strong> Topic:</strong> {response.topic}
                    </div>

                    <div className="text-sm mb-2">
                      <strong>Your Answer:</strong> {response.selectedOption || 'Not Attempted'}
                    </div>

                    {!response.isCorrect && response.correctOption && (
                      <div className="text-sm text-green-600">
                        <strong>Correct Answer:</strong> {response.correctOption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Improvement Tab */}
        {activeTab === 'improvement' && (
          <div className="space-y-6">
            {/* Weak Subjects */}
            {weakSubjects.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Subjects Needing Improvement
                </h3>
                <div className="space-y-3">
                  {weakSubjects.map((subject, index) => (
                    <div key={subject.name} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      <div className="text-orange-600 font-semibold">
                        {subject.accuracy}% Accuracy
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Weak Chapters */}
            {weakChapters.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-500" />
                  Chapters Needing Focus
                </h3>
                <div className="space-y-2">
                  {weakChapters.slice(0, 10).map((chapter, index) => (
                    <div key={index} className="flex items-center justify-between p-2">
                      <span className="text-sm">{chapter.fullName}</span>
                      <span className="text-red-600 font-semibold text-sm">{chapter.accuracy}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Weak Topics */}
            {weakTopics.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Specific Topics to Revise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {weakTopics.slice(0, 8).map((topic, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                      <Star className="w-3 h-3 text-purple-500" />
                      <span className="text-sm">{topic.fullName}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Difficulty-based Improvement */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Difficulty</h3>
              <div className="space-y-4">
                {difficultyData.map((difficulty) => (
                  <div key={difficulty.level} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{difficulty.level}</span>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        difficulty.accuracy >= 80 ? 'text-green-600' : 
                        difficulty.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {difficulty.accuracy}% Accuracy
                      </div>
                      <div className="text-sm text-gray-600">
                        {difficulty.correct}/{difficulty.total} questions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAnalysis;