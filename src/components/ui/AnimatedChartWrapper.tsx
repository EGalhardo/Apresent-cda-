import React, { useState, useEffect, useRef } from 'react';

interface AnimatedChartWrapperProps {
  children: (props: { isAnimationActive: boolean; key: number }) => React.ReactNode;
  className?: string;
}

export default function AnimatedChartWrapper({ children, className = '' }: AnimatedChartWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimKey((prev) => prev + 1);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children({ isAnimationActive: isVisible, key: animKey })}
    </div>
  );
}
