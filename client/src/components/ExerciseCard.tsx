// =============================================================
// EXERCISE CARD — Individual exercise with series checkboxes
// Design: Midnight Glassmorphism / Premium Dark
// Features: primary/variation toggle, series checkboxes,
//           timer trigger on check, collapse when all done
// =============================================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Exercise, MUSCLE_COLORS, MUSCLE_CSS, MUSCLE_LABELS } from '@/lib/workoutData';
import { useTimer } from '@/contexts/TimerContext';
import { playCheckSound } from '@/lib/bellSound';
import { ChevronDown, ChevronUp, Timer, Dumbbell } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  onCompleted?: (id: string) => void;
}

export function ExerciseCard({ exercise, index, onCompleted }: ExerciseCardProps) {
  const { startTimer } = useTimer();
  const [useVariation, setUseVariation] = useState(false);
  const [checkedSeries, setCheckedSeries] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const current = useVariation ? exercise.variation : exercise.primary;
  const muscleColor = MUSCLE_COLORS[exercise.muscleGroup];
  const muscleCss = MUSCLE_CSS[exercise.muscleGroup];

  // Initialize checkboxes when sets change
  useEffect(() => {
    setCheckedSeries(new Array(current.sets).fill(false));
    setIsCompleted(false);
    setIsCollapsing(false);
  }, [current.sets, useVariation]);

  const handleCheck = useCallback((seriesIndex: number) => {
    if (isCompleted) return;

    setCheckedSeries(prev => {
      const next = [...prev];
      next[seriesIndex] = !next[seriesIndex];

      // If checking (not unchecking), start timer
      if (next[seriesIndex]) {
        playCheckSound();
        startTimer(current.restSeconds, current.name, muscleColor);
      }

      // Check if all series done
      const allDone = next.every(Boolean);
      if (allDone) {
        setTimeout(() => {
          setIsCollapsing(true);
          setTimeout(() => {
            setIsCompleted(true);
            setIsCollapsing(false);
            onCompleted?.(exercise.id);
          }, 600);
        }, 300);
      }

      return next;
    });
  }, [isCompleted, current, muscleColor, startTimer, exercise.id, onCompleted]);

  const completedCount = checkedSeries.filter(Boolean).length;
  const progressPct = current.sets > 0 ? (completedCount / current.sets) * 100 : 0;

  return (
    <div
      ref={cardRef}
      className={`exercise-card ${muscleCss} rounded-xl mb-3 overflow-hidden transition-all duration-500 ${isCompleted ? 'completed' : ''}`}
      style={{
        animationDelay: `${index * 80}ms`,
        animation: isCollapsing
          ? 'fadeSlideOut 0.6s ease-out forwards'
          : 'fadeSlideIn 0.35s ease-out forwards',
        opacity: 0,
      }}
    >
      <div className="glass p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Muscle group badge */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: `${muscleColor}22`,
                  color: muscleColor,
                  border: `1px solid ${muscleColor}44`,
                }}
              >
                {MUSCLE_LABELS[exercise.muscleGroup]}
              </span>
              {isCompleted && (
                <span className="text-xs text-green-400 font-semibold animate-pop-in">
                  ✓ Concluído
                </span>
              )}
            </div>

            {/* Exercise name */}
            <h3
              className="text-white font-bold text-base leading-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {exercise.groupLabel}
            </h3>
            <p className="text-white/60 text-sm mt-0.5">{current.name}</p>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setIsExpanded(v => !v)}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mt-3 text-sm flex-wrap">
          <div className="flex items-center gap-1.5 text-white/70">
            <Dumbbell size={13} style={{ color: muscleColor }} />
            <span className="font-mono">{current.sets} séries</span>
          </div>
          <div className="text-white/70">
            <span className="font-mono">{current.reps} reps</span>
          </div>
          <button
            onClick={() => startTimer(current.restSeconds, current.name, muscleColor)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all active:scale-95 hover:opacity-90"
            style={{
              background: `${muscleColor}22`,
              color: muscleColor,
              border: `1px solid ${muscleColor}33`,
            }}
            title="Iniciar timer de descanso"
          >
            <Timer size={12} />
            <span className="font-mono text-xs">{current.restSeconds}s</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${muscleColor}, ${muscleColor}bb)`,
              boxShadow: progressPct > 0 ? `0 0 8px ${muscleColor}88` : 'none',
            }}
          />
        </div>

        {/* Series checkboxes */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {Array.from({ length: current.sets }).map((_, i) => (
            <label key={i} className="flex items-center gap-1.5 cursor-pointer group">
              <input
                type="checkbox"
                className="series-checkbox"
                style={{ '--muscle-color': muscleColor, '--muscle-glow': `${muscleColor}55` } as React.CSSProperties}
                checked={checkedSeries[i] ?? false}
                onChange={() => handleCheck(i)}
                disabled={isCompleted}
              />
              <span className="text-white/50 text-xs font-mono group-hover:text-white/80 transition-colors">
                S{i + 1}
              </span>
            </label>
          ))}
          {completedCount > 0 && (
            <span className="text-white/40 text-xs ml-auto font-mono">
              {completedCount}/{current.sets}
            </span>
          )}
        </div>

        {/* Expandable: variation toggle */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-fade-slide-in">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3 font-semibold">
              Variação disponível
            </p>

            {/* Toggle buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setUseVariation(false)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  !useVariation
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
                style={
                  !useVariation
                    ? {
                        background: `${muscleColor}33`,
                        border: `1px solid ${muscleColor}66`,
                        color: muscleColor,
                      }
                    : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                {exercise.primary.name}
              </button>
              <button
                onClick={() => setUseVariation(true)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  useVariation
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
                style={
                  useVariation
                    ? {
                        background: `${muscleColor}33`,
                        border: `1px solid ${muscleColor}66`,
                        color: muscleColor,
                      }
                    : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                {exercise.variation.name}
              </button>
            </div>

            {/* Variation details */}
            <div className="mt-3 glass rounded-lg p-3">
              <p className="text-white/80 text-sm font-semibold">{useVariation ? exercise.variation.name : exercise.primary.name}</p>
              <div className="flex gap-4 mt-1.5 text-xs text-white/50 font-mono">
                <span>{useVariation ? exercise.variation.sets : exercise.primary.sets} séries</span>
                <span>{useVariation ? exercise.variation.reps : exercise.primary.reps} reps</span>
                <span>{useVariation ? exercise.variation.restSeconds : exercise.primary.restSeconds}s descanso</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
