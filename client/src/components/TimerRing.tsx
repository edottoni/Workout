// =============================================================
// TIMER RING — Animated SVG circular progress timer
// Design: Midnight Glassmorphism / Premium Dark
// Fonts: JetBrains Mono for time display
// =============================================================

import React, { useEffect, useRef } from 'react';

interface TimerRingProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  color: string;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function TimerRing({
  timeLeft,
  totalTime,
  isRunning,
  color,
  size = 160,
  strokeWidth = 8,
  showLabel = true,
}: TimerRingProps) {
  const ringRef = useRef<SVGCircleElement>(null);
  const prevRunningRef = useRef(isRunning);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const dashOffset = circumference * (1 - progress);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isFinished = timeLeft === 0;
  const isAlmostDone = timeLeft <= 10 && timeLeft > 0;

  // Flash color when almost done
  const ringColor = isFinished
    ? '#ef4444'
    : isAlmostDone
    ? '#f97316'
    : color;

  useEffect(() => {
    if (!prevRunningRef.current && isRunning && ringRef.current) {
      ringRef.current.style.transition = 'stroke-dashoffset 1s linear';
    }
    prevRunningRef.current = isRunning;
  }, [isRunning]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className={isRunning ? 'animate-timer-pulse' : ''}
        style={{ '--timer-color': ringColor } as React.CSSProperties}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          ref={ringRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: isRunning ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.3s ease',
            filter: `drop-shadow(0 0 ${isAlmostDone ? 10 : 6}px ${ringColor})`,
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`timerGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ringColor} stopOpacity="1" />
            <stop offset="100%" stopColor={ringColor} stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="timer-display font-mono leading-none"
            style={{
              fontSize: size * 0.22,
              color: isFinished ? '#ef4444' : isAlmostDone ? '#f97316' : 'white',
              fontWeight: 700,
              textShadow: `0 0 20px ${ringColor}`,
              transition: 'color 0.3s ease',
            }}
          >
            {timeStr}
          </span>
          <span
            className="text-white/50 mt-1"
            style={{ fontSize: size * 0.09 }}
          >
            {isFinished ? 'PRONTO!' : isRunning ? 'DESCANSANDO' : 'PAUSADO'}
          </span>
        </div>
      )}
    </div>
  );
}
