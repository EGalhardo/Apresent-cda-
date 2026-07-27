import React from 'react';
import { cn } from '../../utils/format';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'emerald' | 'yellow' | 'amber' | 'red' | 'blue' | 'purple' | 'gray' | 'slate' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ElementType;
}

const variants: Record<string, string> = {
  blue: 'bg-blue-50/90 text-blue-800 border-blue-200/90 font-bold',
  green: 'bg-emerald-50/90 text-emerald-800 border-emerald-200/90 font-bold',
  emerald: 'bg-emerald-50/90 text-emerald-800 border-emerald-200/90 font-bold',
  yellow: 'bg-amber-50/90 text-amber-800 border-amber-200/90 font-bold',
  amber: 'bg-amber-50/90 text-amber-800 border-amber-200/90 font-bold',
  red: 'bg-red-50/90 text-red-800 border-red-200/90 font-bold',
  purple: 'bg-purple-50/90 text-purple-800 border-purple-200/90 font-bold',
  gray: 'bg-slate-100 text-slate-700 border-slate-200 font-bold',
  slate: 'bg-slate-100 text-slate-700 border-slate-200 font-bold',
  cyan: 'bg-cyan-50/90 text-cyan-800 border-cyan-200/90 font-bold',
};

const sizes = {
  sm: 'px-2.5 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-3.5 py-1.5 text-sm',
};

export default function Badge({ children, variant = 'gray', size = 'sm', className = '', icon: Icon }: BadgeProps) {
  const badgeStyle = variants[variant] || variants.gray;
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border shadow-2xs font-semibold tracking-wide whitespace-nowrap', badgeStyle, sizes[size], className)}>
      {Icon && <Icon size={12} className="flex-shrink-0" />}
      {children}
    </span>
  );
}
