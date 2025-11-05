// components/QuestionStatistics.js
import React, { useMemo } from 'react';
import Card from '../../../components/ui/Card';

const QuestionStatistics = ({ questions, selectedQuestions }) => {
  const stats = useMemo(() => {
    const total = questions.length;
    const selected = selectedQuestions.length;
    
    const bySubject = questions.reduce((acc, question) => {
      const subject = question.subject || 'Unknown';
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {});
    
    return { total, selected, bySubject };
  }, [questions, selectedQuestions]);

  if (questions.length === 0) return null;

  return (
    <Card className="p-4 mb-4 bg-green-50 border border-green-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.total}</div>
          <div className="text-gray-600">Total Questions</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.selected}</div>
          <div className="text-gray-600">Selected</div>
        </div>
        
        {Object.entries(stats.bySubject).map(([subject, count]) => (
          <div key={subject} className="text-center">
            <div className="text-xl font-bold text-purple-600">{count}</div>
            <div className="text-gray-600">{subject}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuestionStatistics;