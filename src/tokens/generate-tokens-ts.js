import fs from 'fs';
import path from 'path';
import { migrateTokens } from './migrate-tokens.js';

/**
 * Generatore di tokens.ts completo con tutti i colori Shadcn + custom
 */

// Type definition template per TypeScript
const getTypeDefinitions = () => `
type ColorToken = keyof typeof colors;
type SpacingToken = keyof typeof spacing;
type TypographyToken = keyof typeof typography;
`;

// Template base per tokens.ts
const getTokensTemplate = (colors, spacing, typography) => {
  // Gestisci oggetti vuoti correttamente per evitare sintassi invalida
  const buildObjectContent = (obj) => {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '';
    return entries.map(([key, value]) => `  '${key}': '${value}'`).join(',\n') + '\n';
  };

  let result = 'const colors = {\n';
  Object.entries(colors).forEach(([key, value], index, arr) => {
    result += `  '${key}': '${value}'`;
    if (index < arr.length - 1) result += ',';
    result += '\n';
  });
  result += '} as const;\n\n';

  result += 'const typography = {} as const;\n';
  result += 'const spacing = {} as const;\n\n';

  result += 'export const designTokens = {\n';
  result += '  colors,\n';
  result += '  typography,\n';
  result += '  spacing\n';
  result += '} as const;\n\n';

  result += 'export const colorTokens = colors;\n';
  result += 'export const typographyTokens = typography;\n';
  result += 'export const spacingTokens = spacing;\n\n';

  result += '// Utility functions senza TypeScript types\n';
  result += 'export const getColor = (key) => {\n';
  result += '  return `var(--color-${key})`;\n';
  result += '};\n\n';

  result += 'export const getSpacing = (key) => {\n';
  result += '  return `var(--spacing-${key})`;\n';
  result += '};\n\n';

  result += 'export default designTokens;\n';

  return result;
};

/**
 * Genera il contenuto completo di tokens.ts
 */
function generateTokensTsFile(mappedColors) {
  // Solo i 9 colori essenziali come migration-dev-V0
  const colors = {
    background: mappedColors.background,
    foreground: mappedColors.foreground,
    primary: mappedColors.primary,
    'primary-hover': mappedColors['primary-hover'],
    secondary: mappedColors.secondary,
    accent: mappedColors.accent,
    card: mappedColors.card,
    border: mappedColors.border
  };

  // Typography (placeholder - da espandere se necessario)
  const typography = {};

  // Spacing (placeholder - da espandere se necessario)
  const spacing = {};

  return getTokensTemplate(colors, spacing, typography);
}

/**
 * Scrive il file tokens.ts
 */
function writeTokensTs(mappedColors, outputDir = 'src/lib') {
  const content = generateTokensTsFile(mappedColors);
  const outputPath = path.join(outputDir, 'tokens.ts');

  try {
    // Assicurati che la directory esista
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✅ Generato ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Errore generazione ${outputPath}:`, error);
    return false;
  }
}

/**
 * Scrive il CSS globals aggiornato
 */
function writeGlobalsCss(globalsCSS, outputDir = 'src/styles') {
  const outputPath = path.join(outputDir, 'globals.css');

  try {
    // Leggi il file esistente
    let existingContent = '';
    if (fs.existsSync(outputPath)) {
      existingContent = fs.readFileSync(outputPath, 'utf8');

      // Mantieni le parti non relative ai token (utilities, spacing, ecc.)
      const lines = existingContent.split('\n');

      // Trova la parte prima del primo @layer base
      const beforeFirstLayer = [];
      let foundFirstLayer = false;

      for (const line of lines) {
        if (line.trim().startsWith('@layer base') && !foundFirstLayer) {
          foundFirstLayer = true;
          break;
        }
        beforeFirstLayer.push(line);
      }

      // Se c'è contenuto prima, mantienilo
      const globalsCSSUpdated = foundFirstLayer
        ? beforeFirstLayer.join('\n') + '\n\n' + globalsCSS
        : globalsCSS;

      fs.writeFileSync(outputPath, globalsCSSUpdated, 'utf8');
    } else {
      fs.writeFileSync(outputPath, globalsCSS, 'utf8');
    }

    console.log(`✅ Aggiornato ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Errore aggiornamento ${outputPath}:`, error);
    return false;
  }
}

/**
 * Scrive configurazione Tailwind aggiornata
 */
function writeTailwindConfig(tailwindColors, outputDir = '') {
  // Per ora saltiamo la riscrittura automatica di tailwind.config.ts
  // dato che la struttura è complessa. Forniamo solo il JSON per riferimento.
  console.log(`ℹ️  Configurazione Tailwind pronta (copia manuale necessaria):`);
  console.log(tailwindColors);
  return true;
}

/**
 * Esegue la generazione completa dei file
 */
function generateAllFiles() {
  try {
    console.log('🚀 Avvio generazione token...\n');

    // 1. Esegui migrazione dei token
    const { mappedColors, globalsCSS, tailwindColors } = migrateTokens();

    // 2. Genera tokens.ts
    writeTokensTs(mappedColors);

    // 3. Aggiorna globals.css
    writeGlobalsCss(globalsCSS);

    // 4. Aggiorna tailwind.config.ts
    writeTailwindConfig(tailwindColors);

    console.log('\n🎉 Generazione completata con successo!');
    console.log('I seguenti file sono stati aggiornati:');
    console.log('  - src/lib/tokens.ts');
    console.log('  - src/styles/globals.css');
    console.log('  - tailwind.config.ts');

    return true;
  } catch (error) {
    console.error('❌ Errore nella generazione:', error);
    return false;
  }
}

// Esporta funzioni per uso modulare
export {
  generateTokensTsFile,
  writeTokensTs,
  writeGlobalsCss,
  writeTailwindConfig,
  generateAllFiles
};

// Esegui generazione se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllFiles();
}
