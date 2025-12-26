# Release v0.3.0

# Changelog dopo v0.3.0

- OPM-7 feat(template): aggiunto script per preparare il template V6 con commenti @inject (661f678) [default2368]

## 🚨 Breaking Changes

- **Design Tokens Refactor**: Rinominate le chiavi colori (`primary-color` → `primary`, `background-color` → `background`)
- **CSS Variables**: Rimossi i prefissi `--color-` dalle variabili CSS (usa direttamente `--primary`)
- **Configuration System**: Migrazione a sistema di configurazione YAML-based con supporto multi-ambiente
- **Spacing System**: Spacing ora popolato con valori reali (era precedentemente vuoto)
- **API Changes**: `getColor()` e `getSpacing()` ora richiedono chiavi tipizzate

## 🚀 New Features

### Dynamic Component Loading
- **Enhanced Auto Component Loader**: Sistema avanzato di caricamento componenti con supporto per:
  - Multiple base paths (auth, components, common, dashboard, test)
  - Automatic path resolution con alias support (@/, ~/)
  - Fallback handling con componenti personalizzati
  - Debug mode per troubleshooting
- Added dynamic component loading hook with comprehensive documentation
- Implemented component checker script with fallback handling
- Enhanced auto component loader functionality

### Theme System
- Added theme toggle component for better user experience
- Improved design tokens and CSS variable definitions
- Enhanced theme management across the application

### Database Operations
- Implemented CRUD operations for lists, events, and sites
- Added Supabase client integration
- Enhanced database connectivity and operations

### Core Functionality
- **Advanced Configuration System**:
  - Configurazione YAML-based per site, metadata, i18n
  - Supporto multi-lingua con routing strategy configurabile
  - Analytics integration (Google Analytics, Plausible, GTM, Hotjar)
  - SEO optimization con meta tags dinamici

- **Enhanced Build System**:
  - Vite plugin per configurazione OpenFav runtime
  - Astro configuration con output server-side
  - Vercel adapter per deployment ottimizzato
  - JSON plugin per gestione file di configurazione

- **UI Component Library**:
  - Complete Radix UI component suite (25+ components)
  - shadcn/ui integration con design system unificato
- Added initial project setup with core functionality
- Improved component architecture and loading mechanisms

## 🛠️ Improvements

### Code Quality
- Refactored and cleaned up design tokens
- Improved CSS variable definitions
- Enhanced component structure and organization

### Maintenance
- Updated .gitignore to include all .DS_Store files
- Removed unnecessary .DS_Store files from repository
- General code cleanup and optimization

## 📦 Dependencies

This release includes updates to various dependencies including:
- Astro framework updates
- React and related libraries
- Tailwind CSS and styling libraries
- Supabase integration libraries
- Testing framework improvements
- **New Dependencies**:
  - Radix UI component suite (25+ components)
  - Framer Motion per animations
  - React Hook Form per form management
  - Recharts per data visualization
  - Sonner per toast notifications

## 🧪 Testing

- Added comprehensive test coverage
- Implemented component testing utilities
- Enhanced testing infrastructure
- **Test Coverage**:
  - Vitest con coverage reporting
  - React Testing Library per component testing
  - Jest DOM matchers per DOM assertions
  - User Event testing per interaction testing

## 📚 Documentation

- Added documentation for dynamic component loading
- Updated component usage guides
- Improved code documentation
- **New Documentation**:
  - Design Tokens migration guide
  - Dynamic Component System documentation
  - Configuration System guide
  - Component API reference
  - Build and deployment guides

## 🔧 Configuration
- **Environment Support**: Supporto per development, staging, production environments
- **Multi-site Support**: Configurazione multi-sito con template system

---

**Full Changelog**: [View all commits](https://github.com/TrevorReznick/openfav-codebase-V0/compare/0.0.3...v0.2.0)

---

To update your project to this version:

```bash
npm install openfav-init@0.3.0
```

Or if using yarn:

```bash
yarn add openfav-init@0.3.0
```
