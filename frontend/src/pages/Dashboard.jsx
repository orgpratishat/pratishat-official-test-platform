import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTestStore } from '../store/testStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { Calendar, Clock, Trophy, BookOpen } from 'lucide-react';
import { formatDate, formatTime } from '../utils/formatters';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { upcomingTests, loading, fetchUpcomingTests } = useTestStore();

  useEffect(() => {
    fetchUpcomingTests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.profile?.fullName || user?.username}!
        </h1>
        <p className="text-gray-600 mt-2">
          Continue your NEET preparation journey
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/tests')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tests</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Browse Tests</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/chapterwise')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Practice</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Chapterwise</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>


           <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/pyq')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Practice</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Previous Year Questions</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Analytics</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card> */}

        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/memories')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revise</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Memories</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

            <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/rank-range')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rank range</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">CRUD</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Tests */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Tests</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/tests')}>
            View All
          </Button>
        </div>

        {upcomingTests && upcomingTests?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTests.slice(0, 4).map((test) => (
              <Card key={test._id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {test.type === 'NEET_MOCK' ? 'NEET Mock Test' : 'DPP Test'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(test.scheduledDate)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Duration: {formatTime(test.duration * 60)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {test.questions?.length || 0} Questions
                  </div>
                </div>

                <Button
                  className="w-full bg-red-400"
                  onClick={() => navigate(`/test/${test._id}`)}
                >
                  Start Test
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No upcoming tests available</p>
          </Card>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Previous Year Questions</h3>
          <p className="text-sm text-gray-600 mb-4">Practice PYQs year-wise</p>
          <Button variant="outline" size="sm" onClick={() => navigate('/pyq')}>
            Browse PYQs
          </Button>
        </Card> */}

        {/* <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Leaderboard</h3>
          <p className="text-sm text-gray-600 mb-4">See where you stand</p>
          <Button variant="outline" size="sm" onClick={() => navigate('/leaderboard')}>
            View Rankings
          </Button>
        </Card> */}

        {/* <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Your Profile</h3>
          <p className="text-sm text-gray-600 mb-4">Update your information</p>
          <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
            Edit Profile
          </Button>
        </Card> */}
      </div>
    </div>
  );
};

export default Dashboard;
