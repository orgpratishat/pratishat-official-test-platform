import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatMarks, formatPercentage, formatTime } from '../../utils/formatters';
import { Trophy } from 'lucide-react';

const ScoreCard = ({ score, totalTime, predictedRank, onDownload }) => (
  <Card className="p-6 mb-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Score</h2>
        <p className="text-lg text-gray-700">
          {formatMarks(score.obtainedMarks, score.totalMarks)} &nbsp; 
          <span className="text-sm text-gray-500">({formatPercentage(score.accuracy)})</span>
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">Time Spent</p>
        <p className="font-mono text-lg text-gray-900">{formatTime(totalTime)}</p>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
        <div>
          <p className="text-sm text-gray-600">Predicted Rank</p>
          <p className="text-xl font-semibold text-gray-900">#{predictedRank}</p>
        </div>
      </div>
      <Button variant="outline" onClick={onDownload}>
        Download Report
      </Button>
    </div>
  </Card>
);

export default ScoreCard;
