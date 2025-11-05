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




// Enhanced formatTextWithHTML with square root support
export const formatTextWithHTML = (text) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  
  return lines.map(line => 
    line
      // Process square root syntax: √{content}
      .replace(/√\{([^}]+)\}/g, '<span class="square-root"><span class="radical-symbol">√</span><span class="radical-content">$1</span></span>')
      // Process fraction syntax: {{numerator|denominator}}
      .replace(/\{\{([^}]+)\|([^}]+)\}\}/g, '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>')
      .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
      .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
      .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
      .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>')
  ).join('<br>');
};

// export const formatRelativeTime = (timestamp) => {
//   // Your existing relative time formatting logic
//   const now = new Date();
//   const time = new Date(timestamp);
//   const diffInSeconds = Math.floor((now - time) / 1000);
  
//   if (diffInSeconds < 60) return 'Just now';
//   if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
//   if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
//   return `${Math.floor(diffInSeconds / 86400)} days ago`;
// };