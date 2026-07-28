import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils/format';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  duration?: number; // defaults to 10000 (10 seconds)
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
  duration = 10000, // 10 seconds as required
}: ProgressBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentPercent, setCurrentPercent] = useState(0);

  const targetPercent = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) {
      setCurrentPercent(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentPercent(targetPercent * easeProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentPercent(targetPercent);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetPercent, duration]);

  return (
    <div ref={containerRef} className={cn('space-y-1.5', className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          {label && <span className="text-slate-700 truncate">{label}</span>}
          {showPercent && (
            <span className="text-slate-900 font-bold ml-auto font-mono">
              {Math.round(currentPercent)}%
            </span>
          )}
        </div>
      )}

      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5', sizeMap[size])}>
        <div
          className={cn('h-full rounded-full transition-all ease-out', colorMap[color])}
          style={{ width: `${currentPercent}%` }}
        />
      </div>
    </div>
  );
}
