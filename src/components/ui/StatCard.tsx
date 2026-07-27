import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/format';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'red' | 'cyan';
}

const colors = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', text: 'text-blue-600' },
  green: { bg: 'bg-emerald-50', icon: 'bg-emerald-500', text: 'text-emerald-600' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-500', text: 'text-purple-600' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-500', text: 'text-amber-600' },
  red: { bg: 'bg-red-50', icon: 'bg-red-500', text: 'text-red-600' },
  cyan: { bg: 'bg-cyan-50', icon: 'bg-cyan-500', text: 'text-cyan-600' },
};

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'blue' }: StatCardProps) {
  const c = colors[color];
  return (
    <div className={cn('rounded-2xl p-5 border border-slate-300 bg-white')}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-700 truncate">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900 leading-tight">{value}</p>
          {subtitle && <p className="mt-1 text-xs font-medium text-slate-600">{subtitle}</p>}
          {trend && (
            <div className={cn('mt-2 flex items-center gap-1 text-xs font-medium', trend.up ? 'text-emerald-600' : 'text-red-500')}>
              {trend.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {trend.value}
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl ml-3 flex-shrink-0', c.bg)}>
          <Icon size={22} className={c.text} />
        </div>
      </div>
    </div>
  );
}
