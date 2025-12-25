# Release v0.2.0

# Changelog dopo v0.2.0

- OPM-7 feat(template): aggiunto script per preparare il template V6 con commenti @inject (661f678) [default2368]

## 🚨 Breaking Changes

- **Design Tokens Refactor**: Rinominate le chiavi colori (`primary-color` → `primary`, `background-color` → `background`)
- **CSS Variables**: Rimossi i prefissi `--color-` dalle variabili CSS (usa direttamente `--primary`)
- **Spacing System**: Spacing ora popolato con valori reali (era precedentemente vuoto)
- **API Changes**: `getColor()` e `getSpacing()` ora richiedono chiavi tipizzate

## 🚀 New Features

### Dynamic Component Loading
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

## 🧪 Testing

- Added comprehensive test coverage
- Implemented component testing utilities
- Enhanced testing infrastructure

## 📚 Documentation

- Added documentation for dynamic component loading
- Updated component usage guides
- Improved code documentation

---

**Full Changelog**: [View all commits](https://github.com/TrevorReznick/openfav-codebase-V0/compare/0.0.3...v0.2.0)

---

To update your project to this version:

```bash
npm install openfav-init@0.2.0
```

Or if using yarn:

```bash
yarn add openfav-init@0.2.0
