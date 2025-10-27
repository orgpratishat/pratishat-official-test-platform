import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttemptStore } from '../store/attemptStore';
import ScoreCard from '../components/analytics/ScoreCard';
import SubjectChart from '../components/analytics/SubjectChart';
import WeakAreasAlert from '../components/analytics/WeakAreasAlert';
import LeaderboardWidget from '../components/analytics/LeaderboardWidget';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { downloadReportPDF } from '../utils/reportGenerator';

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
    leaderboard
  } = report;

  const subjectData = analytics.subjectWiseAnalysis.map((item) => ({
    subject: item.subject,
    accuracy: parseFloat(item.accuracy.toFixed(2))
  }));

  const weakTopics = analytics.weakTopics;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Score Section */}
      <ScoreCard
        score={score}
        totalTime={totalTimeSpent}
        predictedRank={predictedRank}
        onDownload={() => downloadReportPDF(report)}
      />

      {/* Subject Performance Chart */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Subject-wise Accuracy
        </h2>
        <SubjectChart data={subjectData} />
      </Card>

      {/* Weak Areas */}
      {weakTopics.length > 0 && (
        <WeakAreasAlert
          topics={weakTopics}
          onPractice={(topic) => {
            navigate(`/chapterwise/${topic}`);
          }}
        />
      )}

      {/* Leaderboard Widget */}
      <LeaderboardWidget
        leaderboard={leaderboard}
        userRank={leaderboard.userRank}
        totalParticipants={leaderboard.entries.length}
      />

      {/* Detailed Report Button */}
      <div className="text-center mt-8">
        <Button onClick={() => navigate(`/attempts/${attemptId}/report`)}>
          View Detailed Report
        </Button>
      </div>
    </div>
  );
};

export default TestResult;
