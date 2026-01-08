// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useTestStore } from '../store/testStore';
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import Spinner from '../components/ui/Spinner';
// import { Calendar, Clock, Trophy, BookOpen } from 'lucide-react';
// import { formatDate, formatTime } from '../utils/formatters';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { user } = useAuthStore();
//   const { upcomingTests, loading, fetchUpcomingTests } = useTestStore();

//   useEffect(() => {
//     fetchUpcomingTests();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Welcome Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome back, {user?.profile?.fullName || user?.username}!
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Continue your NEET preparation journey
//         </p>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/tests')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Tests</p>
//               <h3 className="text-2xl font-bold text-gray-900 mt-1">Browse Tests</h3>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg">
//               <BookOpen className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/chapterwise')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Practice</p>
//               <h3 className="text-2xl font-bold text-gray-900 mt-1">Chapterwise</h3>
//             </div>
//             <div className="bg-green-100 p-3 rounded-lg">
//               <BookOpen className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </Card>


//            <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/pyq')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Practice</p>
//               <h3 className="text-2xl font-bold text-gray-900 mt-1">Previous Year Questions</h3>
//             </div>
//             <div className="bg-green-100 p-3 rounded-lg">
//               <BookOpen className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//         </Card>

//         {/* <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Your</p>
//               <h3 className="text-2xl font-bold text-gray-900 mt-1">Analytics</h3>
//             </div>
//             <div className="bg-purple-100 p-3 rounded-lg">
//               <Trophy className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </Card> */}

//         <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/memories')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Revise</p>
//               <h3 className="text-2xl font-bold text-gray-900 mt-1">Memories</h3>
//             </div>
//             <div className="bg-red-100 p-3 rounded-lg">
//               <BookOpen className="w-6 h-6 text-red-600" />
//             </div>
//           </div>
//         </Card>

//             <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/rank-range')}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Rank range</p>
//               <h3 className="text-2xl font-bold text-gray-900 mt-1">CRUD</h3>
//             </div>
//             <div className="bg-red-100 p-3 rounded-lg">
//               <BookOpen className="w-6 h-6 text-red-600" />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Upcoming Tests */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold text-gray-900">Upcoming Tests</h2>
//           <Button variant="outline" size="sm" onClick={() => navigate('/tests')}>
//             View All
//           </Button>
//         </div>

//         {upcomingTests && upcomingTests?.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {upcomingTests.slice(0, 4).map((test) => (
//               <Card key={test._id} className="p-6 hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
//                     <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
//                       {test.type === 'NEET_MOCK' ? 'NEET Mock Test' : 'DPP Test'}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     {formatDate(test.scheduledDate)}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Clock className="w-4 h-4 mr-2" />
//                     Duration: {formatTime(test.duration * 60)}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <BookOpen className="w-4 h-4 mr-2" />
//                     {test.questions?.length || 0} Questions
//                   </div>
//                 </div>

//                 <Button
//                   className="w-full bg-red-400"
//                   onClick={() => navigate(`/test/${test._id}`)}
//                 >
//                   Start Test
//                 </Button>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <Card className="p-12 text-center">
//             <p className="text-gray-500">No upcoming tests available</p>
//           </Card>
//         )}
//       </div>

//       {/* Quick Links */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* <Card className="p-6">
//           <h3 className="font-semibold text-gray-900 mb-2">Previous Year Questions</h3>
//           <p className="text-sm text-gray-600 mb-4">Practice PYQs year-wise</p>
//           <Button variant="outline" size="sm" onClick={() => navigate('/pyq')}>
//             Browse PYQs
//           </Button>
//         </Card> */}

//         {/* <Card className="p-6">
//           <h3 className="font-semibold text-gray-900 mb-2">Leaderboard</h3>
//           <p className="text-sm text-gray-600 mb-4">See where you stand</p>
//           <Button variant="outline" size="sm" onClick={() => navigate('/leaderboard')}>
//             View Rankings
//           </Button>
//         </Card> */}

