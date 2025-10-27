import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatters';

const TestCard = ({ test, onStart }) => (
  <Card className="p-6 hover:shadow-lg cursor-pointer transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
      <BookOpen className="w-6 h-6 text-primary-600" />
    </div>
    <div className="space-y-2 mb-6">
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-2" /> {formatDate(test.scheduledDate)}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Clock className="w-4 h-4 mr-2" /> {formatTime(test.duration * 60)}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <BookOpen className="w-4 h-4 mr-2" /> {test.questions?.length || 0} Questions
      </div>
    </div>
    <Button className="w-full" onClick={() => onStart(test._id)}>
      Start Test
    </Button>
  </Card>
);

export default TestCard;
