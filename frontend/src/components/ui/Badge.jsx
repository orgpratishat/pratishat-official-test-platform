import React from 'react';
import { getAccuracyBadgeColor } from '../../utils/formatters';

const Badge = ({ text, accuracy, className }) => {
  const colorClasses = accuracy !== undefined ? getAccuracyBadgeColor(accuracy) : 'bg-gray-100 text-gray-800';
  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${colorClasses} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
