

// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';

// import Navbar from './components/layout/Navbar';
// import Sidebar from './components/layout/SideBar';
// import Footer from './components/layout/Footer';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// import Tests from './pages/Tests';
// import TakeTest from './pages/TakeTest';
// import TestResult from './pages/TestResult';
// import Chapterwise from './pages/Chaptewise';
// import PYQ from './pages/PYQ';
// import Memories from './pages/Memories';
// import Analytics from './pages/Analytics';
// import Leaderboard from './pages/Leaderboard';
// import Profile from './pages/Profile';

// import AdminDashboard from './pages/admin/AdminDashboard';
// import QuestionManagement from './pages/admin/QuestionManagement';
// import TestManagement from '../src/pages/admin/TestManagement'
// import UserManagement from './pages/admin/UserManagement';
// import PYQYear from './pages/PYQYear';
// import TopicPractice from './pages/TopicPractice';
// import DPPSection from './components/dppSection/DppSection';

// import DPPTestPage from './components/dppSection/dppTestPage';
// import RankRange from './pages/RankRange'

// import DPPManagement from './components/DPPManagement';
// import Landing from './pages/Landing';
// const ProtectedRoute = ({ children }) => {
//   const { token } = useAuthStore();
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// };

// const App = () => {
//   const location = useLocation();
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
//   // Check if current route is a test-taking page where sidebar and navbar should be hidden
//   const isTestPage = location.pathname.startsWith('/test/') && 
//                     !location.pathname.includes('/test-result/');

//   return (
//     <div className="flex flex-col min-h-screen">
//       {!isAuthPage && !isTestPage && <Navbar />}
//       <div className="flex flex-1">
//         {!isAuthPage && !isTestPage && <Sidebar />}
//         <main className={`flex-1 bg-gray-50 ${isTestPage ? 'w-full' : ''}`}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//              <Route path="/landing" element={<Landing />} />
//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

//             <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
//             <Route path="/test/:testId" element={<ProtectedRoute><TakeTest /></ProtectedRoute>} />
//             <Route path="/test-result/:attemptId" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />
//             <Route path="/chapterwise" element={<ProtectedRoute><Chapterwise /></ProtectedRoute>} />
//             <Route path="/chapterwise/:subject/:chapter/:topic" element={<TopicPractice />} />

//             <Route path="/pyq" element={<ProtectedRoute><PYQ /></ProtectedRoute>} />
//             <Route path="/pyq/:year" element={<ProtectedRoute><PYQYear /></ProtectedRoute>} />

//             <Route path="/memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
//             <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
//             <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
//             <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

//             {/* Admin Routes */}
//             <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
//             <Route path="/admin/questions" element={<ProtectedRoute><QuestionManagement /></ProtectedRoute>} />
//             <Route path="/admin/tests" element={<ProtectedRoute><TestManagement /></ProtectedRoute>} />
//             <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
//             <Route path="/admin/rank-range" element={<ProtectedRoute><RankRange /></ProtectedRoute>} />

//             <Route path="/dpp" element={<DPPSection />} />
//             <Route path="/admin/dpp" element={<DPPManagement />} />
//             <Route path="/dpp/:id" element={<DPPTestPage />} />

//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//       </div>
//       {!isAuthPage && !isTestPage && <Footer />}
//     </div>
//   );
// };

// export default App;











// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';

// import Navbar from './components/layout/Navbar';
// import Sidebar from './components/layout/SideBar';
// import Footer from './components/layout/Footer';
// import Contact from './pages/Contact-us';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// import Tests from './pages/Tests';
// import TakeTest from './pages/TakeTest';
// import TestResult from './pages/TestResult';
// import Chapterwise from './pages/Chaptewise';
// import PYQ from './pages/PYQ';
// import Memories from './pages/Memories';
// import Analytics from './pages/Analytics';
// import Leaderboard from './pages/Leaderboard';
// import Profile from './pages/Profile';

// import AdminDashboard from './pages/admin/AdminDashboard';
// import QuestionManagement from './pages/admin/QuestionManagement';
// import TestManagement from '../src/pages/admin/TestManagement'
// import UserManagement from './pages/admin/UserManagement';
// import PYQYear from './pages/PYQYear';
// import TopicPractice from './pages/TopicPractice';
// import DPPSection from './components/dppSection/DppSection';

// import DPPTestPage from './components/dppSection/dppTestPage';
// import RankRange from './pages/RankRange'

// import DPPManagement from './components/DPPManagement';
// import Landing from './pages/Landing';
// import StudentRegistration from './pages/StudentRegistration'
// const ProtectedRoute = ({ children }) => {
//   const { token } = useAuthStore();
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// };

// const App = () => {
//   const location = useLocation();
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
//   // Check if current route is a test-taking page where sidebar and navbar should be hidden
//   const isTestPage = location.pathname.startsWith('/test/') && 
//                     !location.pathname.includes('/test-result/');
  
//   // Check if current route is the landing page
//   const isLandingPage = location.pathname === '/landing';

//   const isContact=location.pathname=='/contact-us';
// const isStudentRegistration=location.pathname=='/student-registration';
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Don't show navbar on auth pages, test pages, or landing page */}
//       {!isAuthPage && !isTestPage &&!isContact && !isLandingPage &&!isStudentRegistration && <Navbar />}
      
