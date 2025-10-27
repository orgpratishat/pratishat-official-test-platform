
// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats } from '../../services/admin';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { Users, FileText, ClipboardList, BookOpen, Settings, ChevronRight, BarChart3, Plus, Edit3 } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const response = await getAdminStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to load admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Spinner size={48} className="text-blue-600" />
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="">
          <div className="flex items-center justify-between ">
            <div className=" ">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-2 font-medium">Manage the NEET preparation platform</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={loadStats}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 ">
            <Card   onClick={() => navigate("/admin/users")} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-200 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-200">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.totalUsers)}</div>
              <div className="text-sm font-medium text-gray-500">Total Users</div>
              <div className="mt-2 text-xs text-blue-600 font-medium">Active now</div>
            </Card>

            <Card   onClick={() => navigate("/admin/questions")} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-green-200 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors duration-200">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.totalQuestions)}</div>
              <div className="text-sm font-medium text-gray-500">Questions</div>
              <div className="mt-2 text-xs text-green-600 font-medium">All subjects</div>
            </Card>

            <Card   onClick={() => navigate("/admin/tests")} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-200 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors duration-200">
                  <ClipboardList className="w-6 h-6 text-purple-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.totalTests)}</div>
              <div className="text-sm font-medium text-gray-500">Tests</div>
              <div className="mt-2 text-xs text-purple-600 font-medium">Available</div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-orange-200 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors duration-200">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors duration-200" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.totalPYQs)}</div>
              <div className="text-sm font-medium text-gray-500">PYQs</div>
              <div className="mt-2 text-xs text-orange-600 font-medium">Previous Years</div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-red-200 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors duration-200">
                  <Settings className="w-6 h-6 text-red-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors duration-200" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.totalAttempts)}</div>
              <div className="text-sm font-medium text-gray-500">Attempts</div>
              <div className="mt-2 text-xs text-red-600 font-medium">Total taken</div>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Question Management</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Add, edit, or delete questions from the question bank</p>
            <Button 
              onClick={() => navigate('/admin/questions')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg border-0"
            >
              Manage Questions
            </Button>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200 transition-colors duration-200">
                <Edit3 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Test Management</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Create and manage tests, set timers, and configure settings</p>
            <Button 
              onClick={() => navigate('/admin/tests')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg border-0"
            >
              Manage Tests
            </Button>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors duration-200">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">View user profiles, manage access, and monitor activity</p>
            <Button 
              onClick={() => navigate('/admin/users')}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg border-0"
            >
              Manage Users
            </Button>
          </Card>


            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors duration-200">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">DPP Management</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Create,edit and manage dpp</p>
            <Button 
              onClick={() => navigate('/admin/dpp')}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg border-0"
            >
              Manage DPP
            </Button>
          </Card>
        </div>

        {/* Subject Distribution */}
        {stats?.subjectDistribution && (
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Question Distribution by Subject</h3>
              <div className="text-sm text-gray-500 font-medium">
                Total: {formatNumber(stats.subjectDistribution.reduce((acc, curr) => acc + curr.count, 0))}
              </div>
            </div>
            <div className="space-y-4">
              {stats.subjectDistribution.map((item, index) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 
                      index === 2 ? 'bg-purple-500' : 
                      'bg-orange-500'
                    }`}></div>
                    <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                      {item._id}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900 font-semibold mr-2">{formatNumber(item.count)}</span>
                    <span className="text-gray-500 text-sm">questions</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;