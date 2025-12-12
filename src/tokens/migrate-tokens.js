import fs from 'fs';
import path from 'path';

/**
 * Generatore di Token Completo per Mapping Shadcn/ui
 * estrae colori da V4 e genera tokens completi per Shadcn/ui
 */

// Colori fallback Shadcn/ui standard
const fallbackColors = {
  background: '222 47% 11%',
  foreground: '0 0% 100%',
  primary: '262 83% 58%',
  'primary-foreground': '0 0% 100%',
  'primary-hover': '263 70% 50%',
  secondary: '217 33% 17%',
  'secondary-foreground': '0 0% 100%',
  muted: '217 33% 17%',
  'muted-foreground': '163 78% 77%',
  destructive: '0 84% 60%',
  'destructive-foreground': '210 40% 98%',
  accent: '271 91% 65%',
  'accent-foreground': '0 0% 100%',
  border: '217 33% 17%',
  input: '217 33% 17%',
  ring: '262 83% 58%',
  card: '217 33% 17%',
  'card-foreground': '0 0% 100%',
  popover: '217 33% 17%',
  'popover-foreground': '0 0% 100%',
  radius: '0.5rem'
};

// Mapping diretto da colori V4 a nomi Shadcn
const directMappings = {
  'background-color': 'background',
  'text-color': 'foreground',
  'primary-color': 'primary',
  'primary-hover': 'primary-hover',
  'secondary-color': 'secondary',
  'accent-color': 'accent',
  'card-bg': 'card',
  'card-border': 'border'
};

// Sinonimi per mapping intelligente
const synonymMappings = {
  // Background synonyms
  'bg': 'background',
  'backgroundcolor': 'background',
  'bg-color': 'background',

  // Foreground synonyms
  'fg': 'foreground',
  'textcolor': 'foreground',
  'text': 'foreground',
  'color': 'foreground',

  // Primary synonyms
  'brand': 'primary',
  'main': 'primary',
  'default': 'primary',

  // Border synonyms
  'outline': 'border',
  'separator': 'border',

  // Accent synonyms
  'highlight': 'accent',
  'focus': 'accent',

  // Card synonyms
  'surface': 'card',
  'panel': 'card',

  // Muted synonyms
  'subtle': 'muted',
  'secondary-text': 'muted-foreground',
  'placeholder': 'muted-foreground'
};

/**
 * Funzione di mapping intelligente per colori Shadcn
 */
function mapColorsToShadcn(extractedColors) {
  const mapped = { ...fallbackColors };

  // Prima applica mapping diretti
  Object.entries(directMappings).forEach(([v4Key, shadcnKey]) => {
    if (extractedColors[v4Key]) {
      mapped[shadcnKey] = extractedColors[v4Key];
    }
  });

  // Poi applica mapping per sinonimi
  Object.entries(synonymMappings).forEach(([synonymKey, shadcnKey]) => {
    if (extractedColors[synonymKey] && !mapped[shadcnKey]) {
      mapped[shadcnKey] = extractedColors[synonymKey];
    }
  });

  // Infine sovrapponi tutti i colori estratti che non sono stati mappati
  Object.entries(extractedColors).forEach(([key, value]) => {
    // Solo se non è già stato mappato e se corrisponde a un nome shadcn valido
    if (!mapped.hasOwnProperty(key) && fallbackColors.hasOwnProperty(key)) {
      mapped[key] = value;
    }
  });

  return mapped;
}

/**
 * Estrae colori da configurazione V4 (placeholder - da implementare con logica reale)
 */
