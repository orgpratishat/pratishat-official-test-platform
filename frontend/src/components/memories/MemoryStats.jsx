import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const MemoryStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <Card className="p-6 text-center">
      <div className="text-2xl font-bold text-red-600">{stats.total}</div>
      <div className="text-sm text-gray-600 mt-1">Total Mistakes</div>
    </Card>
    {stats.bySubject.map((s) => (
      <Card key={s.subject} className="p-6 text-center">
        <Badge text={s.subject} />
        <div className="text-xl font-semibold text-gray-900 mt-2">{s.count}</div>
      </Card>
    ))}
  </div>
);

export default MemoryStats;
