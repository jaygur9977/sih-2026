import React from 'react';
import { Database } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There are currently no records matching the selected parameters.',
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50">
      <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-500 border border-slate-200">
        {icon || <Database className="h-6 w-6 text-slate-400" />}
      </div>
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      <p className="mt-1 max-w-sm text-xs text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
