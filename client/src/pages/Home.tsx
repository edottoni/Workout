// =============================================================
// HOME PAGE — Main workout scheduler screen
// Design: Midnight Glassmorphism / Premium Dark
// Features: motivational header, day cards grid, workout modal
// =============================================================

import React, { useState, useEffect, useCallback } from 'react';
import { WORKOUT_DAYS, MOTIVATIONAL_PHRASES, WorkoutDay } from '@/lib/workoutData';
import { DayCard } from '@/components/DayCard';
import { WorkoutModal } from '@/components/WorkoutModal';
import { TimerOverlay } from '@/components/TimerOverlay';
import { Dumbbell, Zap } from 'lucide-react';

function getRandomPhrase(): string {
  return MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [phrase, setPhrase] = useState(() => getRandomPhrase());
  const [phraseKey, setPhraseKey] = useState(0);

  // Rotate motivational phrase every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(getRandomPhrase());
      setPhraseKey(k => k + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleDayClick = useCallback((day: WorkoutDay) => {
    setSelectedDay(day);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedDay(null);
  }, []);

  // Get current day of week to highlight (Sunday=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6)
  const today = new Date().getDay();
  const dayMap: Record<string, number> = {
    segunda: 1,
    terca: 2,
    quarta: 3,
    quinta: 4,
    sexta: 5,
  };

  return (
    <div className="min-h-screen relative">
      {/* Background noise texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 container py-8 pb-24">
        {/* ---- HEADER ---- */}
        <header className="mb-10">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                boxShadow: '0 4px 20px rgba(168,85,247,0.4)',
              }}
            >
              <Dumbbell size={20} className="text-white" />
            </div>
            <div>
              <h1
                className="text-white font-extrabold text-xl leading-none"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Cronograma
              </h1>
              <p className="text-white/40 text-xs font-medium tracking-wider uppercase">
                de Treino
              </p>
            </div>
          </div>

          {/* Motivational phrase */}
          <div
            className="glass rounded-2xl p-5"
            style={{ borderLeft: '3px solid #a855f7' }}
          >
            <div className="flex items-start gap-3">
              <Zap
                size={18}
                className="flex-shrink-0 mt-0.5"
                style={{ color: '#a855f7' }}
              />
              <p
                key={phraseKey}
                className="text-white/90 text-base font-medium leading-relaxed animate-fade-slide-in"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {phrase}
              </p>
            </div>
          </div>
        </header>

        {/* ---- SECTION TITLE ---- */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className="text-white font-bold text-lg"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Sua Semana
            </h2>
            <p className="text-white/40 text-sm mt-0.5">
              Selecione o dia para iniciar o treino
            </p>
          </div>
          <div className="glass rounded-xl px-3 py-1.5">
            <span className="text-white/50 text-xs font-mono">
              {WORKOUT_DAYS.length} dias
            </span>
          </div>
        </div>

        {/* ---- DAY CARDS GRID ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          {WORKOUT_DAYS.map((day, index) => (
            <div
              key={day.id}
              className="relative"
            >
              {/* "Hoje" badge */}
              {dayMap[day.id] === today && (
                <div
                  className="absolute -top-2 -right-2 z-10 text-xs font-bold px-2 py-0.5 rounded-full animate-pop-in"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(168,85,247,0.5)',
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  Hoje
                </div>
              )}
              <DayCard day={day} index={index} onClick={handleDayClick} />
            </div>
          ))}
        </div>

        {/* ---- WEEKLY SUMMARY ---- */}
        <div className="mt-8 glass rounded-2xl p-5">
          <h3
            className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Resumo da Semana
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white font-bold text-2xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>5</p>
              <p className="text-white/40 text-xs mt-0.5">Dias de treino</p>
            </div>
            <div>
              <p className="text-white font-bold text-2xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>26</p>
              <p className="text-white/40 text-xs mt-0.5">Exercícios</p>
            </div>
            <div>
              <p className="text-white font-bold text-2xl" style={{ fontFamily: 'JetBrains Mono, monospace' }}>5h</p>
              <p className="text-white/40 text-xs mt-0.5">Tempo total</p>
            </div>
          </div>
        </div>

        {/* ---- FOOTER ---- */}
        <footer className="mt-8 text-center">
          <p className="text-white/20 text-xs font-mono">
            Cronograma de Treino · Foco, Força e Determinação
          </p>
        </footer>
      </div>

      {/* ---- WORKOUT MODAL ---- */}
      {selectedDay && (
        <WorkoutModal day={selectedDay} onClose={handleModalClose} />
      )}

      {/* ---- FLOATING TIMER OVERLAY ---- */}
      <TimerOverlay />
    </div>
  );
}
