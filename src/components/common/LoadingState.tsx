import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading Data...',
  subtext = 'Interrogating IPsec SA states and telemetry metrics',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-4 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
      <p className="text-xs font-semibold text-slate-700">{message}</p>
      <p className="mt-1 text-xs text-slate-500">{subtext}</p>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'System Error',
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-rose-200 bg-rose-50/50">
      <div className="mb-3 rounded-full bg-rose-100 p-2.5 text-rose-600 border border-rose-200">
        <ShieldAlert className="h-5 w-5" />
      </div>
      <h4 className="text-sm font-semibold text-rose-800">{title}</h4>
      <p className="mt-1 max-w-md text-xs text-rose-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700 transition-colors shadow-sm"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
};
