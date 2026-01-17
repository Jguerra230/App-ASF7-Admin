import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'active':
      case 'active':
      case 'published':
      case 'live':
      case 'open':
        return 'bg-green-900/30 text-green-400 border border-green-800';
      case 'upcoming':
      case 'scheduled':
      case 'draft':
        return 'bg-blue-900/30 text-blue-400 border border-blue-800';
      case 'finished':
      case 'archived':
      case 'closed':
        return 'bg-gray-800 text-gray-400 border border-gray-700';
      case 'suspended':
      case 'injured':
        return 'bg-red-900/30 text-red-400 border border-red-800';
      default:
        return 'bg-dark-700 text-gray-300';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs uppercase tracking-wide font-medium ${getStyles(status)}`}>
      {status}
    </span>
  );
};