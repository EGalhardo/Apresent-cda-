import React, { useState, useEffect } from 'react';

interface CountUpProps {
  value: string | number;
  duration?: number; // duration in ms, defaults to 10000 (10 seconds)
  className?: string;
}

export default function CountUp({ value, duration = 10000, className = '' }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>('');

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

    // Match numbers including decimals and dots
    const match = strVal.match(/[\d.,]+/);
    if (!match) {
      setDisplayValue(strVal);
      return;
    }

    const numSubstr = match[0];
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

    if (isNaN(targetNum) || targetNum === 0) {
      setDisplayValue(strVal);
      return;
    }

    const prefix = strVal.substring(0, match.index);
    const suffix = strVal.substring((match.index || 0) + numSubstr.length);

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetNum * easeProgress;

      let formattedNum = '';
      if (isPtDots || (!hasDecimals && targetNum >= 1000)) {
        formattedNum = Math.round(currentVal).toLocaleString('pt-AO');
      } else if (hasDecimals) {
        formattedNum = currentVal.toFixed(decimalPlaces).replace('.', ',');
      } else {
        formattedNum = Math.round(currentVal).toString();
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

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
  }, [value, duration]);

  return <span className={className}>{displayValue || String(value)}</span>;
}
