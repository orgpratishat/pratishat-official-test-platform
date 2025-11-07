

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/SideBar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import Tests from './pages/Tests';
import TakeTest from './pages/TakeTest';
import TestResult from './pages/TestResult';
import Chapterwise from './pages/Chaptewise';
import PYQ from './pages/PYQ';
import Memories from './pages/Memories';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import QuestionManagement from './pages/admin/QuestionManagement';
import TestManagement from '../src/pages/admin/TestManagement'
import UserManagement from './pages/admin/UserManagement';
import PYQYear from './pages/PYQYear';
import TopicPractice from './pages/TopicPractice';
import DPPSection from './components/dppSection/DppSection';

import DPPTestPage from './components/dppSection/dppTestPage';


import DPPManagement from './components/DPPManagement';
const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
  // Check if current route is a test-taking page where sidebar should be hidden
  const isTestPage = location.pathname.startsWith('/test/') && 
                    !location.pathname.includes('/test-result/');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <div className="flex flex-1">
        {!isAuthPage && !isTestPage && <Sidebar />}
        <main className={`flex-1 bg-gray-50 ${isTestPage ? 'w-full' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
            <Route path="/test/:testId" element={<ProtectedRoute><TakeTest /></ProtectedRoute>} />
            <Route path="/test-result/:attemptId" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />
            <Route path="/chapterwise" element={<ProtectedRoute><Chapterwise /></ProtectedRoute>} />
            <Route path="/chapterwise/:subject/:chapter/:topic" element={<TopicPractice />} />

            <Route path="/pyq" element={<ProtectedRoute><PYQ /></ProtectedRoute>} />
            <Route path="/pyq/:year" element={<ProtectedRoute><PYQYear /></ProtectedRoute>} />

            <Route path="/memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/questions" element={<ProtectedRoute><QuestionManagement /></ProtectedRoute>} />
            <Route path="/admin/tests" element={<ProtectedRoute><TestManagement /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />

            <Route path="/dpp" element={<DPPSection />} />
            <Route path="/admin/dpp" element={<DPPManagement />} />
            <Route path="/dpp/:id" element={<DPPTestPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;