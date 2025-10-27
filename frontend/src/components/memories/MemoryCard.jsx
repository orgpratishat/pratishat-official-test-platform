import React from 'react';
import Card from '../ui/Card';
import { Trash2 } from 'lucide-react';

const MemoryCard = ({ memory, onDelete }) => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{memory.questionText}</h3>
        <p className="text-sm text-gray-600">
          {memory.subject} &middot; {memory.chapter} &middot; {memory.topic}
        </p>
      </div>
      <button onClick={() => onDelete(memory._id)} className="text-red-500 hover:text-red-700">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-red-50 p-4 rounded">
        <p className="text-red-600 font-medium mb-1">Your Answer</p>
        <p className="text-gray-800">{memory.userAnswerText}</p>
      </div>
      <div className="bg-green-50 p-4 rounded">
        <p className="text-green-600 font-medium mb-1">Correct Answer</p>
        <p className="text-gray-800">{memory.correctAnswerText}</p>
      </div>
    </div>
  </Card>
);

export default MemoryCard;
