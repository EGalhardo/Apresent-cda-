import React from 'react';
import { cn } from '../../utils/format';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'gray' | 'cyan' | 'amber' | 'emerald';
  size?: 'sm' | 'md';
  className?: string;
}

const variants: Record<string, string> = {
  green: 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold',
  emerald: 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold',
  yellow: 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold',
  amber: 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold',
  red: 'bg-red-100 text-red-900 border border-red-300 font-semibold',
  blue: 'bg-blue-100 text-blue-900 border border-blue-300 font-semibold',
  purple: 'bg-purple-100 text-purple-900 border border-purple-300 font-semibold',
  gray: 'bg-slate-200 text-slate-900 border border-slate-300 font-semibold',
  cyan: 'bg-cyan-100 text-cyan-900 border border-cyan-300 font-semibold',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export default function Badge({ children, variant = 'gray', size = 'sm', className = '' }: BadgeProps) {
  const badgeStyle = variants[variant] || variants.gray;
  return (
    <span className={cn('inline-flex items-center gap-1 font-medium rounded-full', badgeStyle, sizes[size], className)}>
      {children}
    </span>
  );
}

