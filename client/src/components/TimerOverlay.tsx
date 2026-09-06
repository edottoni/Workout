// =============================================================
// TIMER OVERLAY — Floating widget, always on top
// Design: Midnight Glassmorphism / Premium Dark
// Collapsed: mini pill with time + controls
// Expanded: full timer ring + controls
// =============================================================

import React from 'react';
import { useTimer } from '@/contexts/TimerContext';
import { TimerRing } from './TimerRing';
import { Play, Pause, RotateCcw, Minimize2, X, ChevronUp } from 'lucide-react';

export function TimerOverlay() {
  const {
    isRunning,
    timeLeft,
    totalTime,
    exerciseName,
    exerciseColor,
    isOverlayVisible,
    isOverlayExpanded,
    pauseTimer,
    resetTimer,
    addTime,
    resetToDefault,
    toggleOverlayExpanded,
    hideOverlay,
  } = useTimer();

  if (!isOverlayVisible) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isFinished = timeLeft === 0;
  const isAlmostDone = timeLeft <= 10 && timeLeft > 0;

  const displayColor = isFinished ? '#ef4444' : isAlmostDone ? '#f97316' : exerciseColor;

  return (
    <div
      className="fixed bottom-6 right-4 z-50"
      style={{ animation: 'overlaySlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
    >
      {isOverlayExpanded ? (
        /* ---- EXPANDED VIEW ---- */
        <div
          className="glass-strong rounded-2xl p-5 shadow-2xl"
          style={{
            width: 260,
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${displayColor}22`,
            border: `1px solid ${displayColor}33`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Descanso</p>
              <p
                className="text-white text-sm font-semibold truncate"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {exerciseName || 'Timer'}
              </p>
            </div>
            <div className="flex gap-1 ml-2">
              <button
                onClick={toggleOverlayExpanded}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={hideOverlay}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Timer Ring */}
          <div className="flex justify-center my-2">
            <TimerRing
              timeLeft={timeLeft}
              totalTime={totalTime}
              isRunning={isRunning}
              color={displayColor}
              size={160}
              strokeWidth={8}
              showLabel={true}
            />
          </div>

          {/* Controls */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={pauseTimer}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${displayColor}cc, ${displayColor}88)`,
                boxShadow: `0 4px 15px ${displayColor}44`,
              }}
            >
              {isRunning ? <Pause size={14} /> : <Play size={14} />}
              {isRunning ? 'Pausar' : 'Iniciar'}
            </button>
            <button
              onClick={resetTimer}
              className="p-2.5 rounded-xl text-white/60 hover:text-white glass transition-all active:scale-95"
              title="Zerar"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Extra controls */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => addTime(10)}
              className="flex-1 py-2 rounded-xl text-white/70 hover:text-white glass text-xs font-medium transition-all active:scale-95"
            >
              +10s
            </button>
            <button
              onClick={() => addTime(30)}
              className="flex-1 py-2 rounded-xl text-white/70 hover:text-white glass text-xs font-medium transition-all active:scale-95"
            >
              +30s
            </button>
            <button
              onClick={resetToDefault}
              className="flex-1 py-2 rounded-xl text-white/70 hover:text-white glass text-xs font-medium transition-all active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        /* ---- COLLAPSED VIEW (mini pill) ---- */
        <div
          className="glass-strong rounded-2xl shadow-2xl overflow-hidden"
          style={{
            width: 200,
            boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${displayColor}22`,
            border: `1px solid ${displayColor}33`,
          }}
        >
          {/* Progress bar */}
          <div className="h-1 w-full bg-white/10">
            <div
              className="h-full transition-all duration-1000 ease-linear"
              style={{
                width: `${totalTime > 0 ? (timeLeft / totalTime) * 100 : 0}%`,
                background: displayColor,
                boxShadow: `0 0 8px ${displayColor}`,
              }}
            />
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2">
              {/* Time display */}
              <div
                className="timer-display font-mono text-xl font-bold leading-none"
                style={{
                  color: isFinished ? '#ef4444' : isAlmostDone ? '#f97316' : 'white',
                  textShadow: `0 0 12px ${displayColor}`,
                  minWidth: 56,
                }}
              >
                {timeStr}
              </div>

              {/* Play/Pause */}
              <button
                onClick={pauseTimer}
                className="p-1.5 rounded-lg transition-all active:scale-95"
                style={{
                  background: `${displayColor}33`,
                  color: displayColor,
                }}
              >
                {isRunning ? <Pause size={13} /> : <Play size={13} />}
              </button>

              {/* Reset */}
              <button
                onClick={resetTimer}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <RotateCcw size={13} />
              </button>

              {/* Expand */}
              <button
                onClick={toggleOverlayExpanded}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <ChevronUp size={13} />
              </button>
            </div>

            {exerciseName && (
              <p className="text-white/40 text-xs mt-1 truncate">{exerciseName}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
