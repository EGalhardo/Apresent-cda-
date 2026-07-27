import React, { useState } from 'react';

interface TooltipProps {
  key?: React.Key;
  title?: string;
  purpose?: string;
  meaning?: string;
  content?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export default function Tooltip({
  title,
  purpose,
  meaning,
  content,
  position = 'top',
  children,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl border border-slate-700 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95 ${posClasses[position]}`}
          role="tooltip"
        >
          {title && (
            <div className="font-bold text-blue-300 border-b border-slate-700 pb-1 mb-1.5 flex items-center justify-between">
              <span>{title}</span>
              <span className="text-[10px] text-slate-300 uppercase tracking-wider font-mono font-bold">Info</span>
            </div>
          )}
          {purpose && (
            <div className="mb-1">
              <span className="text-blue-200 font-semibold">Finalidade: </span>
              <span className="text-slate-100 font-medium">{purpose}</span>
            </div>
          )}
          {meaning && (
            <div>
              <span className="text-blue-200 font-semibold">Interpretação: </span>
              <span className="text-slate-100 font-medium">{meaning}</span>
            </div>
          )}
          {content && !purpose && !meaning && (
            <div className="text-slate-100 leading-relaxed font-medium">{content}</div>
          )}
        </div>
      )}
    </div>
  );
}
