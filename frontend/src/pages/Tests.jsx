// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTestStore } from '../store/testStore';
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import Spinner from '../components/ui/Spinner';
// import Badge from '../components/ui/Badge';
// import { Calendar, Clock, BookOpen, ChevronRight } from 'lucide-react';
// import { formatDate, formatTime } from '../utils/formatters';

// const Tests = () => {
//   const navigate = useNavigate();
//   const { tests, loading, fetchTests } = useTestStore();
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     fetchTests({isActive:true});
//   }, []);

//   const filteredTests = tests.filter(test => {
//     if (filter === 'all') return true;
//     return test.type === filter;
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">All Tests</h1>
//         <p className="text-gray-600 mt-2">
//           Choose from NEET Mock Tests or DPP Tests
//         </p>
//       </div>

   

//         <div className="mb-6 flex gap-3">
//   <Button
//     variant="outline"
//     size="sm"
//     className={`${
//       filter === 'all' 
//         ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
//         : 'text-gray-700 border-gray-300 hover:bg-gray-50'
//     } transition-colors duration-200`}
//     onClick={() => setFilter('all')}
//   >
//     All Tests
//   </Button>
//   <Button
//     variant="outline"
//     size="sm"
//     className={`${
//       filter === 'NEET_MOCK' 
//         ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
//         : 'text-gray-700 border-gray-300 hover:bg-gray-50'
//     } transition-colors duration-200`}
//     onClick={() => setFilter('NEET_MOCK')}
//   >
//     NEET Mock
//   </Button>
//   <Button
//     variant="outline"
//     size="sm"
//     className={`${
//       filter === 'DPP_TEST' 
//         ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
//         : 'text-gray-700 border-gray-300 hover:bg-gray-50'
//     } transition-colors duration-200`}
//     onClick={() => setFilter('DPP_TEST')}
//   >
//     DPP Tests
//   </Button>
// </div>

//       {/* Tests Grid */}
//       {filteredTests && filteredTests.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTests.map((test) => (
//             <Card key={test._id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.name}</h3>
//                 <Badge text={test.type === 'NEET_MOCK' ? 'NEET Mock' : 'DPP Test'} />
//               </div>

//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Calendar className="w-4 h-4 mr-2" />
//                   {formatDate(test.scheduledDate)}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Clock className="w-4 h-4 mr-2" />
//                   {formatTime(test.duration * 60)}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <BookOpen className="w-4 h-4 mr-2" />
//                   {test.questions?.length || 0} Questions
//                 </div>
//                 <div className="pt-2 border-t">
//                   <p className="text-sm font-medium text-gray-700">Marking Scheme</p>
//                   <p className="text-xs text-gray-600 mt-1">
//                     +{test.markingScheme?.positiveMarks} for correct, 
//                     {test.markingScheme?.negativeMarks} for wrong
//                   </p>
//                 </div>
//               </div>

//               <Button
//                 className="w-full group bg-red-400"
//                 onClick={() => navigate(`/test/${test._id}`)}
//               >
//                 Start Test
//                 <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <Card className="p-12 text-center">
//           <p className="text-gray-500">No tests available</p>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default Tests;





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { Calendar, Clock, BookOpen, ChevronRight, Target, Zap, Filter } from 'lucide-react';
import { formatDate, formatTime } from '../utils/formatters';

const Tests = () => {
  const navigate = useNavigate();
  const { tests, loading, fetchTests } = useTestStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTests({isActive:true});
  }, []);

  const filteredTests = tests.filter(test => {
    if (filter === 'all') return true;
    return test.type === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
              All Tests
            </h1>
            <p className="text-gray-500 mt-2">
              Choose from NEET Mock Tests or DPP Tests
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              All Tests
            </button>
            <button
              onClick={() => setFilter('NEET_MOCK')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === 'NEET_MOCK' 
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              NEET Mock
            </button>
            <button
              onClick={() => setFilter('DPP_TEST')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === 'DPP_TEST' 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              DPP Tests
            </button>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      {filteredTests && filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div 
              key={test._id} 
              className="group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 border border-gray-200/50 shadow-soft-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/test/${test._id}`)}
            >
              {/* Test Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{test.name}</h3>
                    <Badge 
                      text={test.type === 'NEET_MOCK' ? 'NEET Mock' : 'DPP Test'} 
                      className={`${
                        test.type === 'NEET_MOCK' 
                          ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200/50' 
                          : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/50'
                      }`}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* Test Details */}
                <div className="space-y-4">
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
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{test.questions?.length || 0} Questions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marking Scheme */}
              <div className="mb-6 pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-medium text-gray-900">Marking Scheme</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm font-bold text-emerald-600">+{test.markingScheme?.positiveMarks || 4}</div>
                    <div className="text-xs text-gray-500">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-rose-600">-{Math.abs(test.markingScheme?.negativeMarks || 1)}</div>
                    <div className="text-xs text-gray-500">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-600">0</div>
                    <div className="text-xs text-gray-500">Unanswered</div>
                  </div>
                </div>
              </div>

              {/* Start Test Button */}
              <button
                onClick={() => navigate(`/test/${test._id}`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                Start Test
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 text-center border border-gray-200/50">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tests Available</h3>
          <p className="text-gray-500 mb-6">There are no tests matching your current filter</p>
          <button
            onClick={() => setFilter('all')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:shadow-lg"
          >
            View All Tests
          </button>
        </div>
      )}
    </div>
  );
};

export default Tests;