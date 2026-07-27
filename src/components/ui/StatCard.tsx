import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/format';
import Badge from './Badge';

export interface StatCardProps {
  key?: React.Key;
  title: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: string; up: boolean };
  badge?: string;
  badgeVariant?: 'blue' | 'emerald' | 'purple' | 'amber' | 'red' | 'gray';
  color?: 'blue' | 'green' | 'emerald' | 'purple' | 'amber' | 'red' | 'cyan' | 'slate';
  className?: string;
}

const colorStyles = {
  blue: { bg: 'bg-blue-50/90 text-blue-600 border-blue-100', accent: 'bg-blue-600' },
  green: { bg: 'bg-emerald-50/90 text-emerald-600 border-emerald-100', accent: 'bg-emerald-600' },
  emerald: { bg: 'bg-emerald-50/90 text-emerald-600 border-emerald-100', accent: 'bg-emerald-600' },
  purple: { bg: 'bg-purple-50/90 text-purple-600 border-purple-100', accent: 'bg-purple-600' },
  amber: { bg: 'bg-amber-50/90 text-amber-600 border-amber-100', accent: 'bg-amber-600' },
  red: { bg: 'bg-red-50/90 text-red-600 border-red-100', accent: 'bg-red-600' },
  cyan: { bg: 'bg-cyan-50/90 text-cyan-600 border-cyan-100', accent: 'bg-cyan-600' },
  slate: { bg: 'bg-slate-100 text-slate-700 border-slate-200', accent: 'bg-slate-700' },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  badge,
  badgeVariant = 'blue',
  color = 'blue',
  className = '',
}: StatCardProps) {
  const c = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={cn(
        'rounded-2xl p-6 border border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 space-y-3',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
        {Icon ? (
          <div className={cn('p-2.5 rounded-xl border flex items-center justify-center', c.bg)}>
            <Icon size={18} />
          </div>
        ) : badge ? (
          <Badge variant={badgeVariant}>{badge}</Badge>
        ) : null}
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">{value}</div>
        {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 text-xs font-bold pt-1">
          {trend.up ? (
            <span className="text-emerald-700 flex items-center gap-1">
              <TrendingUp size={14} />
              <span>+{trend.value}</span>
            </span>
          ) : (
            <span className="text-red-700 flex items-center gap-1">
              <TrendingDown size={14} />
              <span>-{trend.value}</span>
            </span>
          )}
          <span className="text-slate-500 font-normal">vs. mês anterior</span>
        </div>
      )}
    </div>
  );
}
