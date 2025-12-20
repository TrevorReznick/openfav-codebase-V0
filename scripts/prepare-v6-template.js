#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';

console.log(chalk.blue('🎨 Preparing V6 as Template...\n'));

// 1. Aggiungi commenti @inject a tokens.ts
const tokensPath = 'src/lib/tokens.ts';
const tokensContent = readFileSync(tokensPath, 'utf-8');

const enhancedTokens = tokensContent
  .replace(
    /const tokens = \{([\s\S]*?)\} as const;/,
    `const tokens = {\n  // @inject-source: all-tokens\n$1\n} as const;`
  )
  .replace(
    /export const tokens = \{([\s\S]*?)\} as const;/,
    `export const tokens = {\n  // @inject-source: all-tokens\n$1\n} as const;`
  );

writeFileSync(tokensPath, enhancedTokens);
console.log(chalk.green('✅ Enhanced tokens.ts with @inject comments'));

// 2. Aggiungi commenti @inject a globals.css
const globalsPath = 'src/styles/globals.css';
const globalsContent = readFileSync(globalsPath, 'utf-8');

const enhancedGlobals = globalsContent
  .replace(
    /:root \{([\s\S]*?)\}/,
    `:root {\n  /* @inject-source: all-tokens */\n$1\n}`
  );

writeFileSync(globalsPath, enhancedGlobals);
console.log(chalk.green('✅ Enhanced globals.css with @inject comments'));

console.log(chalk.blue('\n🎉 V6 is now ready for injection!'));
console.log(chalk.gray('Run: npm run migrate:inject-all -- --from V3'));
