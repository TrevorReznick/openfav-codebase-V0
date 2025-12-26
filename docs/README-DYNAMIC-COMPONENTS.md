# Dynamic Component Loading Hook

Questo hook permette di caricare componenti React dinamicamente usando percorsi semplificati, invece di import statici complessi. Il sistema è stato completamente riprogettato per offrire maggiore flessibilità, performance e robustezza.

## 🎯 **Perché usare questo hook?**

### **Problema**
```tsx
// Import statici che possono fallire o essere complessi
import Navbar from '@/components/Navbar';
import Auth from '@/components/auth/Auth';
import Button from '@/components/ui/button';
```

### **Soluzione**
```tsx
// Caricamento dinamico con percorsi semplici
const { Component: Navbar, loading, error } = useDynamicComponent('components/Navbar');
const { Component: Auth } = useDynamicComponent('auth/Auth');
const { Component: Button } = useDynamicComponent('ui/button');
```
### **Vantaggi Chiave**
- **Performance**: Caricamento lazy dei componenti solo quando necessari
- **Flessibilità**: Supporto per multiple base paths e alias
- **Robustezza**: Sistema di fallback e error handling avanzato

## 🚀 **Come Usarlo**

### **1. Import dell'hook**
```tsx
import { useDynamicComponent } from '@/react/hooks';
```

### **2. Utilizzo nel componente**
```tsx
function MyComponent() {
  const { Component: DynamicComp, loading, error } = useDynamicComponent('components/MyComponent');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!DynamicComp) return <div>Component not found</div>;

  return <DynamicComp prop1="value1" prop2="value2" />;
}
```

### **3. Rendering condizionale**
```tsx
return (
  <div>
    {/* Loading state */}
    {loading && <LoadingSpinner />}

    {/* Error state */}
    {error && <ErrorMessage>{error}</ErrorMessage>}

    {/* Success state */}
    {DynamicComp && <DynamicComp {...props} />}
  </div>
);
```

## 📋 **Esempi di Mapping**

| Path Semplificato | File Reale |
|------------------|------------|
| `'components/Navbar'` | `src/react/components/Navbar.tsx` |
| `'auth/Auth'` | `src/react/components/auth/Auth.tsx` |
| `'common/Button'` | `src/react/components/common/Button.tsx` |
| `'ui/Modal'` | `src/react/components/ui/Modal.tsx` |
| `'dashboard/Chart'` | `src/react/components/dashboard/Chart.tsx` |

## 🔧 **Configurazione Base Paths**

I percorsi sono automaticamente risolti dal `autoComponentLoader`:

```typescript
// In autoComponentLoader.ts
const COMPONENT_BASES = {
  components: '/src/react/components',
  auth: '/src/react/components/auth',
  common: '/src/react/components/common',
  ui: '/src/react/components/ui',
  dashboard: '/src/react/components/dashboard',
  // ... altri percorsi
};
```

## 🎨 **Esempio Completo**

```tsx
import React from 'react';
import { useDynamicComponent } from '@/react/hooks';

const MyPage: React.FC = () => {
  // Carica componenti dinamicamente
  const { Component: Header, loading: headerLoading } = useDynamicComponent('components/Header');
  const { Component: Content, loading: contentLoading } = useDynamicComponent('components/Content');
  const { Component: Footer, loading: footerLoading } = useDynamicComponent('components/Footer');

  const isLoading = headerLoading || contentLoading || footerLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {Header && <Header />}
      <main className="flex-1">
        {Content && <Content />}
      </main>
      {Footer && <Footer />}
    </div>
  );
};

export default MyPage;
```

## ⚠️ **Considerazioni**

### **Performance**
- I componenti vengono caricati **lazy** (solo quando necessari)
- Buon impatto sulle performance del bundle iniziale
- **Bundle Optimization**: Riduzione del bundle iniziale attraverso code splitting
- **Caching**: I componenti caricati vengono cachati per accessi successivi
- Possibile delay al primo caricamento

### **Error Handling**
- Gestione robusta degli errori di caricamento
- Fallback UI per componenti non trovati
- Debug logging disponibile

### **Component Resolution**
- **Multiple Resolution Strategies**: Il sistema prova diverse strategie per trovare i componenti
- **Path Normalization**: Normalizzazione automatica dei percorsi e gestione delle estensioni

### **Type Safety**
- TypeScript completo supportato
- Interfacce dedicate per i risultati
- Type checking per props dei componenti

## 🔍 **Debug**

### **Debug Mode**
Abilita il debug per vedere i log di caricamento:

```tsx
const { Component, loading, error } = useDynamicComponent('components/MyComp', true);
// true = debug mode
```

