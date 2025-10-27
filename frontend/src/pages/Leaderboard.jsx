// // src/pages/Leaderboard.jsx
// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getLeaderboard } from '../services/leaderboard';
// import Card from '../components/ui/Card';
// import Spinner from '../components/ui/Spinner';
// import { formatNumber, formatPercentage } from '../utils/formatters';

// const Leaderboard = () => {
//   const [testId, setTestId] = useState(null);
//   const [limit] = useState(50);

//   // You can set testId from context or a dropdown; for now pick a default
//   useEffect(() => {
//     // Set your default testId here, e.g. from URL or first test
//     setTestId(localStorage.getItem('lastTestId') || null);
//   }, []);

//   const { data, isLoading } = useQuery(
//     ['leaderboard', testId, limit],
//     () => getLeaderboard(testId, { limit }),
//     {
//       enabled: !!testId,
//       staleTime: 1000 * 60 * 2,
//     }
//   );

//   if (!testId) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <Card className="p-6 text-center">
//           <p className="text-gray-600">No test selected for leaderboard.</p>
//         </Card>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   if (!data || !data.leaderboard) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <Card className="p-6 text-center">
//           <p className="text-gray-600">Leaderboard not available.</p>
//         </Card>
//       </div>
//     );
//   }

//   const { leaderboard } = data;
//   const { entries, userRank, totalParticipants } = leaderboard;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

//       <Card className="p-6 mb-6">
//         <div className="flex justify-between text-sm text-gray-700 mb-4">
//           <div>Your Rank: #{userRank}</div>
//           <div>Participants: {formatNumber(totalParticipants)}</div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2">Rank</th>
//                 <th className="px-4 py-2">User</th>
//                 <th className="px-4 py-2">Score</th>
//                 <th className="px-4 py-2">Accuracy</th>
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((e) => (
//                 <tr
//                   key={e.rank}
//                   className={e.rank === userRank ? 'bg-primary-50' : 'hover:bg-gray-50'}
//                 >
//                   <td className="px-4 py-2 font-medium">{e.rank}</td>
//                   <td className="px-4 py-2">{e.user.username}</td>
//                   <td className="px-4 py-2">{e.score}</td>
//                   <td className="px-4 py-2">{formatPercentage(e.accuracy)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       <Card className="p-4 text-center">
//         <p className="text-sm text-gray-600">
//           You are in top {formatPercentage(((totalParticipants - userRank) / totalParticipants) * 100)}% 
//         </p>
//       </Card>
//     </div>
//   );
// };

// export default Leaderboard;













// src/pages/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '../services/leaderboard';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { formatNumber, formatPercentage } from '../utils/formatters';

const Leaderboard = () => {
  const [testId, setTestId] = useState(null);
  const [limit] = useState(50);

  // Set default testId on mount
  useEffect(() => {
    const savedTestId = localStorage.getItem('lastTestId');
    if (savedTestId) setTestId(savedTestId);
  }, []);

  // React Query v5 compliant query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['leaderboard', testId, limit],
    queryFn: ({ queryKey }) => {
      const [, testIdFromKey, limitFromKey] = queryKey;
      if (!testIdFromKey) throw new Error('Test ID is required');
      return getLeaderboard(testIdFromKey, { limit: limitFromKey });
    },
    enabled: !!testId,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  });

  if (!testId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-gray-600">No test selected for leaderboard.</p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-red-600">
            Error loading leaderboard: {error?.message || 'Something went wrong'}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  if (!data?.leaderboard || !data.leaderboard.entries?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-gray-600">Leaderboard not available.</p>
        </Card>
      </div>
    );
  }

  const { leaderboard } = data;
  const { entries, userRank, totalParticipants } = leaderboard;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <Card className="p-6 mb-6 overflow-x-auto">
        <div className="flex justify-between text-sm text-gray-700 mb-4">
          <div>Your Rank: #{userRank ?? '-'}</div>
          <div>Participants: {formatNumber(totalParticipants ?? 0)}</div>
        </div>

        <table className="min-w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Rank</th>
              <th className="px-4 py-2 border-b">User</th>
              <th className="px-4 py-2 border-b">Score</th>
              <th className="px-4 py-2 border-b">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr
                key={e.rank}
                className={
                  e.rank === userRank
                    ? 'bg-primary-50'
                    : 'hover:bg-gray-50 transition-colors'
                }
              >
                <td className="px-4 py-2 border-b font-medium">{e.rank}</td>
                <td className="px-4 py-2 border-b">{e.user?.username ?? 'N/A'}</td>
                <td className="px-4 py-2 border-b">{e.score ?? 0}</td>
                <td className="px-4 py-2 border-b">
                  {formatPercentage(e.accuracy ?? 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-gray-600">
          You are in top{' '}
          {formatPercentage(
            ((totalParticipants - (userRank ?? totalParticipants)) /
              totalParticipants) *
              100
          )}
          %
        </p>
      </Card>
    </div>
  );
};

export default Leaderboard;
