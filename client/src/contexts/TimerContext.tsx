// =============================================================
// TIMER CONTEXT — Global timer state for overlay + exercise
// Design: Midnight Glassmorphism / Premium Dark
// =============================================================

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { playBell } from '@/lib/bellSound';

interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  totalTime: number;
  exerciseName: string;
  exerciseColor: string;
  isOverlayVisible: boolean;
  isOverlayExpanded: boolean;
}

interface TimerContextValue extends TimerState {
  startTimer: (seconds: number, exerciseName: string, color: string) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  addTime: (seconds: number) => void;
  resetToDefault: () => void;
  toggleOverlay: () => void;
  toggleOverlayExpanded: () => void;
  hideOverlay: () => void;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TimerState>({
    isRunning: false,
    timeLeft: 90,
    totalTime: 90,
    exerciseName: '',
    exerciseColor: '#a855f7',
    isOverlayVisible: false,
    isOverlayExpanded: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const defaultTimeRef = useRef(90);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            clearTimer();
            playBell();
            return { ...prev, timeLeft: 0, isRunning: false };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [state.isRunning, clearTimer]);

  const startTimer = useCallback((seconds: number, exerciseName: string, color: string) => {
    clearTimer();
    defaultTimeRef.current = seconds;
    setState(prev => ({
      ...prev,
      isRunning: true,
      timeLeft: seconds,
      totalTime: seconds,
      exerciseName,
      exerciseColor: color,
      isOverlayVisible: true,
    }));
  }, [clearTimer]);

  const pauseTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    setState(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: prev.totalTime,
    }));
  }, [clearTimer]);

  const addTime = useCallback((seconds: number) => {
    setState(prev => ({
      ...prev,
      timeLeft: prev.timeLeft + seconds,
      totalTime: prev.totalTime + seconds,
    }));
  }, []);

  const resetToDefault = useCallback(() => {
    clearTimer();
    setState(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: defaultTimeRef.current,
      totalTime: defaultTimeRef.current,
    }));
  }, [clearTimer]);

  const toggleOverlay = useCallback(() => {
    setState(prev => ({ ...prev, isOverlayVisible: !prev.isOverlayVisible }));
  }, []);

  const toggleOverlayExpanded = useCallback(() => {
    setState(prev => ({ ...prev, isOverlayExpanded: !prev.isOverlayExpanded }));
  }, []);

  const hideOverlay = useCallback(() => {
    setState(prev => ({ ...prev, isOverlayVisible: false, isOverlayExpanded: false }));
  }, []);

  return (
    <TimerContext.Provider value={{
      ...state,
      startTimer,
      pauseTimer,
      resetTimer,
      addTime,
      resetToDefault,
      toggleOverlay,
      toggleOverlayExpanded,
      hideOverlay,
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer(): TimerContextValue {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer must be used within TimerProvider');
  return ctx;
}
