// tailwind.config.ts
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
      // Spacing: usa i TUOI token
      spacing: tokens.spacing,
      
      // Font family: usa i TUOI token
      fontFamily: {
        sans: tokens.typography.sans.split(','),
        mono: tokens.typography.mono.split(','),
      },
      
      // Colors: usa i TUOI token (unificato)
      colors: {
        // Tutti i colori da tokens.ts
        ...Object.fromEntries(
          Object.entries(tokens.colors).map(([key, value]) => [
            key.replace('-', ''), // Converte 'primary-hover' -> 'primaryHover'
            `hsl(var(--${key}))`
          ])
        ),
        
        // shadcn/ui integration (opzionale)
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