### **Log di Debug**
Il debug mode fornisce log dettagliati:
```bash
[autoComponentLoader] ===== Starting component resolution (glob) =====
[autoComponentLoader] Input path: components/Navbar
[autoComponentLoader] ✅ Matched module: /src/react/components/Navbar.tsx
[useDynamicComponent] Successfully loaded component: components/Navbar
```

### **Error Logging**
In caso di errori, il sistema fornisce informazioni dettagliate:
```bash
[autoComponentLoader] ❌ Failed to find component via Vite registry: components/NonExistent
Tried:
- /src/react/components/NonExistent
- /src/react/components/components/NonExistent
```

## 🚀 **Quando Usarlo**

### ✅ **Raccomandato per:**
- Componenti caricati condizionalmente
- Dashboard con molti componenti
- Modali e dialog dinamici
- Componenti di terze parti
- **Code Splitting**: Suddivisione del codice in chunk più piccoli
- **Conditional Loading**: Caricamento condizionale basato su user interactions

### ❌ **Meno adatto per:**
- Componenti sempre presenti
- Componenti sempre presenti
- Componenti critici per la UI
- Quando le performance sono cruciali

## 📚 **API Reference**
### **Core API**

### **useDynamicComponent(path: string, debug?: boolean)**

#### **Parametri**
- `path`: stringa del percorso semplificato (es. `'components/Navbar'`)
- `debug`: boolean opzionale per abilitare logging

#### **Ritorna**
```typescript
{
  Component: React.ComponentType<any> | null,  // Il componente caricato
  loading: boolean,                           // Stato di caricamento
  error: string | null                        // Errore se presente
}
```

### **Advanced API**

#### **getDynamicComponent(componentPath: string, debug?: boolean)**

Funzione di basso livello per la risoluzione dei componenti:

```typescript
interface AutoComponentConfig {
  loader: () => Promise<{ default: ComponentType<any> }>;
  layout?: 'default' | 'minimal';
  requiredAuth?: boolean;
}

const config = await getDynamicComponent('components/Navbar', true);
```

#### **Component Resolution Strategies**

Il sistema utilizza diverse strategie per risolvere i componenti:

1. **Direct Path**: Percorso diretto normalizzato
2. **Root Relative**: Relativo alla root dei componenti
3. **Base Path**: Con i base paths configurati
4. **Name Resolution**: Risoluzione per nome (bare name)

### **Component Checker**

#### **checkComponentOrFallback(componentPath: string, debug?: boolean)**

Verifica se un componente esiste e fornisce un fallback:

```typescript
const result = await checkComponentOrFallback('index', true);
// Returns: { loader: () => Promise<{ default: ComponentType }>, isFallback: boolean }
```

#### **Fallback Component**

Componente di fallback predefinito:

```tsx
const FallbackComponent: React.FC = () => {
  return (
    <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">
        React fallback component!
      </h2>
      <p className="text-green-700 dark:text-green-300">
        This is a fallback React component loaded dynamically in Astro.
      </p>
    </div>
  );
};
```

## 🛠️ **Advanced Features**

### **Multiple Base Paths**

Il sistema supporta multiple base paths per organizzare i componenti:

```typescript
const COMPONENT_BASES = {
  // Core components
  components: '/src/react/components',
  // Feature-specific components
  auth: '/src/react/components/auth',
  dashboard: '/src/react/components/dashboard',
  // Shared components
  common: '/src/react/components/common',
  ui: '/src/react/components/ui',
  // Test components
  test: '/src/react/components/test',
};
```

### **Path Resolution Examples**

| Input Path | Resolved Path | Strategy |
|------------|---------------|----------|
| `'components/Navbar'` | `/src/react/components/Navbar.tsx` | Direct |
| `'auth/Auth'` | `/src/react/components/auth/Auth.tsx` | Base Path |
| `'Navbar'` | `/src/react/components/Navbar.tsx` | Name Resolution |
| `'@/components/Navbar'` | `/src/react/components/Navbar.tsx` | Alias |

### **Error Handling Strategies**

1. **Graceful Degradation**: Fallback to default component
2. **Error Boundaries**: React Error Boundary wrapping
3. **Retry Logic**: Automatic retry on failed loads
4. **Debug Information**: Detailed error messages for development

### **Performance Optimizations**

- **Lazy Loading**: Componenti caricati solo quando necessari
- **Code Splitting**: Suddivisione automatica del codice
- **Caching**: Componenti cachati dopo il primo caricamento
- **Prefetching**: Precaricamento dei componenti probabili

---

Questo hook mantiene **tutti i componenti esistenti invariati** e offre un'alternativa flessibile per il caricamento dinamico quando necessario. Il sistema è stato progettato per essere estremamente robusto, performante e facile da usare.
Questo hook mantiene **tutti i componenti esistenti invariati** e offre un'alternativa flessibile per il caricamento dinamico quando necessario.
