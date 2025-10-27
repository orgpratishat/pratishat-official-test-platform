import React from 'react';
import Card from '../ui/Card';
import { BookOpen } from 'lucide-react';

const SubjectGrid = ({ subjects, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {subjects.map((subject) => (
      <Card key={subject} className="p-6 cursor-pointer hover:shadow-lg" onClick={() => onSelect(subject)}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{subject}</h3>
          <BookOpen className="w-6 h-6 text-primary-600" />
        </div>
      </Card>
    ))}
  </div>
);

export default SubjectGrid;
