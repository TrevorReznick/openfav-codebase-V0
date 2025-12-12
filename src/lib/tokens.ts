const colors = {
  'primary': '262 83% 58%',
  'primary-foreground': '0 0% 100%',
  'primary-hover': '263 70% 50%',
  'secondary': '217 33% 17%',
  'secondary-foreground': '0 0% 100%',
  'background': '222 47% 11%',
  'foreground': '0 0% 100%',
  'muted': '217 33% 17%',
  'muted-foreground': '163 78% 77%',
  'border': '0 0% 100% / 0.1',
  'input': '217 33% 17%',
  'ring': '262 83% 58%',
  'destructive': '0 84% 60%',
  'destructive-foreground': '210 40% 98%',
  'accent': '271 91% 65%',
  'accent-foreground': '0 0% 100%',
  'card': '217 33% 17% / 0.3',
  'card-foreground': '0 0% 100%',
  'popover': '217 33% 17%',
  'popover-foreground': '0 0% 100%',
  'DEFAULT': '262 83% 58%',
  'hover': '263 70% 50%',
  'background-color': '222 47% 11%',
  'text-color': '0 0% 100%',
  'primary-color': '262 83% 58%',
  'secondary-color': '217 33% 17%',
  'accent-color': '271 91% 65%',
  'card-bg': '217 33% 17% / 0.3',
  'card-border': '0 0% 100% / 0.1'
} as const;

const typography = {
} as const;

const spacing = {
} as const;

type ColorToken = keyof typeof colors;
type SpacingToken = keyof typeof spacing;
type TypographyToken = keyof typeof typography;

export const designTokens = {
  colors,
  typography,
  spacing
} as const;

export const colorTokens = colors;
export const typographyTokens = typography;
export const spacingTokens = spacing;

// Utility functions con TypeScript types
export const getColor = (key: ColorToken): string => {
  return `var(--color-${key})`;
};

export const getSpacing = (key: SpacingToken): string => {
  return `var(--spacing-${key})`;
};

export default designTokens;
