// src/lib/tokens.ts
export const tokens = {
  colors: {
    background: '222 47% 11%',
    foreground: '0 0% 100%',
    primary: '262 83% 58%',
    'primary-hover': '263 70% 50%',
    secondary: '217 33% 17%',
    accent: '271 91% 65%',
    card: '217 33% 17% / 0.3',
    'card-border': '0 0% 100% / 0.1',
    border: '0 0% 100% / 0.1',
    input: '217 33% 17%',
    ring: '262 83% 58%',
    hover: '263 70% 50%',
    destructive: '0 84% 60%', // Aggiungi per shadcn
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },
  typography: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'Roboto Mono, monospace',
  },
  radius: '0.5rem', // Aggiungi border radius
} as const;

// Tipi utili
export type ColorKey = keyof typeof tokens.colors;
export type SpacingKey = keyof typeof tokens.spacing;

// Helper per componenti legacy (opzionale)
export const getColor = (key: ColorKey) => `hsl(var(--${key}))`;
export const getSpacing = (key: SpacingKey) => `var(--spacing-${key})`;

export default tokens;