import React from 'react';
import Badge from './Badge';

interface PageHeaderProps {
  badge: string;
  secondaryBadge?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ElementType;
}

export default function PageHeader({
  badge,
  secondaryBadge = 'Apresentação Interativa',
  title,
  description,
  action,
  icon: Icon,
}: PageHeaderProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-3 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue" className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              {badge}
            </Badge>
            {secondaryBadge && (
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100/80">
                {secondaryBadge}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            {Icon && <Icon size={32} className="text-blue-600 flex-shrink-0" />}
            <span>{title}</span>
          </h1>

          <div className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium text-justify space-y-3">
            {description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {action && (
          <div className="flex-shrink-0 self-start sm:self-center pt-2 sm:pt-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
