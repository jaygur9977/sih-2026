import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  icon?: LucideIcon;
  badgeText?: string;
  accentColor?: 'cyan' | 'emerald' | 'blue' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  badgeText,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg bg-white border border-slate-200 p-5 shadow-sm transition-all hover:border-slate-300 ${
        onClick ? 'cursor-pointer hover:shadow' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
            {badgeText && (
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {badgeText}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className="rounded-lg p-2.5 bg-blue-50 text-blue-600 border border-blue-100">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
          {subtitle && <span className="truncate">{subtitle}</span>}
          {trend && (
            <span
              className={`font-medium ${
                trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trend.value} {trend.label && <span className="text-slate-400 font-normal">({trend.label})</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
