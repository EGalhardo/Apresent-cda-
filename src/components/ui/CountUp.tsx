import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  value: string | number;
  duration?: number; // Optional override duration in ms
  className?: string;
}

interface NumberFormatSpec {
  matchIndex: number;
  length: number;
  originalSubstr: string;
  targetNum: number;
  hasDecimals: boolean;
  decimalPlaces: number;
  isPtDots: boolean;
}

export default function CountUp({ value, duration, className = '' }: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isInView, setIsInView] = useState<boolean>(false);

  // Set up IntersectionObserver to trigger animation when visible and reset when exiting
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Run animation based on isInView state
  useEffect(() => {
    if (value === undefined || value === null) {
      setDisplayValue('');
      return;
    }

    const strVal = String(value).trim();
    if (!strVal) {
      setDisplayValue('');
      return;
    }

    // Find all numeric segments in the string
    const numRegex = /[\d.,]+/g;
    let match: RegExpExecArray | null;
    const specs: NumberFormatSpec[] = [];

    while ((match = numRegex.exec(strVal)) !== null) {
      const numSubstr = match[0];
      const matchIndex = match.index;

      let targetNum = 0;
      let hasDecimals = false;
      let decimalPlaces = 0;
      let isPtDots = false;

      if (numSubstr.includes('.') && numSubstr.includes(',')) {
        targetNum = parseFloat(numSubstr.replace(/\./g, '').replace(',', '.'));
        hasDecimals = true;
        decimalPlaces = (numSubstr.split(',')[1] || '').length;
      } else if (numSubstr.includes('.')) {
        const parts = numSubstr.split('.');
        if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3)) {
          isPtDots = true;
          targetNum = parseFloat(numSubstr.replace(/\./g, ''));
        } else {
          targetNum = parseFloat(numSubstr);
          hasDecimals = true;
          decimalPlaces = parts[1].length;
        }
      } else if (numSubstr.includes(',')) {
        targetNum = parseFloat(numSubstr.replace(',', '.'));
        hasDecimals = true;
        decimalPlaces = (numSubstr.split(',')[1] || '').length;
      } else {
        targetNum = parseInt(numSubstr, 10);
      }

      if (!isNaN(targetNum) && targetNum > 0) {
        specs.push({
          matchIndex,
          length: numSubstr.length,
          originalSubstr: numSubstr,
          targetNum,
          hasDecimals,
          decimalPlaces,
          isPtDots,
        });
      }
    }

    // If no animatable numbers, display original string
    if (specs.length === 0) {
      setDisplayValue(strVal);
      return;
    }

    // Function to build string for a given progress [0..1]
    const buildFormattedString = (progress: number) => {
      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      let result = '';
      let lastIdx = 0;

      for (const spec of specs) {
        result += strVal.substring(lastIdx, spec.matchIndex);
        const currentVal = spec.targetNum * easeProgress;

        let formattedNum = '';
        if (spec.isPtDots || (!spec.hasDecimals && spec.targetNum >= 1000)) {
          formattedNum = Math.round(currentVal).toLocaleString('pt-AO');
        } else if (spec.hasDecimals) {
          formattedNum = currentVal.toFixed(spec.decimalPlaces).replace('.', ',');
        } else {
          formattedNum = Math.round(currentVal).toString();
        }

        result += formattedNum;
        lastIdx = spec.matchIndex + spec.length;
      }

      result += strVal.substring(lastIdx);
      return result;
    };

    // If out of view, set to 0 state so it resets and animates when scrolling back
    if (!isInView) {
      setDisplayValue(buildFormattedString(0));
      return;
    }

    // Determine duration based on magnitude or explicit prop
    const maxTarget = Math.max(...specs.map((s) => s.targetNum));
    let calculatedDuration = 2000;
    if (duration !== undefined && duration !== 10000) {
      calculatedDuration = duration;
    } else {
      if (maxTarget <= 100) calculatedDuration = 1000;
      else if (maxTarget <= 10000) calculatedDuration = 2000;
      else if (maxTarget <= 1000000) calculatedDuration = 3000;
      else calculatedDuration = 4000;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / calculatedDuration, 1);

      setDisplayValue(buildFormattedString(progress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(strVal);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, isInView]);

  return (
    <span ref={spanRef} className={className}>
      {displayValue || String(value)}
    </span>
  );
}
