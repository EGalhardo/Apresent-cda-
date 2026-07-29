import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

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
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (position === 'top') {
      top = rect.top - 8;
      left = rect.left + rect.width / 2;
    } else if (position === 'bottom') {
      top = rect.bottom + 8;
      left = rect.left + rect.width / 2;
    } else if (position === 'left') {
      top = rect.top + rect.height / 2;
      left = rect.left - 8;
    } else if (position === 'right') {
      top = rect.top + rect.height / 2;
      left = rect.right + 8;
    }

    // Clamp coordinates so it stays safely inside the visible viewport
    const padding = 16;
    left = Math.max(padding, Math.min(window.innerWidth - padding, left));
    top = Math.max(padding, Math.min(window.innerHeight - padding, top));

    setCoords({ top, left });
  }, [position]);

  useEffect(() => {
    if (isVisible) {
      updateCoords();
      window.addEventListener('scroll', updateCoords, true);
      window.addEventListener('resize', updateCoords);
      return () => {
        window.removeEventListener('scroll', updateCoords, true);
        window.removeEventListener('resize', updateCoords);
      };
    }
  }, [isVisible, updateCoords]);

  const transformStyle: React.CSSProperties = {
    top: `${coords.top}px`,
    left: `${coords.left}px`,
    transform:
      position === 'top'
        ? 'translate(-50%, -100%)'
        : position === 'bottom'
        ? 'translate(-50%, 0)'
        : position === 'left'
        ? 'translate(-100%, -50%)'
        : 'translate(0, -50%)',
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => {
        updateCoords();
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => {
        updateCoords();
        setIsVisible(true);
      }}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            style={transformStyle}
            className="fixed z-[99999] w-72 max-w-[90vw] p-3.5 bg-slate-900 text-white text-xs rounded-xl border border-slate-700 pointer-events-none transition-opacity duration-150 animate-in fade-in zoom-in-95"
            role="tooltip"
          >
            {title && (
              <div className="font-bold text-blue-300 border-b border-slate-700 pb-1.5 mb-2 flex items-center justify-between">
                <span>{title}</span>
                <span className="text-[10px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono font-bold">
                  Explicação
                </span>
              </div>
            )}
            {purpose && (
              <div className="mb-1.5 leading-relaxed">
                <span className="text-blue-200 font-semibold">Finalidade: </span>
                <span className="text-slate-100 font-medium">{purpose}</span>
              </div>
            )}
            {meaning && (
              <div className="leading-relaxed">
                <span className="text-blue-200 font-semibold">Interpretação: </span>
                <span className="text-slate-100 font-medium">{meaning}</span>
              </div>
            )}
            {content && !purpose && !meaning && (
              <div className="text-slate-100 leading-relaxed font-medium">{content}</div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
