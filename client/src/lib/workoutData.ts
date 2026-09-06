// =============================================================
// WORKOUT DATA — Cronograma de Treino Completo
// Design: Midnight Glassmorphism / Premium Dark
// =============================================================

export type MuscleGroup =
  | 'chest'
  | 'triceps'
  | 'back'
  | 'biceps'
  | 'shoulder'
  | 'legs'
  | 'calves'
  | 'fullbody';

export interface ExerciseVariant {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface Exercise {
  id: string;
  groupLabel: string;
  muscleGroup: MuscleGroup;
  primary: ExerciseVariant;
  variation: ExerciseVariant;
}

export interface WorkoutDay {
  id: string;
  dayName: string;
  dayAbbr: string;
  label: string;
  duration: string;
  muscleGroups: MuscleGroup[];
  exercises: Exercise[];
}

export const MUSCLE_COLORS: Record<MuscleGroup, string> = {
  chest: '#ef4444',
  triceps: '#a855f7',
  back: '#3b82f6',
  biceps: '#22c55e',
  shoulder: '#eab308',
  legs: '#f97316',
  calves: '#06b6d4',
  fullbody: '#ec4899',
};

export const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  chest: 'Peito',
  triceps: 'Tríceps',
  back: 'Costas',
  biceps: 'Bíceps',
  shoulder: 'Ombro',
  legs: 'Pernas',
  calves: 'Panturrilha',
  fullbody: 'Full Body',
};

export const MUSCLE_CSS: Record<MuscleGroup, string> = {
  chest: 'muscle-chest',
  triceps: 'muscle-triceps',
  back: 'muscle-back',
  biceps: 'muscle-biceps',
  shoulder: 'muscle-shoulder',
  legs: 'muscle-legs',
  calves: 'muscle-calves',
  fullbody: 'muscle-fullbody',
};

