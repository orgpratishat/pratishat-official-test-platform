import React, { useEffect, useState } from 'react';
import { getOverallAnalytics, getProgress } from '../services/analytics';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import SubjectChart from '../components/analytics/SubjectChart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatPercentage } from '../utils/formatters';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
    loadProgress();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await getOverallAnalytics();
      setAnalytics(response.analytics);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      const response = await getProgress({ days: 30 });
      setProgress(response.progress || []);
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Analytics</h1>
        <p className="text-gray-600 mt-2">
          Track your performance and identify areas for improvement
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary-600">{analytics.totalAttempts}</div>
          <div className="text-sm text-gray-600 mt-1">Total Attempts</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{formatPercentage(analytics.overallAccuracy)}</div>
          <div className="text-sm text-gray-600 mt-1">Overall Accuracy</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{analytics.totalCorrect}</div>
          <div className="text-sm text-gray-600 mt-1">Correct Answers</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-red-600">{analytics.totalWrong}</div>
          <div className="text-sm text-gray-600 mt-1">Wrong Answers</div>
        </Card>
      </div>

      {/* Subject-wise Performance */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject-wise Performance</h2>
        <SubjectChart data={analytics.subjectWise} />
      </Card>

      {/* Progress Chart */}
      {progress.length > 0 && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progress}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Weak Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Weak Topics</h3>
          <div className="space-y-2">
            {analytics.topWeakTopics.slice(0, 5).map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="text-red-800">{item.topic}</span>
                <span className="text-red-600 font-medium">{item.count} mistakes</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Weak Chapters</h3>
          <div className="space-y-2">
            {analytics.topWeakChapters.slice(0, 5).map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="text-red-800">{item.chapter}</span>
                <span className="text-red-600 font-medium">{item.count} mistakes</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
