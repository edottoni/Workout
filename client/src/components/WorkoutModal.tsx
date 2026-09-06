// =============================================================
// WORKOUT MODAL — Full-screen panel for a training day
// Design: Midnight Glassmorphism / Premium Dark
// Features: exercise list, progress tracking, complete button
// =============================================================

import React, { useState, useCallback, useEffect } from 'react';
import { WorkoutDay, MUSCLE_COLORS, MUSCLE_LABELS } from '@/lib/workoutData';
import { ExerciseCard } from './ExerciseCard';
import { playWorkoutCompleteSound } from '@/lib/bellSound';
import { X, Trophy, Clock, Flame } from 'lucide-react';

interface WorkoutModalProps {
  day: WorkoutDay | null;
  onClose: () => void;
}

export function WorkoutModal({ day, onClose }: WorkoutModalProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isWorkoutDone, setIsWorkoutDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (day) {
      setCompletedExercises(new Set());
      setIsWorkoutDone(false);
      // Trigger entrance animation
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [day]);

  const handleExerciseCompleted = useCallback((id: string) => {
    setCompletedExercises(prev => { const next = new Set(prev); next.add(id); return next; });
  }, []);

  const handleWorkoutComplete = useCallback(() => {
    playWorkoutCompleteSound();
    setIsWorkoutDone(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  if (!day) return null;

  const totalExercises = day.exercises.length;
  const doneCount = completedExercises.size;
  const progressPct = totalExercises > 0 ? (doneCount / totalExercises) * 100 : 0;

  // Primary muscle group color for the day
  const primaryMuscle = day.muscleGroups[0];
  const primaryColor = MUSCLE_COLORS[primaryMuscle];

  return (
    <div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="w-full sm:max-w-2xl sm:mx-4 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
        style={{
          background: 'linear-gradient(160deg, rgba(15,12,41,0.98) 0%, rgba(48,43,99,0.98) 100%)',
          border: `1px solid ${primaryColor}33`,
          boxShadow: `0 -20px 60px rgba(0,0,0,0.6), 0 0 40px ${primaryColor}15`,
          maxHeight: '92vh',
          overflow: 'hidden',
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 p-5 pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {day.muscleGroups.map(mg => (
                  <span
                    key={mg}
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${MUSCLE_COLORS[mg]}22`,
                      color: MUSCLE_COLORS[mg],
                      border: `1px solid ${MUSCLE_COLORS[mg]}44`,
                    }}
                  >
                    {MUSCLE_LABELS[mg]}
                  </span>
                ))}
              </div>
              <h2
                className="text-white text-2xl font-extrabold"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {day.dayName} — {day.label}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-white/50 text-sm">
                  <Clock size={13} />
                  {day.duration}
                </span>
                <span className="flex items-center gap-1 text-white/50 text-sm">
                  <Flame size={13} />
                  {totalExercises} exercícios
                </span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/40 mb-1.5 font-mono">
              <span>Progresso</span>
              <span>{doneCount}/{totalExercises} exercícios</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}bb)`,
                  boxShadow: progressPct > 0 ? `0 0 10px ${primaryColor}66` : 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Exercise list */}
        <div className="flex-1 overflow-y-auto p-5 pt-4">
          {isWorkoutDone ? (
            /* Completion screen */
            <div className="flex flex-col items-center justify-center py-12 text-center animate-pop-in">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: `${primaryColor}22`,
                  border: `2px solid ${primaryColor}`,
                  boxShadow: `0 0 40px ${primaryColor}44`,
                }}
              >
                <Trophy size={40} style={{ color: primaryColor }} />
              </div>
              <h3
                className="text-white text-3xl font-extrabold mb-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Treino Concluído!
              </h3>
              <p className="text-white/60 text-base mb-2">
                {day.dayName} — {day.label}
              </p>
              <p className="text-white/40 text-sm mb-8">
                {totalExercises} exercícios completados · {day.duration}
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-xl text-white font-bold text-base transition-all active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}88)`,
                  boxShadow: `0 8px 30px ${primaryColor}44`,
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              {day.exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  onCompleted={handleExerciseCompleted}
                />
              ))}

              {/* Complete workout button */}
              <div className="mt-4 pb-2">
                <button
                  onClick={handleWorkoutComplete}
                  className="w-full py-4 rounded-xl text-white font-bold text-base transition-all active:scale-95 hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}cc, ${primaryColor}88)`,
                    boxShadow: `0 8px 30px ${primaryColor}33`,
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Trophy size={18} />
                    Treino Concluído!
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
