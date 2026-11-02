import React from 'react';
import { RefreshCw, Maximize2 } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  onRefresh?: () => void;
  children: React.ReactNode;
  height?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  badge,
  onRefresh,
  children,
  height = 'h-64',
}) => {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              {title}
            </h3>
            {badge && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-1">
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Refresh telemetry chart"
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            title="Expand"
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className={`w-full ${height} flex items-center justify-center`}>
        {children}
      </div>
    </div>
  );
};
