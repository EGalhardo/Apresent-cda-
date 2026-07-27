import React from 'react';
import { cn } from '../../utils/format';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  key?: React.Key;
}

export default function Card({
  children,
  className,
  padding = true,
  hoverable = true,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl border border-slate-200/90 shadow-xs transition-all duration-300',
        hoverable && 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        padding ? 'p-6 sm:p-7' : '',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between gap-3 mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-base sm:text-lg font-extrabold text-slate-900 tracking-tight', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-xs sm:text-sm text-slate-600 font-medium leading-relaxed text-justify', className)}>{children}</p>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs', className)}>{children}</div>;
}
