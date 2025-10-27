import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, ...props }) => (
  <div
    className={cn(
      'bg-white rounded-lg shadow-sm overflow-hidden',
      'border border-gray-200',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
