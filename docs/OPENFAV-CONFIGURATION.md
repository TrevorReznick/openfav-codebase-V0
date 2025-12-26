
# OpenFav Configuration System

## 📋 Overview

Il sistema di configurazione OpenFav fornisce un approccio centralizzato e YAML-based per la gestione delle impostazioni dell'applicazione, supportando multi-sito, multi-lingua e ambienti diversi.

## 🏗️ Architecture

### File di Configurazione

Il sistema utilizza due file di configurazione principali:

1. **`src/config.yaml`** - Configurazione principale del sito
2. **`src/openfav-config.yaml`** - Configurazione specifica OpenFav

### Struttura della Configurazione

#### Site Configuration (`config.yaml`)

```yaml
site:
  name: Openfav
  site: "https://openfav-refactor.vercel.app"
  base: "/"
  trailingSlash: false
  googleSiteVerificationId: orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M

metadata:
  title:
    default: Openfav
    template: "%s — Openfav"
  description: "🚀 Openfav: Modern Web Development Suite..."
  robots:
    index: true
    follow: true
  openGraph:
    site_name: Openfav
    images:
      - url: "~/assets/images/default.png"
        width: 1200
        height: 628
    type: website
  twitter:
    handle: "@onwidget"
    site: "@onwidget"
    cardType: summary_large_image

i18n:
  language: en
  textDirection: ltr

apps:
  blog:
    isEnabled: true
    postsPerPage: 6
    post:
      isEnabled: true
      permalink: "/%slug%"
      robots:
        index: true
    list:
      isEnabled: true
      pathname: "blog"
      robots:
        index: true
    category:
      isEnabled: true
      pathname: "category"
      robots:
        index: true
    tag:
      isEnabled: true
      pathname: "tag"
      robots:
        index: false
    isRelatedPostsEnabled: true
    relatedPostsCount: 4

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"

ui:
  theme: "system" # "system" | "light" | "dark" | "light:only" | "dark:only"
```

#### OpenFav Configuration (`openfav-config.yaml`)

```yaml
site:
  name: "OpenFav Test Site"
  description: "A test site for OpenFav integration"
  base: "/"
  trailingSlash: false

metadata:
  title: "OpenFav Test Page"
  description: "This is a test page for OpenFav integration"
  image: "/images/og-image.jpg"
  lang: "en"
  author: "Test Author"
  keywords: ["test", "openfav", "astro"]
  twitterCard: "summary_large_image"

i18n:
  enable: true
  defaultLocale: "en"
  locales: ["en", "it"]
  routingStrategy: "prefix-other-locales"

ui:
  theme: "light"
  themeColor: "#3B82F6"
  backgroundColor: "#FFFFFF"
  accentColor: "#10B981"
  fontFamily: "Inter, sans-serif"

analytics:
  enable: false
  googleAnalyticsId: ""
  plausibleDomain: ""
  googleTagManagerId: ""
  hotjarId: ""
```

## 🔧 Configuration Features

### 1. Multi-Site Support

Il sistema supporta la configurazione multi-sito attraverso:

- **Site-specific configurations**: Ogni sito può avere la sua configurazione YAML
- **Template system**: Configurazioni riutilizzabili tra siti
- **Environment-specific settings**: Diverse configurazioni per dev/staging/prod

### 2. Internationalization (i18n)

Supporto completo per multi-lingua:

```yaml
i18n:
  enable: true
  defaultLocale: "en"
  locales: ["en", "it", "es", "fr"]
  routingStrategy: "prefix-other-locales" # "prefix" | "prefix-other-locales" | "subdomain"
```

**Routing Strategies:**
- `prefix`: `/en/page`, `/it/page`
- `prefix-other-locales`: `/page` (default), `/it/page`, `/es/page`
- `subdomain`: `en.example.com`, `it.example.com`

### 3. SEO Optimization

Configurazione SEO completa:

```yaml
metadata:
  title:
    default: "Site Name"
    template: "%s — Site Name"
  description: "Site description for SEO"
  robots:
    index: true
    follow: true
  openGraph:
    site_name: "Site Name"
    images:
      - url: "/images/og-image.jpg"
        width: 1200
        height: 628
    type: website
  twitter:
    handle: "@username"
    site: "@site"
    cardType: "summary_large_image"
```

### 4. Analytics Integration

Supporto per multiple analytics platforms:

```yaml
analytics:
  enable: true
  googleAnalyticsId: "G-XXXXXXXXXX"
  plausibleDomain: "yoursite.com"
  googleTagManagerId: "GTM-XXXXXXX"
  hotjarId: "1234567"
```

### 5. UI Configuration

Configurazione dell'interfaccia utente:

```yaml
ui:
  theme: "system" # "system" | "light" | "dark" | "light:only" | "dark:only"
  themeColor: "#3B82F6"
  backgroundColor: "#FFFFFF"
  accentColor: "#10B981"
  fontFamily: "Inter, sans-serif"
```

