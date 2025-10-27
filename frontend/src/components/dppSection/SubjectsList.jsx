import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BookOpen } from 'lucide-react';

const SubjectsList = ({ subjects, onSubjectSelect }) => {
  const getSubjectColor = (subject) => {
    const colors = {
      Physics: 'bg-blue-100 text-blue-800',
      Chemistry: 'bg-green-100 text-green-800',
      Biology: 'bg-purple-100 text-purple-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <Card 
          key={subject.name} 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSubjectSelect(subject)}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${getSubjectColor(subject.name)}`}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {subject.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {subject.totalDPPs || 0} DPPs available
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Chapters
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SubjectsList;