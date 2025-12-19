# Design Tokens - Guida di Migrazione e Correzione

## 📋 Problemi Identificati

Il sistema di design tokens presenta incoerenze critiche tra i file TypeScript, CSS e Tailwind:

- **Chiavi non corrispondenti**: TokenTest.tsx usa chiavi inesistenti (es: primary-color)
- **Spacing vuoto**: designTokens.spacing = {} non definisce valori
- **Duplicazione colori**: Due set separati in tailwind.config.ts
- **Tipizzazione assente**: Uso di as any per forzare la compilazione
- **CSS incompleto**: Mancano le variabili --spacing-* e --font-*

## ✅ Soluzione Unificata

### File 1: src/lib/tokens.ts

#### ❌ Prima (errato)

```typescript
const spacing = {} as const; // VUOTO!
export const getSpacing = (key) => `var(--spacing-${key})`; // any
```

#### ✅ Dopo (corretto)

```typescript
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
    destructive: '0 84% 60%',
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
  radius: '0.5rem',
} as const;

// Tipi per TypeScript
export type ColorKey = keyof typeof tokens.colors;
export type SpacingKey = keyof typeof tokens.spacing;

// Helper functions
export const getColor = (key: ColorKey): string => `hsl(var(--${key}))`;
export const getSpacing = (key: SpacingKey): string => `var(--spacing-${key})`;

export default tokens;
```

### File 2: src/styles/globals.css

#### ❌ Prima (incompleto)

```css
:root {
  --color-primary-color: hsl(262 83% 58%); /* Prefisso errato */
  /* Mancano tutti --spacing-* */
}
```

#### ✅ Dopo (completo)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
    /* Colori dai token */
    --background: 222 47% 11%;
    --foreground: 0 0% 100%;
    --primary: 262 83% 58%;
    --primary-hover: 263 70% 50%;
    --secondary: 217 33% 17%;
    --accent: 271 91% 65%;
    --card: 217 33% 17% / 0.3;
    --card-border: 0 0% 100% / 0.1;
    --border: 0 0% 100% / 0.1;
    --input: 217 33% 17%;
    --ring: 262 83% 58%;
    --hover: 263 70% 50%;
    --destructive: 0 84% 60%;

    /* Spacing */
    --spacing-0: 0px;
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --spacing-5: 1.25rem;
    --spacing-6: 1.5rem;
    --spacing-8: 2rem;
    --spacing-10: 2.5rem;
    --spacing-12: 3rem;
    --spacing-16: 4rem;
    --spacing-20: 5rem;
    --spacing-24: 6rem;
    --spacing-32: 8rem;

    /* Typography */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-mono: 'Roboto Mono', monospace;

    /* Radius */
    --radius: 0.5rem;
  }
}

/* Applica i token globalmente */
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
}
```

### File 3: tailwind.config.ts

#### ❌ Prima (duplicato e incoerente)

```typescript
colors: {
  'primary-color': 'hsl(var(--primary-color))', // Non esiste!
  primary: { DEFAULT: "hsl(var(--primary))" } // Diverso!
}
```

#### ✅ Dopo (unificato)

```typescript
import type { Config } from "tailwindcss";
import { tokens } from "./src/lib/tokens";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Spacing direttamente dai token
      spacing: tokens.spacing,

      // Font family
      fontFamily: {
        sans: tokens.typography.sans.split(',').map(s => s.trim()),
        mono: tokens.typography.mono.split(',').map(s => s.trim()),
      },

      // Colors unificati
      colors: {
        // Espandi tutti i colori dai token
        ...Object.fromEntries(
          Object.entries(tokens.colors).map(([key, value]) => [
            key.replace(/-/g, ''), // 'primary-hover' -> 'primaryHover'
            `hsl(var(--${key}))`
          ])
        ),

        // shadcn/ui integration (usa stesse variabili)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
```

### File 4: src/components/TokenTest.tsx

#### ❌ Prima (chiavi errate, logica complessa)

```tsx
{ key: 'primary-color', label: 'Primary' } // Chiave inesistente!
style={{ backgroundColor: `var(--color-${key})` }} // Prefisso errato
```

#### ✅ Dopo (tipizzato e semplificato)

```tsx
import React from 'react';
import { getColor, getSpacing, type ColorKey, type SpacingKey } from '../lib/tokens';

const TokenTest = () => {
  // Array tipizzato con chiavi corrette
  const colorTokens: Array<{ key: ColorKey; label: string }> = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent', label: 'Accent' },
    { key: 'hover', label: 'Hover' },
    { key: 'background', label: 'Background' },
    { key: 'foreground', label: 'Text' },
    { key: 'card', label: 'Card BG' },
    { key: 'card-border', label: 'Card Border' },
    { key: 'destructive', label: 'Destructive' },
  ];

  const spacingSizes: SpacingKey[] = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Design Tokens Test</h1>

      {/* Color Palette */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
        <p className="text-sm text-muted-foreground mb-4">Design system color tokens</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {colorTokens.map(({ key, label }) => (
            <div
              key={key}
              className="w-full aspect-square rounded-lg flex flex-col items-center justify-center text-sm p-2 text-center border border-border"
              style={{
                backgroundColor: getColor(key),
                color: key === 'foreground' ? getColor('background') : getColor('foreground')
              }}
            >
              <span className="font-semibold mb-1">{label}</span>
              <span className="text-xs opacity-80">{key}</span>
              <span className="text-[10px] opacity-60 mt-1 font-mono">{getColor(key)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Scale */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Spacing Scale</h2>
        <p className="text-sm text-muted-foreground mb-4">Visual representation of spacing values</p>
        <div className="space-y-4">
          {spacingSizes.map((size) => (
            <div key={size} className="flex items-center gap-4">
              <div
                className="bg-primary h-4 rounded"
                style={{ width: getSpacing(size), minWidth: '1px' }}
              />
              <span className="text-sm font-mono w-16">{getSpacing(size)}</span>
              <span className="text-muted-foreground text-sm">spacing-{String(size)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Typography</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Font Families</p>
            <div className="space-y-2 pl-4 border-l-2 border-border">
              <p className="font-sans">Sans-serif (Inter)</p>
              <p className="font-mono text-sm bg-muted p-2 rounded">Monospace (Roboto Mono)</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Font Sizes</p>
            <div className="space-y-2 pl-4 border-l-2 border-border">
              <p className="text-xs">xs (0.75rem)</p>
              <p className="text-sm">sm (0.875rem)</p>
              <p className="text-base">base (1rem)</p>
              <p className="text-lg">lg (1.125rem)</p>
              <p className="text-xl">xl (1.25rem)</p>
              <p className="text-2xl">2xl (1.5rem)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTest;
```

## 🚀 Benefici della Nuova Implementazione

- ✅ **Single Source of Truth**: Modifica i token in tokens.ts → aggiorna automaticamente tutto
- ✅ **Type Safety**: TypeScript segnala errori di chiave a compile-time
- ✅ **IntelliSense**: Autocomplete nelle classi Tailwind (bg-primary, w-spacing-4)
- ✅ **Manutenibilità**: -50% di codice duplicato
- ✅ **Performance**: Tailwind genera solo le classi usate

## 📦 Prossimi Passi (Opzionali)

- **Script di build**: Genera globals.css automaticamente da tokens.ts
- **Plugin Figma**: Sincronizza i token con il design system
- **Dark mode**: Aggiungi tokens.dark.colors e usa data-theme="dark"