## 🚀 Runtime Configuration

### Vite Plugin Integration

La configurazione viene resa disponibile a runtime attraverso un plugin Vite personalizzato:

```javascript
// astro.config.mjs
import openfavConfigPlugin from './vite-plugin-openfav-config.js';

export default defineConfig({
  vite: {
    plugins: [
      configPlugin,
      openfavConfigPlugin(openfavConfig),
    ]
  }
});
```

### Accesso alla Configurazione

La configurazione è accessibile nei componenti:

```typescript
// Accesso alla configurazione in componenti React
const config = import.meta.env.OPENFAV_CONFIG;
const parsedConfig = JSON.parse(config);

// Utilizzo
const siteName = parsedConfig.site.name;
const theme = parsedConfig.ui.theme;
```

## 📝 Configuration Validation

### Schema Validation

Il sistema include validazione dello schema per garantire la coerenza della configurazione:

```typescript
interface OpenFavConfig {
  site: {
    name: string;
    description: string;
    base: string;
    trailingSlash: boolean;
  };
  metadata: {
    title: string;
    description: string;
    image?: string;
    lang: string;
    author?: string;
    keywords?: string[];
    twitterCard?: string;
  };
  i18n: {
    enable: boolean;
    defaultLocale: string;
    locales: string[];
    routingStrategy: string;
  };
  ui: {
    theme: string;
    themeColor?: string;
    backgroundColor?: string;
    accentColor?: string;
    fontFamily?: string;
  };
  analytics: {
    enable: boolean;
    googleAnalyticsId?: string;
    plausibleDomain?: string;
    googleTagManagerId?: string;
    hotjarId?: string;
  };
}
```

### Error Handling

Gestione robusta degli errori di configurazione:

```typescript
const loadConfig = (configPath) => {
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    return yaml.load(fileContents);
  } catch (error) {
    console.error('Error loading config file:', error);
    return {};
  }
};
```

## 🔍 Best Practices

### 1. Environment-Specific Configs

Crea file di configurazione per diversi ambienti:

```
src/
├── config.yaml          # Default configuration
├── config.dev.yaml      # Development overrides
├── config.staging.yaml # Staging overrides
└── config.prod.yaml     # Production overrides
```

### 2. Configuration Merging

Il sistema supporta il merging delle configurazioni:

```typescript
const mergeConfigs = (baseConfig, envConfig) => {
  return {
    ...baseConfig,
    ...envConfig,
    metadata: {
      ...baseConfig.metadata,
      ...envConfig.metadata
    },
    // ... altre proprietà annidate
  };
};
```

### 3. Type Safety

Utilizza TypeScript per la type safety:

```typescript
import type { OpenFavConfig } from './types/config';

const config: OpenFavConfig = {
  // ... configurazione tipizzata
};
```

### 4. Configuration Documentation

Documenta tutte le opzioni di configurazione:

```yaml
# Site Configuration
# Defines the basic site information and settings
site:
  name: string          # Site name for display and SEO
  site: string          # Site URL (without trailing slash)
  base: string          # Base path for routing
  trailingSlash: boolean # Whether to add trailing slashes to URLs
```

## 🛠️ Troubleshooting

### Common Issues

1. **Configuration Not Loading**
   - Verifica che i file YAML siano validi
   - Controlla i percorsi dei file di configurazione
   - Controlla i log di errore nel console

2. **Missing Configuration Values**
   - Verifica che tutte le proprietà richieste siano presenti
   - Controlla i tipi di dati delle proprietà
   - Usa valori di default dove appropriato

3. **Environment Variables Not Available**
   - Verifica che le variabili d'ambiente siano configurate
   - Controlla il file `.env` per le variabili locali
   - Verifica la configurazione del deployment

### Debug Mode

Abilita il debug mode per troubleshooting:

```typescript
const debug = process.env.NODE_ENV === 'development';
if (debug) {
  console.log('Loaded config:', config);
}
```

## 📚 API Reference

### Configuration Loading Functions

#### `loadConfig(configPath: string): object`

Carica un file di configurazione YAML.

**Parameters:**
- `configPath`: Percorso del file di configurazione

**Returns:**
- `object`: Configurazione caricata o oggetto vuoto in caso di errore

#### `mergeConfigs(baseConfig: object, envConfig: object): object`

Unisce due configurazioni.

**Parameters:**
- `baseConfig`: Configurazione base
- `envConfig`: Configurazione environment-specific

**Returns:**
- `object`: Configurazione unita

### Configuration Access

#### `import.meta.env.OPENFAV_CONFIG`

Accesso alla configurazione a runtime.

**Type:**
- `string`: Configurazione serializzata come JSON string

**Usage:**
```typescript
const config = JSON.parse(import.meta.env.OPENFAV_CONFIG);
```

---

Questa documentazione fornisce una guida completa per il sistema di configurazione OpenFav, inclusi esempi pratici, best practices e troubleshooting.
