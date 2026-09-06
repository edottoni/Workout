# Ideias de Design — Cronograma de Treino

<response>
<idea>
**Design Movement:** Dark Athletic / Neon Brutalism
**Core Principles:**
- Contraste extremo: fundo quase preto com acentos neon vibrantes (verde-limão, ciano)
- Tipografia pesada e agressiva — fontes condensadas para títulos, monospace para dados numéricos
- Espaçamento generoso com bordas duras e sombras coloridas (box-shadow neon)
- Hierarquia visual clara: o timer domina visualmente quando ativo

**Color Philosophy:**
- Background: #0a0a0f (quase preto com toque azulado)
- Accent primário: #b2ff59 (verde-limão neon) para ações e progresso
- Accent secundário: #00e5ff (ciano) para timers e destaque
- Cards: rgba(255,255,255,0.04) com borda 1px sólida neon

**Layout Paradigm:**
- Grid assimétrico: coluna lateral estreita com dias da semana, área principal com exercícios
- Modal de exercícios ocupa 80% da tela com scroll interno
- Timer overlay flutua no canto inferior direito com design circular dramático

**Signature Elements:**
- Círculo de progresso do timer com traço neon pulsante
- Cards de exercício com borda esquerda colorida por grupo muscular
- Checkboxes customizados com animação de "check" estilo militar

**Interaction Philosophy:**
- Feedback imediato e satisfatório — cada ação tem resposta visual/sonora
- Animações rápidas (150-200ms) — sem demora, sensação de resposta instantânea
- Hover states com brilho neon sutil

**Animation:**
- Entrada de cards: slide-in da esquerda com fade
- Exercício concluído: colapso com escala + fade para cinza
- Timer: pulso suave no anel quando ativo, flash neon ao completar
- Modal: scale de 0.95 para 1.0 com fade

**Typography System:**
- Títulos: "Barlow Condensed" Bold 700 — agressivo e atlético
- Corpo: "DM Mono" Regular — dados numéricos legíveis
- UI: "Barlow" Medium — interface limpa
</idea>
<probability>0.07</probability>
</response>

<response>
<idea>
**Design Movement:** Midnight Glassmorphism / Premium Dark
**Core Principles:**
- Profundidade através de camadas: fundo gradiente escuro + cards em vidro fosco
- Hierarquia cromática por grupo muscular (vermelho=peito, roxo=tríceps, azul=costas, etc.)
- Timer como elemento central e dramático — relógio SVG animado dominante
- Microinterações polidas que recompensam o usuário

**Color Philosophy:**
- Background: gradiente diagonal de #0f0c29 → #302b63 → #24243e
- Cards: backdrop-blur(20px) + rgba(255,255,255,0.07) + borda rgba(255,255,255,0.15)
- Accent: #7c3aed (violeta) como cor primária de ação
- Por grupo muscular: vermelho #ef4444, roxo #a855f7, azul #3b82f6, verde #22c55e, amarelo #eab308, marrom #92400e

**Layout Paradigm:**
- Layout centralizado com max-width 800px
- Cards de dias em grid 3x2 com glassmorphism
- Painel lateral deslizante (não modal) para exercícios
- Timer overlay fixo no canto inferior direito, expansível

**Signature Elements:**
- Relógio circular SVG com gradiente de cor e animação de stroke-dashoffset
- Badges coloridos por grupo muscular nos cards de exercício
- Barra de progresso horizontal abaixo de cada exercício

**Interaction Philosophy:**
- Transições fluidas e orgânicas (300-400ms ease-out)
- Estado de "foco" que escurece elementos não ativos
- Celebração visual ao completar treino (confetti ou pulse)

**Animation:**
- Cards de dias: hover com scale(1.05) e glow sutil
- Exercício completo: fadeOut + shrink com timing 600ms
- Timer: stroke animation contínua, pulse ao finalizar
- Modal/painel: slide-in da direita com spring animation

**Typography System:**
- Títulos: "Syne" ExtraBold 800 — futurista e distinto
- Dados: "JetBrains Mono" — números do timer em monospace
- Corpo: "Inter" 400/500 — legível para instruções
</idea>
<probability>0.09</probability>
</response>

<response>
<idea>
**Design Movement:** Industrial Fitness / Raw Material
**Core Principles:**
- Estética de academia: texturas metálicas, tipografia robusta, sem ornamentos desnecessários
- Fundo escuro com textura sutil de ruído/grain
- Cores funcionais: cada ação tem cor semântica clara
- Densidade de informação controlada — tudo visível, nada escondido

**Color Philosophy:**
- Background: #111827 (gray-900) com grain texture overlay
- Surface: #1f2937 (gray-800) para cards
- Accent: #f97316 (laranja) — energia, ação, calor muscular
- Success: #10b981 (verde esmeralda) para séries concluídas
- Timer: #f59e0b (âmbar) para urgência

**Layout Paradigm:**
- Layout de dashboard: header fixo + área de conteúdo scrollável
- Dias como tabs horizontais no topo
- Lista de exercícios em coluna única com expansão inline (accordion)
- Timer como widget fixo no canto, sempre visível

**Signature Elements:**
- Barras de progresso estilo "loading bar" para séries
- Ícones de grupo muscular em estilo pictograma
- Numeração de séries em estilo "contador industrial"

**Interaction Philosophy:**
- Direto e funcional — sem floreios desnecessários
- Feedback tátil simulado (micro-vibração via CSS)
- Progresso sempre visível e quantificado

**Animation:**
- Transições utilitárias: 200ms linear
- Exercício completo: strike-through + fade
- Timer: barra linear de progresso + countdown numérico grande

**Typography System:**
- Títulos: "Oswald" Bold — industrial e forte
- Números: "Roboto Mono" — precisão técnica
- Corpo: "Roboto" Regular — universal e legível
</idea>
<probability>0.06</probability>
</response>
