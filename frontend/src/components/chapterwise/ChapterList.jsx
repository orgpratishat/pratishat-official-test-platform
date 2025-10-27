import React from 'react';
import Card from '../ui/Card';
import { ChevronRight } from 'lucide-react';

const ChapterList = ({ chapters, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {chapters.map((ch) => (
      <Card key={ch} className="p-6 cursor-pointer hover:shadow-lg" onClick={() => onSelect(ch)}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{ch}</h3>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </Card>
    ))}
  </div>
);

export default ChapterList;