export const MOTIVATIONAL_PHRASES = [
  'Cada série te aproxima do seu melhor.',
  'O desconforto de hoje é a força de amanhã.',
  'Consistência supera intensidade.',
  'Seu único competidor é você de ontem.',
  'Não pare quando estiver cansado. Pare quando terminar.',
  'A dor é temporária. O orgulho é eterno.',
  'Treino duro, resultado certo.',
  'Foco, força e determinação.',
  'Cada rep conta. Cada série importa.',
  'Você é mais forte do que pensa.',
  'O corpo conquista o que a mente acredita.',
  'Levante mais pesado que suas desculpas.',
];

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: 'segunda',
    dayName: 'Segunda',
    dayAbbr: 'SEG',
    label: 'Peito + Tríceps',
    duration: '55–65 min',
    muscleGroups: ['chest', 'triceps'],
    exercises: [
      {
        id: 'seg-1',
        groupLabel: 'Peitoral Base',
        muscleGroup: 'chest',
        primary: { name: 'Supino Reto', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Flexão de Braço', sets: 4, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'seg-2',
        groupLabel: 'Peitoral Superior',
        muscleGroup: 'chest',
        primary: { name: 'Supino Inclinado 45°', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Flexão com Pés Elevados', sets: 4, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'seg-3',
        groupLabel: 'Peitoral Maior',
        muscleGroup: 'chest',
        primary: { name: 'Crucifixo', sets: 3, reps: '10–15', restSeconds: 60 },
        variation: { name: 'Flexão Arqueiro', sets: 3, reps: '10–12', restSeconds: 60 },
      },
      {
        id: 'seg-4',
        groupLabel: 'Tríceps Base',
        muscleGroup: 'triceps',
        primary: { name: 'Tríceps Banco', sets: 3, reps: '10–15', restSeconds: 60 },
        variation: { name: 'Flexão com Mãos Fechadas', sets: 3, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'seg-5',
        groupLabel: 'Tríceps Alongado',
        muscleGroup: 'triceps',
        primary: { name: 'Tríceps Testa', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Extensão Acima da Cabeça', sets: 3, reps: '10–12', restSeconds: 60 },
      },
    ],
  },
  {
    id: 'terca',
    dayName: 'Terça',
    dayAbbr: 'TER',
    label: 'Costas + Bíceps',
    duration: '55–65 min',
    muscleGroups: ['back', 'biceps'],
    exercises: [
      {
        id: 'ter-1',
        groupLabel: 'Costas Base',
        muscleGroup: 'back',
        primary: { name: 'Remada Curvada', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Remada Invertida', sets: 4, reps: '8–12', restSeconds: 60 },
      },
      {
        id: 'ter-2',
        groupLabel: 'Costas Controle',
        muscleGroup: 'back',
        primary: { name: 'Remada Unilateral', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Remada Invertida Unilateral', sets: 3, reps: '8–12', restSeconds: 60 },
      },
      {
        id: 'ter-3',
        groupLabel: 'Costas Largura',
        muscleGroup: 'back',
        primary: { name: 'Pullover com Halter', sets: 3, reps: '10–12', restSeconds: 60 },
        variation: { name: 'Pulldown com Toalha', sets: 3, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'ter-4',
        groupLabel: 'Bíceps Base',
        muscleGroup: 'biceps',
        primary: { name: 'Rosca Direta com Barra', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Chin-up Pegada Supinada', sets: 4, reps: '6–10', restSeconds: 90 },
      },
      {
        id: 'ter-5',
        groupLabel: 'Bíceps Pico',
        muscleGroup: 'biceps',
        primary: { name: 'Rosca Inclinada com Halteres', sets: 3, reps: '10–12', restSeconds: 60 },
        variation: { name: 'Chin-up Pegada Fechada', sets: 4, reps: '6–10', restSeconds: 90 },
      },
      {
        id: 'ter-6',
        groupLabel: 'Braquial',
        muscleGroup: 'biceps',
        primary: { name: 'Rosca Martelo', sets: 3, reps: '10–12', restSeconds: 60 },
        variation: { name: 'Chin-up Pegada Neutra', sets: 4, reps: '6–10', restSeconds: 90 },
      },
    ],
  },
  {
    id: 'quarta',
    dayName: 'Quarta',
    dayAbbr: 'QUA',
    label: 'Pernas',
    duration: '50–60 min',
    muscleGroups: ['legs', 'calves'],
    exercises: [
      {
        id: 'qua-1',
        groupLabel: 'Quadríceps',
        muscleGroup: 'legs',
        primary: { name: 'Agachamento Búlgaro', sets: 3, reps: '8–10', restSeconds: 60 },
        variation: { name: 'Pistol Squat', sets: 4, reps: '4–8', restSeconds: 90 },
      },
      {
        id: 'qua-2',
        groupLabel: 'Posterior de Coxa',
        muscleGroup: 'legs',
        primary: { name: 'Terra Romeno', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Nordic Curl', sets: 3, reps: '6–10', restSeconds: 90 },
      },
      {
        id: 'qua-3',
        groupLabel: 'Unilateral',
        muscleGroup: 'legs',
        primary: { name: 'Afundo com Halteres', sets: 3, reps: '10–12', restSeconds: 60 },
        variation: { name: 'Afundo Andando', sets: 3, reps: '10–12', restSeconds: 60 },
      },
      {
        id: 'qua-4',
        groupLabel: 'Panturrilha',
        muscleGroup: 'calves',
        primary: { name: 'Panturrilha em Pé com Peso', sets: 4, reps: '12–20', restSeconds: 60 },
        variation: { name: 'Panturrilha Unilateral', sets: 3, reps: '12–20', restSeconds: 60 },
      },
    ],
  },
  {
    id: 'quinta',
    dayName: 'Quinta',
    dayAbbr: 'QUI',
    label: 'Ombro',
    duration: '45–55 min',
    muscleGroups: ['shoulder'],
    exercises: [
      {
        id: 'qui-1',
        groupLabel: 'Deltoide Anterior',
        muscleGroup: 'shoulder',
        primary: { name: 'Desenvolvimento', sets: 4, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Pike Push-up', sets: 4, reps: '8–12', restSeconds: 60 },
      },
      {
        id: 'qui-2',
        groupLabel: 'Deltoide Lateral',
        muscleGroup: 'shoulder',
        primary: { name: 'Elevação Lateral com Halteres', sets: 3, reps: '10–15', restSeconds: 60 },
        variation: { name: 'Elevação Lateral Inclinada', sets: 3, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'qui-3',
        groupLabel: 'Deltoide Posterior',
        muscleGroup: 'shoulder',
        primary: { name: 'Crucifixo Inverso com Halteres', sets: 3, reps: '10–15', restSeconds: 60 },
        variation: { name: 'Reverse Plank Raise', sets: 3, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'qui-4',
        groupLabel: 'Trapézio Superior',
        muscleGroup: 'shoulder',
        primary: { name: 'Encolhimento com Halteres', sets: 3, reps: '10–15', restSeconds: 60 },
        variation: { name: 'Encolhimento Isométrico', sets: 3, reps: '20–30s', restSeconds: 60 },
      },
    ],
  },
  {
    id: 'sexta',
    dayName: 'Sexta',
    dayAbbr: 'SEX',
    label: 'Full Body',
    duration: '45–60 min',
    muscleGroups: ['chest', 'triceps', 'back', 'biceps', 'shoulder', 'legs', 'calves'],
    exercises: [
      {
        id: 'sex-1',
        groupLabel: 'Peito',
        muscleGroup: 'chest',
        primary: { name: 'Supino Reto', sets: 3, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Flexão de Braço', sets: 3, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'sex-2',
        groupLabel: 'Tríceps',
        muscleGroup: 'triceps',
        primary: { name: 'Tríceps Testa', sets: 3, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Flexão com Mãos Fechadas', sets: 3, reps: '10–15', restSeconds: 60 },
      },
      {
        id: 'sex-3',
        groupLabel: 'Costas',
        muscleGroup: 'back',
        primary: { name: 'Remada Curvada', sets: 3, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Remada Invertida', sets: 3, reps: '8–12', restSeconds: 60 },
      },
      {
        id: 'sex-4',
        groupLabel: 'Bíceps',
        muscleGroup: 'biceps',
        primary: { name: 'Rosca Direta com Barra', sets: 3, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Remada Invertida Pegada Supinada', sets: 3, reps: '8–12', restSeconds: 60 },
      },
      {
        id: 'sex-5',
        groupLabel: 'Ombro',
        muscleGroup: 'shoulder',
        primary: { name: 'Desenvolvimento', sets: 3, reps: '8–12', restSeconds: 90 },
        variation: { name: 'Pike Push-up', sets: 3, reps: '8–12', restSeconds: 60 },
      },
      {
        id: 'sex-6',
        groupLabel: 'Pernas',
        muscleGroup: 'legs',
        primary: { name: 'Agachamento Búlgaro', sets: 3, reps: '8–10', restSeconds: 90 },
        variation: { name: 'Pistol Squat', sets: 3, reps: '4–8', restSeconds: 90 },
      },
      {
        id: 'sex-7',
        groupLabel: 'Panturrilha',
        muscleGroup: 'calves',
        primary: { name: 'Panturrilha em Pé com Peso', sets: 3, reps: '12–20', restSeconds: 60 },
        variation: { name: 'Panturrilha Unilateral', sets: 3, reps: '12–20', restSeconds: 60 },
      },
    ],
  },
];
