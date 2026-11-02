import React from 'react';

export type BadgeVariant =
  | 'ESTABLISHED'
  | 'CONNECTING'
  | 'REKEYING'
  | 'DOWN'
  | 'DEGRADED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'STOPPED'
  | 'FAILED'
  | 'CRITICAL'
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW'
  | 'SECURE'
  | 'READY'
  | 'CAPTURING'
  | 'ONLINE'
  | 'OFFLINE';

interface StatusBadgeProps {
  status: BadgeVariant | string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
}) => {
  const normalized = status.toUpperCase();

  let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  switch (normalized) {
    case 'ESTABLISHED':
    case 'SECURE':
    case 'ONLINE':
    case 'READY':
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      dotColor = 'bg-emerald-600';
      break;
    case 'CAPTURING':
    case 'RUNNING':
      colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
      dotColor = 'bg-blue-600';
      break;
    case 'CONNECTING':
    case 'REKEYING':
    case 'MEDIUM':
      colorClass = 'bg-amber-50 text-amber-800 border-amber-200';
      dotColor = 'bg-amber-500';
      break;
    case 'HIGH':
      colorClass = 'bg-orange-50 text-orange-800 border-orange-200';
      dotColor = 'bg-orange-500';
      break;
    case 'CRITICAL':
    case 'DOWN':
    case 'FAILED':
    case 'OFFLINE':
      colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
      dotColor = 'bg-rose-600';
      break;
    case 'COMPLETED':
    case 'STOPPED':
    case 'LOW':
      colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
      dotColor = 'bg-slate-400';
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${colorClass} ${sizeClasses[size]}`}
    >
      <span className={`inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      <span>{label || status}</span>
    </span>
  );
};