//         {/* <Card className="p-6">
//           <h3 className="font-semibold text-gray-900 mb-2">Your Profile</h3>
//           <p className="text-sm text-gray-600 mb-4">Update your information</p>
//           <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
//             Edit Profile
//           </Button>
//         </Card> */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTestStore } from '../store/testStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { Calendar, Clock, Trophy, BookOpen, ArrowRight, TrendingUp, Brain, Target, Zap, Star, Users, Award, BarChart3, ChevronRight , User} from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header with Gradient */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{user?.profile?.fullName || user?.username}!</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Continue your journey to medical excellence
            </p>
          </div>
         
        </div>
        
      
      </div>

      {/* Quick Actions - Modern Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-500" />
            Quick Actions
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-purple-600 flex items-center gap-1"
            onClick={() => navigate('/tests')}
          >
            View All <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {/* Tests Card */}
          <div 
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 border border-gray-200/50"
            onClick={() => navigate('/tests')}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">Practice</p>
                <h3 className="text-lg font-bold text-gray-900">Mock Tests</h3>
              </div>
              <p className="text-sm text-gray-500 mt-auto">Take full-length practice tests</p>
            </div>
          </div>

          {/* Chapterwise Card */}
          <div 
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 border border-gray-200/50"
            onClick={() => navigate('/chapterwise')}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Study</p>
                <h3 className="text-lg font-bold text-gray-900">Chapterwise</h3>
              </div>
              <p className="text-sm text-gray-500 mt-auto">Topic-by-topic practice</p>
            </div>
          </div>

          {/* PYQ Card */}
          <div 
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 border border-gray-200/50"
            onClick={() => navigate('/pyq')}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-orange-600 uppercase tracking-wider mb-1">Practice</p>
                <h3 className="text-lg font-bold text-gray-900">PYQs</h3>
              </div>
              <p className="text-sm text-gray-500 mt-auto">Previous year questions</p>
            </div>
          </div>

          {/* Memories Card */}
          <div 
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 border border-gray-200/50"
            onClick={() => navigate('/memories')}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">Revise</p>
                <h3 className="text-lg font-bold text-gray-900">Memories</h3>
              </div>
              <p className="text-sm text-gray-500 mt-auto">Flashcards & revision</p>
            </div>
          </div>

          {/* Rank Range Card */}
          <div 
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 border border-gray-200/50"
            onClick={() => navigate('/admin/rank-range')}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">Admin</p>
                <h3 className="text-lg font-bold text-gray-900">Rank CRUD</h3>
              </div>
              <p className="text-sm text-gray-500 mt-auto">Manage rank ranges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tests - Modern Design */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Tests</h2>
              <p className="text-sm text-gray-500">Your scheduled assessments</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 flex items-center gap-2"
            onClick={() => navigate('/tests')}
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {upcomingTests && upcomingTests?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingTests.slice(0, 4).map((test) => (
              <div 
                key={test._id} 
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200/50"
              >
                {/* Test Type Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${test.type === 'NEET_MOCK' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {test.type === 'NEET_MOCK' ? 'NEET Mock' : 'DPP Test'}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{test.name}</h3>
                  
                  {/* Test Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{formatDate(test.scheduledDate)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{formatTime(test.duration * 60)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3">
                        <BookOpen className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{test.questions?.length || 0} Questions</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Start Test Button */}
                <button
                  onClick={() => navigate(`/test/${test._id}`)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group/btn"
                >
                  Start Test
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 text-center border border-gray-200/50">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Tests</h3>
            <p className="text-gray-500 mb-6">You don't have any tests scheduled yet</p>
            <Button
              onClick={() => navigate('/tests')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Browse Available Tests
            </Button>
          </div>
        )}
      </div>

      {/* Stats & Quick Links */}
      
      <div className=" grid-cols-1 lg:grid-cols-3 gap-6 hidden">
  
        {/* Recent Activity Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200/50 ">
          {/* <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            Quick Links
          </h3> */}
          {/* <div className="space-y-3">
            <button 
              onClick={() => navigate('/profile')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Your Profile</p>
                  <p className="text-xs text-gray-500">Update personal info</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 transition-colors duration-200" />
            </button>
            
            <button 
              onClick={() => navigate('/leaderboard')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Leaderboard</p>
                  <p className="text-xs text-gray-500">See where you stand</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
            </button>
            
            <button 
              onClick={() => navigate('/analytics')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-rose-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Analytics</p>
                  <p className="text-xs text-gray-500">Detailed performance</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-rose-600 transition-colors duration-200" />
            </button>
          </div> */}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;