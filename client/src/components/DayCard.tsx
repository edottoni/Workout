// =============================================================
// DAY CARD — Clickable card for each training day
// Design: Midnight Glassmorphism / Premium Dark
// Features: muscle group color coding, hover animation
// =============================================================

import React from 'react';
import { WorkoutDay, MUSCLE_COLORS, MUSCLE_LABELS } from '@/lib/workoutData';
import { Clock, ChevronRight } from 'lucide-react';

interface DayCardProps {
  day: WorkoutDay;
  index: number;
  onClick: (day: WorkoutDay) => void;
}

export function DayCard({ day, index, onClick }: DayCardProps) {
  const primaryColor = MUSCLE_COLORS[day.muscleGroups[0]];

  return (
    <div
      className="day-card glass rounded-2xl p-5 cursor-pointer relative"
      style={{
        borderLeft: `3px solid ${primaryColor}`,
        animationDelay: `${index * 100}ms`,
        animation: 'fadeSlideIn 0.4s ease-out forwards',
        opacity: 0,
      }}
      onClick={() => onClick(day)}
    >
      {/* Day abbreviation */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="text-xs font-bold px-2.5 py-1 rounded-lg tracking-widest"
          style={{
            background: `${primaryColor}22`,
            color: primaryColor,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {day.dayAbbr}
        </div>
        <ChevronRight size={16} className="text-white/30 mt-0.5" />
      </div>

      {/* Day name */}
      <h3
        className="text-white font-extrabold text-xl leading-tight mb-1"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {day.dayName}
      </h3>

      {/* Label */}
      <p className="text-white/60 text-sm mb-3 leading-snug">{day.label}</p>

      {/* Muscle group badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {day.muscleGroups.slice(0, 3).map(mg => (
          <span
            key={mg}
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: `${MUSCLE_COLORS[mg]}18`,
              color: MUSCLE_COLORS[mg],
              border: `1px solid ${MUSCLE_COLORS[mg]}33`,
            }}
          >
            {MUSCLE_LABELS[mg]}
          </span>
        ))}
        {day.muscleGroups.length > 3 && (
          <span className="text-xs px-2 py-0.5 rounded-full text-white/40 bg-white/10">
            +{day.muscleGroups.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-white/40 text-xs">
          <Clock size={11} />
          <span className="font-mono">{day.duration}</span>
        </div>
        <span className="text-white/30 text-xs font-mono">
          {day.exercises.length} exerc.
        </span>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
      />
    </div>
  );
}
