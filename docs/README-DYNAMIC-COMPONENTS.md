# Dynamic Component Loading Hook

Questo hook permette di caricare componenti React dinamicamente usando percorsi semplificati, invece di import statici complessi.

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
- Possibile delay al primo caricamento

### **Error Handling**
- Gestione robusta degli errori di caricamento
- Fallback UI per componenti non trovati
- Debug logging disponibile

### **Type Safety**
- TypeScript completo supportato
- Interfacce dedicate per i risultati
- Type checking per props dei componenti

## 🔍 **Debug**

Abilita il debug per vedere i log di caricamento:

```tsx
const { Component, loading, error } = useDynamicComponent('components/MyComp', true);
// true = debug mode
```

## 🚀 **Quando Usarlo**

### ✅ **Raccomandato per:**
- Componenti caricati condizionalmente
- Dashboard con molti componenti
- Modali e dialog dinamici
- Componenti di terze parti
- Code splitting strategico

### ❌ **Meno adatto per:**
- Componenti sempre presenti
- Componenti critici per la UI
- Quando le performance sono cruciali

## 📚 **API Reference**

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

Questo hook mantiene **tutti i componenti esistenti invariati** e offre un'alternativa flessibile per il caricamento dinamico quando necessario.
