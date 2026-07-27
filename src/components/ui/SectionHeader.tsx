import React from 'react';
import Badge from './Badge';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'blue' | 'green' | 'amber' | 'purple' | 'red' | 'gray';
  action?: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  badge,
  badgeVariant = 'blue',
  action,
  icon: Icon,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 ${className}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          {Icon && <Icon size={20} className="text-blue-600 flex-shrink-0" />}
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
