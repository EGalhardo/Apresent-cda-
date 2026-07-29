import React from 'react';
import Badge from './Badge';

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: 'blue' | 'emerald' | 'purple' | 'amber' | 'red' | 'gray';
  status?: 'completed' | 'in_progress' | 'upcoming';
  icon?: React.ElementType;
}

interface TimelineProps {
  steps: TimelineStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Timeline({ steps, orientation = 'vertical', className = '' }: TimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(steps.length, 4)} gap-4 ${className}`}>
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative bg-white border border-slate-200/90 rounded-2xl p-5 transition-all duration-300 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-xs border border-blue-100">
                    {item.step || `0${idx + 1}`}
                  </span>
                  {Icon && <Icon size={18} className="text-blue-600" />}
                </div>
                {item.badge && <Badge variant={item.badgeVariant || 'blue'}>{item.badge}</Badge>}
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1 text-justify">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-4 relative ${className}`}>
      {steps.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="flex items-start gap-4 p-5 bg-white border border-slate-200/90 rounded-2xl transition-all duration-300"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 font-extrabold border border-blue-100 text-sm">
              {Icon ? <Icon size={20} /> : item.step || `0${idx + 1}`}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">{item.title}</h4>
                {item.badge && <Badge variant={item.badgeVariant || 'blue'}>{item.badge}</Badge>}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed text-justify">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