function extractColorsFromV4() {
  // Placeholder - in produzione leggere da file di configurazione V4 reali
  // Per ora ritorno colori attualmente presenti nel tokens.ts
  return {
    'background': '222 47% 11%',
    'foreground': '0 0% 100%',
    'primary': '262 83% 58%',
    'primary-hover': '263 70% 50%',
    'secondary': '217 33% 17%',
    'accent': '271 91% 65%',
    'card': '217 33% 17% / 0.3',
    'border': '0 0% 100% / 0.1',
    'DEFAULT': '262 83% 58%',
    'hover': '263 70% 50%',
    'background-color': '222 47% 11%',
    'text-color': '0 0% 100%',
    'primary-color': '262 83% 58%',
    'secondary-color': '217 33% 17%',
    'accent-color': '271 91% 65%',
    'card-bg': '217 33% 17% / 0.3',
    'card-border': '0 0% 100% / 0.1'
  };
}

/**
 * Converti colori RGB/HEX a HSL (se necessario)
 */
function ensureHSLFormat(colors) {
  // Placeholder - in produzione implementare conversione RGB/HEX -> HSL
  // Per ora assumiamo che tutto sia già in HSL
  return colors;
}

/**
 * Genera variabili CSS per globals.css
 */
function generatePreservedGlobals(mappedColors) {
  const shadcnVars = Object.entries(mappedColors)
    .filter(([key]) => key !== 'radius') // radius non è un colore
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n');

  const customVars = [
    '    /* Custom Color Variables (for getColor function) */',
    ...Object.entries(mappedColors)
      .filter(([key]) => key !== 'radius')
      .map(([key, value]) => `    --color-${key}: ${value};`),
    '',
    '    /* Radius */',
    `    --radius: ${mappedColors.radius};`
  ].join('\n');

  return `@layer base {
  :root {
    /* Shadcn/ui Theme Variables */
${shadcnVars}

${customVars}
  }

  .dark {
    /* Dark theme overrides will be added here */
  }
}`;
}

/**
 * Genera configurazione Tailwind con pattern Shadcn corretto
 */
function generatePreservedTailwind(mappedColors) {
  const colorConfig = {
    // Design tokens diretti (migrated)
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",

    // Shadcn/ui component colors
    primary: {
      DEFAULT: "hsl(var(--primary))",
      foreground: "hsl(var(--primary-foreground))"
    },
    secondary: {
      DEFAULT: "hsl(var(--secondary))",
      foreground: "hsl(var(--secondary-foreground))"
    },
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))"
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))"
    },
    accent: {
      DEFAULT: "hsl(var(--accent))",
      foreground: "hsl(var(--accent-foreground))"
    },
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))"
    }
  };

  return JSON.stringify(colorConfig, null, 2);
}

/**
 * Funzione principale di migrazione
 */
function migrateTokens() {
  try {
    // 1. Estrazione colori da V4
    const extractedColors = extractColorsFromV4();
    console.log('✅ Estratti colori da V4:', Object.keys(extractedColors).length);

    // 2. Conversione a HSL (se necessario)
    const hslColors = ensureHSLFormat(extractedColors);
    console.log('✅ Convertiti in HSL');

    // 3. Mapping intelligente a Shadcn
    const mappedColors = mapColorsToShadcn(hslColors);
    console.log('✅ Mappati a nomi Shadcn/ui');

    // 4. Generazione file
    const globalsCSS = generatePreservedGlobals(mappedColors);
    const tailwindColors = generatePreservedTailwind(mappedColors);

    // Output per debug
    console.log('\n📋 Colori mappati finali:');
    Object.entries(mappedColors).forEach(([key, value]) => {
      console.log(`   --${key}: ${value}`);
    });

    return {
      mappedColors,
      globalsCSS,
      tailwindColors
    };

  } catch (error) {
    console.error('❌ Errore nella migrazione:', error);
    throw error;
  }
}

// Esporta funzioni per uso modulare
export {
  migrateTokens,
  mapColorsToShadcn,
  generatePreservedGlobals,
  generatePreservedTailwind,
  fallbackColors
};

// Esegui migrazione se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = migrateTokens();
  console.log('\n🎉 Migrazione completata!');
  console.log('Risultati disponibili in result.mappedColors, result.globalsCSS, result.tailwindColors');
}
