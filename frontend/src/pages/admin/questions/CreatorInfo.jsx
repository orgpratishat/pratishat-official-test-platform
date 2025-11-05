import React from 'react';
import { formatRelativeTime } from '../../../utils/formatters';

const CreatorInfo = ({ createdBy, createdAt }) => {
  if (!createdBy) return null;

  return (
    <div className="flex items-center gap-2 mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex-1">
        <span className="text-xs font-medium text-blue-600">Created by:</span>
        <div className="text-xs text-blue-800">
          {createdBy.username} 
          <span className="text-blue-600 ml-2 font-mono">
            (ID: {createdBy.userId?.toString().substring(0, 8)}...)
          </span>
        </div>
        {createdAt && (
          <div className="text-xs text-blue-500 mt-1">
            {formatRelativeTime(createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorInfo;