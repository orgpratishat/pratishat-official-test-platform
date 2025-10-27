import { format, formatDistanceToNow } from 'date-fns';

export const formatTime = seconds => {
  if (!seconds) return '0s';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s}s`;
  return `${s}s`;
};

export const formatDate = (date, pattern = 'PPP') =>
  date ? format(new Date(date), pattern) : '';

export const formatRelativeTime = date =>
  date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : '';

export const formatNumber = num =>
  num != null ? num.toLocaleString('en-IN') : '0';

export const formatPercentage = (value, d = 2) =>
  value != null ? `${value.toFixed(d)}%` : '0%';

export const formatMarks = (obt, total) => `${obt}/${total}`;

export const getAccuracyColor = acc =>
  acc >= 70 ? 'text-green-600' : acc >= 50 ? 'text-yellow-600' : 'text-red-600';

export const getAccuracyBadgeColor = acc =>
  acc >= 70
    ? 'bg-green-100 text-green-800'
    : acc >= 50
    ? 'bg-yellow-100 text-yellow-800'
    : 'bg-red-100 text-red-800';

export const truncateText = (text, max = 100) =>
  text?.length > max ? text.slice(0, max) + '...' : text;
