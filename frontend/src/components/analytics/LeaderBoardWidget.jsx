// import React from 'react';
// import Card from '../ui/Card';
// import { Trophy } from 'lucide-react';
// import { formatNumber, formatPercentage } from '../../utils/formatters';

// const LeaderboardWidget = ({ leaderboard, userRank, totalParticipants }) => (
//   <Card className="p-6 mb-6">
//     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//       <Trophy className="w-6 h-6 text-yellow-500 mr-2" /> Top Performers
//     </h3>
//     <div className="overflow-auto">
//       <table className="min-w-full text-left text-sm">
//         <thead>
//           <tr className="border-b">
//             <th className="px-3 py-2">Rank</th>
//             <th className="px-3 py-2">User</th>
//             <th className="px-3 py-2">Score</th>
//             <th className="px-3 py-2">Accuracy</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboard?.entries?.slice(0, 5).map((entry) => (
//             <tr key={entry.rank} className={entry.rank === userRank ? 'bg-primary-100' : ''}>
//               <td className="px-3 py-2 font-medium">{entry.rank}</td>
//               <td className="px-3 py-2">{entry.user.username}</td>
//               <td className="px-3 py-2">{entry.score}</td>
//               <td className="px-3 py-2">{formatPercentage(entry.accuracy)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <p className="text-sm text-gray-600 mt-4">
//       You are in top {formatNumber((totalParticipants - userRank) / totalParticipants * 100)}%
//     </p>
//   </Card>
// );

// export default LeaderboardWidget;




// src/components/LeaderboardWidget.jsx

import React from 'react';
import Card from '../ui/Card';
import { Trophy } from 'lucide-react';
import { formatNumber, formatPercentage } from '../../utils/formatters';

const LeaderboardWidget = ({ leaderboard, userRank, totalParticipants }) => {
  const entries = leaderboard?.entries || [];

  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" /> Top Performers
      </h3>

      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Score</th>
              <th className="px-3 py-2">Accuracy</th>
            </tr>
          </thead>

          <tbody>
            {entries.slice(0, 5).map((entry, idx) => {
              const rank = idx + 1;
              const highlight = rank === userRank;
              return (
                <tr key={entry.user._id || entry.username || idx} className={highlight ? 'bg-primary-100' : ''}>
                  <td className="px-3 py-2 font-medium">{rank}</td>
                  <td className="px-3 py-2">{entry.user.username}</td>
                  <td className="px-3 py-2">{entry.score}</td>
                  <td className="px-3 py-2">{formatPercentage(entry.accuracy)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        You are in top{' '}
        {formatNumber(
          totalParticipants > 0
            ? ((totalParticipants - userRank + 1) / totalParticipants) * 100
            : 0
        )}
        %
      </p>
    </Card>
  );
};

export default LeaderboardWidget;
