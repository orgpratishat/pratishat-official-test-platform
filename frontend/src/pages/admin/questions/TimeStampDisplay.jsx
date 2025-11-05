import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Copy, Check } from 'lucide-react';
import { formatRelativeTime } from '../../../utils/formatters';
import toast from 'react-hot-toast';

const TimestampDisplay = ({ timestamp, label = "Created" }) => {
  const [copied, setCopied] = useState(false);

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatTimestamp(timestamp));
      setCopied(true);
      toast.success('Timestamp copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy timestamp:', err);
      toast.error('Failed to copy timestamp');
    }
  };

  if (!timestamp) return null;

  return (
    <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex-1">
        <span className="text-xs font-medium text-gray-600">{label}:</span>
        <div className="text-xs text-gray-800 font-mono">
          {formatTimestamp(timestamp)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {formatRelativeTime(timestamp)}
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="flex items-center gap-1 min-w-0 px-2 py-1 text-xs"
        title="Copy timestamp"
      >
        {copied ? (
          <Check className="w-3 h-3 text-green-600" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};

export default TimestampDisplay;