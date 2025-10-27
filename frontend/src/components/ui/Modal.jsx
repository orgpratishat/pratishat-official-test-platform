import React from 'react';
import { cn } from '../../utils/cn';

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={cn('bg-white rounded-lg shadow-lg overflow-auto max-h-full w-full max-w-2xl', className)}>
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