//       <div className="flex flex-1">
//         {/* Don't show sidebar on auth pages, test pages, or landing page */}
//         {!isAuthPage && !isTestPage && !isLandingPage && !isStudentRegistration && <Sidebar /> && !isContact }
        
//         <main className={`flex-1 bg-gray-50 ${isTestPage || isLandingPage || isStudentRegistration ? 'w-full' : ''}`}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/landing" element={<Landing />} />
//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//  <Route path="/contact-us" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
//             <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
//             <Route path="/test/:testId" element={<ProtectedRoute><TakeTest /></ProtectedRoute>} />
//             <Route path="/test-result/:attemptId" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />
//             <Route path="/chapterwise" element={<ProtectedRoute><Chapterwise /></ProtectedRoute>} />
//             <Route path="/chapterwise/:subject/:chapter/:topic" element={<TopicPractice />} />

//             <Route path="/pyq" element={<ProtectedRoute><PYQ /></ProtectedRoute>} />
//             <Route path="/pyq/:year" element={<ProtectedRoute><PYQYear /></ProtectedRoute>} />

//             <Route path="/memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
//             <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
//             <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
//             <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//               <Route path="/student-registration" element={<ProtectedRoute><StudentRegistration /></ProtectedRoute>} />

//             {/* Admin Routes */}
//             <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
//             <Route path="/admin/questions" element={<ProtectedRoute><QuestionManagement /></ProtectedRoute>} />
//             <Route path="/admin/tests" element={<ProtectedRoute><TestManagement /></ProtectedRoute>} />
//             <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
//             <Route path="/admin/rank-range" element={<ProtectedRoute><RankRange /></ProtectedRoute>} />

//             <Route path="/dpp" element={<DPPSection />} />
//             <Route path="/admin/dpp" element={<DPPManagement />} />
//             <Route path="/dpp/:id" element={<DPPTestPage />} />

//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//       </div>
      
//       {/* Don't show footer on auth pages, test pages, or landing page */}
//       {!isAuthPage && !isTestPage && !isLandingPage &&!isContact &&!isStudentRegistration && <Footer />}
//     </div>
//   );
// };

// export default App;



import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/SideBar';
import Footer from './components/layout/Footer';
import Contact from './pages/Contact-us';
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
import TestManagement from '../src/pages/admin/TestManagement';
import UserManagement from './pages/admin/UserManagement';
import PYQYear from './pages/PYQYear';
import TopicPractice from './pages/TopicPractice';
import DPPSection from './components/dppSection/DppSection';

import DPPTestPage from './components/dppSection/dppTestPage';
import RankRange from './pages/RankRange';

import DPPManagement from './components/DPPManagement';
import Landing from './pages/Landing';
import StudentRegistration from './pages/StudentRegistration';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/landing" replace />; // Redirect to landing if not logged in
  return children;
};

const App = () => {
  const location = useLocation();
  
  // Check if current route is a test-taking page where sidebar and navbar should be hidden
  const isTestPage = location.pathname.startsWith('/test/') && 
                    !location.pathname.includes('/test-result/');
  
  // ONLY these 3 routes are public (no login required)
  const isPublicRoute = location.pathname === '/landing' || 
                       location.pathname === '/contact-us' || 
                       location.pathname === '/student-registration';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Don't show navbar on test pages or public routes */}
      {!isTestPage && !isPublicRoute && <Navbar />}
      
      <div className="flex flex-1">
        {/* Don't show sidebar on test pages or public routes */}
        {!isTestPage && !isPublicRoute && <Sidebar />}
        
        <main className={`flex-1 bg-gray-50 ${isTestPage || isPublicRoute ? 'w-full' : ''}`}>
          <Routes>
            {/* PUBLIC ROUTES (No login required) */}
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            
            {/* PROTECTED ROUTES (Login required - ALL other routes) */}
            <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
            <Route path="/test/:testId" element={<ProtectedRoute><TakeTest /></ProtectedRoute>} />
            <Route path="/test-result/:attemptId" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />
            <Route path="/chapterwise" element={<ProtectedRoute><Chapterwise /></ProtectedRoute>} />
            <Route path="/chapterwise/:subject/:chapter/:topic" element={<ProtectedRoute><TopicPractice /></ProtectedRoute>} />

            <Route path="/pyq" element={<ProtectedRoute><PYQ /></ProtectedRoute>} />
            <Route path="/pyq/:year" element={<ProtectedRoute><PYQYear /></ProtectedRoute>} />

            <Route path="/memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/questions" element={<ProtectedRoute><QuestionManagement /></ProtectedRoute>} />
            <Route path="/admin/tests" element={<ProtectedRoute><TestManagement /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            <Route path="/admin/rank-range" element={<ProtectedRoute><RankRange /></ProtectedRoute>} />

            {/* DPP Routes (Protected) */}
            <Route path="/dpp" element={<ProtectedRoute><DPPSection /></ProtectedRoute>} />
            <Route path="/admin/dpp" element={<ProtectedRoute><DPPManagement /></ProtectedRoute>} />
            <Route path="/dpp/:id" element={<ProtectedRoute><DPPTestPage /></ProtectedRoute>} />

            {/* Redirect any unknown route to landing */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </main>
      </div>
      
      {/* Don't show footer on test pages or public routes */}
      {!isTestPage && !isPublicRoute && <Footer />}
    </div>
  );
};

export default App;