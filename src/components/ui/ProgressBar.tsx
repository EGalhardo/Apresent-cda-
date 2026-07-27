import React from 'react';
import { cn } from '../../utils/format';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-600',
  emerald: 'bg-emerald-600',
  amber: 'bg-amber-500',
  purple: 'bg-purple-600',
  red: 'bg-red-500',
};

const sizeMap = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = true,
  color = 'blue',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percent = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          {label && <span className="text-slate-700 truncate">{label}</span>}
          {showPercent && <span className="text-slate-900 font-bold ml-auto">{percent}%</span>}
        </div>
      )}

      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5', sizeMap[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colorMap[color])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
