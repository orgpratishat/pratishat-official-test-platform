// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAttemptStore } from '../store/attemptStore';
// import ScoreCard from '../components/analytics/ScoreCard';
// import SubjectChart from '../components/analytics/SubjectChart';
// import WeakAreasAlert from '../components/analytics/WeakAreasAlert';
// import LeaderboardWidget from '../components/analytics/LeaderBoardWidget';
// import Button from '../components/ui/Button';
// import Card from '../components/ui/Card';
// import Spinner from '../components/ui/Spinner';
// import { downloadReportPDF } from '../utils/reportGenerator';
// import { formatPercentage } from '../utils/formatters';

// const TestResult = () => {
//   const { attemptId } = useParams();
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

//   const { score, totalTimeSpent, predictedRank, analytics, test, responses } = report;
//   const subjectData = analytics.subjectWiseAnalysis.map((item) => ({
//     subject: item.subject,
//     accuracy: parseFloat(item.accuracy.toFixed(2))
//   }));

//   const weakTopics = analytics.weakTopics;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Score Section */}
//       <ScoreCard
//         score={score}
//         totalTime={totalTimeSpent}
//         predictedRank={predictedRank}
//         onDownload={() => downloadReportPDF(report)}
//       />

//       {/* Subject Performance Chart */}
//       <Card className="p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject-wise Accuracy</h2>
//         <SubjectChart data={subjectData} />
//       </Card>

//       {/* Weak Areas */}
//       {weakTopics.length > 0 && (
//         <WeakAreasAlert
//           topics={weakTopics}
//           onPractice={(topic) => {
//             // Navigate to Chapterwise with pre-selected topic
//             // Implement navigation logic
//           }}
//         />
//       )}

//       {/* Leaderboard Widget */}
//       <LeaderboardWidget
//         leaderboard={report.leaderboard}
//         userRank={report.leaderboard?.userRank}
//         totalParticipants={report.leaderboard?.entries.length}
//       />

//       {/* Button to View Detailed Question Report */}
//       <div className="text-center mt-8">
//         <Button onClick={() => window.location.href = `/attempts/${attemptId}/report`}>
//           View Detailed Report
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TestResult;









// src/pages/TestResult.jsx

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAttemptStore } from '../store/attemptStore';
import ScoreCard from '../components/analytics/ScoreCard';
import SubjectChart from '../components/analytics/SubjectChart';
import WeakAreasAlert from '../components/analytics/WeakAreasAlert';
import LeaderboardWidget from '../components/analytics/LeaderBoardWidget';
import ChapterChart from '../components/analytics/ChapterChart';
import TopicChart from '../components/analytics/TopicChart';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { downloadReportPDF } from '../utils/reportGenerator';
import { formatPercentage } from '../utils/formatters';

const TestResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { report, fetchReport, loading } = useAttemptStore();

  useEffect(() => {
    fetchReport(attemptId);
  }, [attemptId]);

  if (loading || !report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  const {
    score,
    totalTimeSpent,
    predictedRank,
    analytics,
    test,
    responses,
    leaderboard
  } = report;

  const subjectData = analytics?.subjectWiseAnalysis.map(item => ({
    label: item.subject,
    value: parseFloat(item.accuracy?.toFixed(2))
  }));

  const chapterData = analytics?.chapterWiseAnalysis.map(item => ({
    label: item.chapter,
    value: parseFloat(item.accuracy?.toFixed(2))
  }));

  const topicData = analytics?.topicWiseAnalysis.map(item => ({
    label: item.topic,
    value: parseFloat(item.accuracy?.toFixed(2))
  }));

  const weakTopics = analytics?.weakTopics;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Score Section */}
      <ScoreCard
        score={score}
        totalTime={totalTimeSpent}
        predictedRank={predictedRank}
        onDownload={() => downloadReportPDF(report)}
      />

      {/* Subject Chart */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject-wise Accuracy</h2>
        <SubjectChart data={subjectData} />
      </Card>

      {/* Chapter Chart */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Chapter-wise Accuracy</h2>
        <ChapterChart data={chapterData} />
      </Card>

      {/* Topic Chart */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Topic-wise Accuracy</h2>
        <TopicChart data={topicData} />
      </Card>

      {/* Weak Areas */}
      {weakTopics && weakTopics.length > 0 && (
        <WeakAreasAlert
          topics={weakTopics}
          onPractice={(topics) => {
            // Navigate to chapterwise practice for the first weak topic
            const [subject, chapter, topic] = topics[0].split(' / ');
            navigate(`/chapterwise/${subject}/${chapter}/${topic}`);
          }}
        />
      )}

      {/* Leaderboard */}
      <Card className="p-6 mb-6">
        <LeaderboardWidget
          leaderboard={leaderboard}
          userRank={leaderboard?.userRank}
          totalParticipants={leaderboard?.entries?.length || 0}
        />
      </Card>

      {/* Detailed Responses */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Per-Question Report</h2>
        {responses.map((r, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-medium">
              Q{idx + 1}: {r.questionText}
            </p>
            <p>
              Your Answer: {r.selectedOption} — {r.isCorrect ? 'Correct' : 'Wrong'}
            </p>
            <p>Time Spent: {r.timeSpent}s</p>
            <hr className="my-2" />
          </div>
        ))}
      </Card>

      {/* View Full Report Button */}
      <div className="text-center mt-8">
        <Button onClick={() => navigate(`/attempts/${attemptId}/report`)}>
          View Full Report
        </Button>
      </div>
    </div>
  );
};

export default TestResult;
