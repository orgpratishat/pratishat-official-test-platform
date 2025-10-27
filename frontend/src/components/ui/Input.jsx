import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400',
      'focus:border-primary-500 focus:ring-primary-500 focus:outline-none',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';
export default Input;
