import React from 'react';
import { getColor, getSpacing, type ColorKey, type SpacingKey } from '@/lib/tokens';

const TokenTest = () => {
  // Array tipizzato con le chiavi ESATTE dei token
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

  // Array tipizzato degli spacing
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