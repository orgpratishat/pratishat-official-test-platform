// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllYears } from '../services/pyq';
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import Spinner from '../components/ui/Spinner';
// import { Calendar, Clock, BookOpen } from 'lucide-react';
// import { formatTime } from '../utils/formatters';

// const PYQ = () => {
//   const navigate = useNavigate();
//   const [years, setYears] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadYears();
//   }, []);

//   const loadYears = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllYears();
//       console.log(response)
//       setYears(response.pyqs || []);
//     } catch (error) {
//       console.error('Failed to load PYQ years:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Previous Year Questions</h1>
//         <p className="text-gray-600 mt-2">
//           Practice NEET PYQs year-wise with rank prediction
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {years.map((pyq) => (
//           <Card key={pyq._id} className="p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-2xl font-bold text-gray-900">{pyq.year}</h3>
//               <Calendar className="w-8 h-8 text-primary-600" />
//             </div>

//             <div className="space-y-3 mb-6">
//               <div className="flex items-center text-sm text-gray-600">
//                 <BookOpen className="w-4 h-4 mr-2" />
//                 {pyq.examName}
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Duration: {formatTime(pyq.duration * 60)}
//               </div>
//               <div className="text-sm text-gray-600">
//                 Total Marks: {pyq.totalMarks}
//               </div>
//             </div>

//             <Button
//               className="w-full text-black"
//               onClick={() => navigate(`/pyq/${pyq.year}`)}
//             >
//               Start PYQ {pyq.year}
//             </Button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PYQ;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllYears } from '../services/pyq';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { Calendar, Clock, BookOpen, Target, ChevronRight, TrendingUp, Award } from 'lucide-react';
import { formatTime } from '../utils/formatters';

const PYQ = () => {
  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadYears();
  }, []);

  const loadYears = async () => {
    setLoading(true);
    try {
      const response = await getAllYears();
      console.log(response)
      setYears(response.pyqs || []);
    } catch (error) {
      console.error('Failed to load PYQ years:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-orange-900 bg-clip-text text-transparent">
              Previous Year Questions
            </h1>
            <p className="text-gray-500 mt-2">
              Practice NEET PYQs year-wise with rank prediction
            </p>
          </div>
        </div>
      </div>

      {/* PYQ Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((pyq) => (
          <div 
            key={pyq._id} 
            className="group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 border border-gray-200/50 shadow-soft-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Year Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-200/50 flex items-center justify-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      {pyq.year}
                    </span>
                  </div>
                  <div className="flex-1 ml-3">
                    <h3 className="text-xl font-bold text-gray-900">{pyq.year} PYQ</h3>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100/50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
            </div>

            {/* PYQ Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{pyq.examName}</div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Duration: {formatTime(pyq.duration * 60)}</div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mr-3">
                  <Award className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Total Marks: {pyq.totalMarks}</div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center mr-3">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Rank Prediction</div>
                  <div className="text-xs text-gray-500">Get your estimated rank</div>
                </div>
              </div>
            </div>

            {/* Start PYQ Button */}
            <button
              onClick={() => navigate(`/pyq/${pyq.year}`)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group/btn"
            >
              Start PYQ {pyq.year}
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {years.length === 0 && !loading && (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 text-center border border-gray-200/50">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No PYQs Available</h3>
          <p className="text-gray-500">Previous year questions will be added soon.</p>
        </div>
      )}
    </div>
  );
};

export default PYQ;