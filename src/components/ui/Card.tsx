import React from 'react';
import { cn } from '../../utils/format';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  key?: React.Key;
}

export default function Card({ children, className, padding = true }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-2xl border border-slate-300',
      padding ? 'p-6' : '',
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-base font-bold text-gray-900', className)}>{children}</h3>;
}
