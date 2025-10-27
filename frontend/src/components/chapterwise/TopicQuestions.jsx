import React from 'react';
import Card from '../ui/Card';
import { CheckCircle, XCircle } from 'lucide-react';

const TopicQuestions = ({ questions, onStart }) => (
  <div className="space-y-4">
    {questions.map((q) => (
      <Card key={q._id} className="p-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-900 font-medium">{q.questionText}</p>
          <div className="flex gap-2">
            {q.wasWrong ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>
        <Button onClick={() => onStart(q._id)}>Practice</Button>
      </Card>
    ))}
  </div>
);

import Button from '../ui/Button';
export default TopicQuestions;
