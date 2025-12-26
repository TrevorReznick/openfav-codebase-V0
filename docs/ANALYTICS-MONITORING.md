
# Analytics & Monitoring Integration

## 📋 Overview

OpenFav fornisce un sistema integrato per analytics e monitoring, supportando multiple piattaforme e strumenti per il tracciamento delle performance utente e del comportamento del sito.

## 🏗️ Supported Platforms

### 1. Google Analytics

#### Configuration

```yaml
analytics:
  enable: true
  googleAnalyticsId: "G-XXXXXXXXXX"
```

#### Implementation

Il sistema include automaticamente lo script Google Analytics:

```html
<!-- Google Analytics tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Features

- **Page View Tracking**: Tracciamento automatico delle visualizzazioni di pagina
- **Event Tracking**: Tracciamento eventi personalizzati
- **User Behavior Analysis**: Analisi del comportamento utente
- **Conversion Tracking**: Tracciamento conversioni e obiettivi
- **Real-time Data**: Dati in tempo reale

### 2. Google Tag Manager

#### Configuration

```yaml
analytics:
  enable: true
  googleTagManagerId: "GTM-XXXXXXX"
```

#### Implementation

Integrazione con Google Tag Manager:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM_ID');</script>
<!-- End Google Tag Manager -->
```

#### Features

- **Tag Management**: Gestione centralizzata dei tag
- **Custom Events**: Eventi personalizzati e trigger
- **A/B Testing**: Test A/B e ottimizzazione
- **Third-party Integration**: Integrazione con strumenti di terze parti
- **Data Layer Management**: Gestione avanzata del data layer

### 3. Plausible Analytics

#### Configuration

```yaml
analytics:
  enable: true
  plausibleDomain: "yoursite.com"
```

#### Implementation

Integrazione con Plausible Analytics:

```html
<!-- Plausible Analytics -->
<script defer data-domain="yoursite.com" src="https://plausible.io/js/plausible.js"></script>
```

#### Features

- **Privacy-Focused**: Analytics rispettoso della privacy
- **Cookie-less**: Funziona senza cookie
- **Lightweight**: Script leggero e performante
- **Real-time Stats**: Statistiche in tempo reale
- **Custom Events**: Eventi personalizzati
- **Goal Tracking**: Tracciamento obiettivi

### 4. Hotjar

#### Configuration

```yaml
analytics:
  enable: true
  hotjarId: "1234567"
```

#### Implementation

Integrazione con Hotjar:

```html
<!-- Hotjar -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1234567,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

#### Features

- **Heatmaps**: Mappe di calore delle interazioni utente
- **Session Recordings**: Registrazioni delle sessioni utente
- **Conversion Funnels**: Funnel di conversione
- **Form Analysis**: Analisi dei moduli
- **User Feedback**: Feedback utente
- **Surveys**: Sondaggi e indagini

## 🔧 Configuration System

### Centralized Configuration

Tutte le integrazioni sono configurate centralmente:

```yaml
analytics:
  enable: true
  googleAnalyticsId: "G-XXXXXXXXXX"
  plausibleDomain: "yoursite.com"
  googleTagManagerId: "GTM-XXXXXXX"
  hotjarId: "1234567"
```

### Environment-Specific Settings

Configurazioni diverse per ambienti diversi:

```yaml
# Development
analytics:
  enable: false

# Production
analytics:
  enable: true
  googleAnalyticsId: "G-XXXXXXXXXX"
  plausibleDomain: "yoursite.com"
  googleTagManagerId: "GTM-XXXXXXX"
  hotjarId: "1234567"
```

### Conditional Loading

Caricamento condizionale basato sull'ambiente:

```typescript
const isProduction = import.meta.env.PROD;
const analyticsEnabled = config.analytics?.enable && isProduction;

if (analyticsEnabled) {
  // Load analytics scripts
}
```

## 🚀 Implementation Details

### Analytics Component

Componente React per la gestione degli analytics:

```typescript
import React, { useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';

interface AnalyticsProps {
  children?: React.ReactNode;
}

export const Analytics: React.FC<AnalyticsProps> = ({ children }) => {
  const config = useConfig();
  const { analytics } = config;

  useEffect(() => {
    if (!analytics?.enable) return;

    // Google Analytics
    if (analytics.googleAnalyticsId) {
      loadGoogleAnalytics(analytics.googleAnalyticsId);
    }

    // Google Tag Manager
    if (analytics.googleTagManagerId) {
      loadGoogleTagManager(analytics.googleTagManagerId);
    }

    // Plausible Analytics
    if (analytics.plausibleDomain) {
      loadPlausibleAnalytics(analytics.plausibleDomain);
    }

    // Hotjar
    if (analytics.hotjarId) {
      loadHotjar(analytics.hotjarId);
    }
  }, [analytics]);

  return <>{children}</>;
};

// Helper functions for loading analytics scripts
const loadGoogleAnalytics = (id: string) => {
  // Implementation for Google Analytics
};

const loadGoogleTagManager = (id: string) => {
  // Implementation for Google Tag Manager
};

const loadPlausibleAnalytics = (domain: string) => {
  // Implementation for Plausible Analytics
};

const loadHotjar = (id: string) => {
  // Implementation for Hotjar
};
```

### Event Tracking

Sistema di tracciamento eventi personalizzato:

```typescript
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      non_interaction: event.nonInteraction || false,
    });
  }
};

// Usage examples
trackEvent({
  category: 'Button',
  action: 'Click',
  label: 'Sign Up',
});

trackEvent({
  category: 'Form',
  action: 'Submit',
  label: 'Contact Form',
  value: 1,
});
```

### Page View Tracking

Tracciamento automatico delle visualizzazioni di pagina:

```typescript
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Usage in router
const router = useRouter();
router.events.on('routeChangeComplete', (path) => {
  trackPageView(path);
});
```

## 📊 Custom Events

### User Interaction Events

Tracciamento delle interazioni utente:

```typescript
// Button clicks
const trackButtonClick = (buttonName: string) => {
  trackEvent({
    category: 'Button',
    action: 'Click',
    label: buttonName,
  });
};

// Form submissions
const trackFormSubmission = (formName: string) => {
  trackEvent({
    category: 'Form',
    action: 'Submit',
    label: formName,
  });
};

// Link clicks
const trackLinkClick = (linkText: string, destination: string) => {
  trackEvent({
    category: 'Link',
    action: 'Click',
    label: linkText,
  });
};
```

### E-commerce Events

Tracciamento eventi e-commerce:

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  brand?: string;
  variant?: string;
}

export const trackProductView = (product: Product) => {
  trackEvent({
    category: 'Ecommerce',
    action: 'View',
    label: product.name,
    value: product.price,
  });
};

export const trackAddToCart = (product: Product, quantity: number) => {
  trackEvent({
    category: 'Ecommerce',
    action: 'Add to Cart',
    label: product.name,
    value: product.price * quantity,
  });
};

export const trackPurchase = (products: Product[], total: number) => {
  trackEvent({
    category: 'Ecommerce',
    action: 'Purchase',
    label: 'Order Complete',
    value: total,
  });
};
```

### Performance Events

Tracciamento delle performance:

```typescript
export const trackPerformance = (metric: string, value: number) => {
  trackEvent({
    category: 'Performance',
    action: metric,
    label: `${metric} ms`,
    value: Math.round(value),
  });
};

// Track Core Web Vitals
export const trackCoreWebVitals = (metric: any) => {
  const { name, value, id } = metric;
  
  trackEvent({
    category: 'Web Vitals',
    action: name,
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
  });
};
```

## 🛠️ Advanced Features

### A/B Testing Integration

Integrazione con A/B testing:

```typescript
export const trackABTest = (testName: string, variant: string) => {
  trackEvent({
    category: 'A/B Test',
    action: 'Impression',
    label: `${testName} - ${variant}`,
  });
};

export const trackABTestConversion = (testName: string, variant: string) => {
  trackEvent({
    category: 'A/B Test',
    action: 'Conversion',
    label: `${testName} - ${variant}`,
  });
};
```

### User Segmentation

Segmentazione degli utenti:

```typescript
interface UserSegment {
  id: string;
  name: string;
  criteria: Record<string, any>;
}

export const setUserSegment = (segment: UserSegment) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', {
      user_segment: segment.name,
      segment_id: segment.id,
    });
  }
};
```

### Custom Dimensions

Dimensioni personalizzate:

```typescript
export const setCustomDimension = (dimension: string, value: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', {
      [dimension]: value,
    });
  }
};

// Usage
setCustomDimension('user_type', 'premium');
setCustomDimension('login_status', 'logged_in');
```

## 🔍 Debugging & Testing

### Debug Mode

Modalità debug per testing:

```typescript
const isDebugMode = import.meta.env.DEV;

export const debugTrackEvent = (event: AnalyticsEvent) => {
  if (isDebugMode) {
    console.log('[Analytics Debug]', event);
  }
  
  if (!isDebugMode || analyticsEnabled) {
    trackEvent(event);
  }
};
```

### Testing Analytics

Test per verificare il corretto funzionamento:

```typescript
// Mock analytics for testing
export const mockAnalytics = {
  events: [] as AnalyticsEvent[],
  
  trackEvent: (event: AnalyticsEvent) => {
    mockAnalytics.events.push(event);
    console.log('[Mock Analytics]', event);
  },
  
  reset: () => {
    mockAnalytics.events = [];
  },
  
  getEvents: () => mockAnalytics.events,
};

// Usage in tests
test('tracks button click event', () => {
  const { trackEvent } = mockAnalytics;
  
  trackEvent({
    category: 'Button',
    action: 'Click',
    label: 'Test Button',
  });
  
  expect(mockAnalytics.getEvents()).toHaveLength(1);
  expect(mockAnalytics.getEvents()[0].action).toBe('Click');
});
```

## 📚 Best Practices

### 1. Privacy Compliance

Rispetta le normative sulla privacy:

```typescript
export const checkConsent = (): boolean => {
  // Check if user has given consent for analytics
  const consent = localStorage.getItem('analytics_consent');
  return consent === 'true';
};

export const setConsent = (consent: boolean) => {
  localStorage.setItem('analytics_consent', consent.toString());
  
  if (consent) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
};
```

### 2. Performance Optimization

Ottimizza le performance degli analytics:

```typescript
export const loadAnalyticsAsync = () => {
  if (typeof window === 'undefined') return;
  
  // Load analytics scripts after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      initializeAnalytics();
    }, 1000); // Delay by 1 second
  });
};
```

### 3. Error Handling

Gestione robusta degli errori:

```typescript
export const safeTrackEvent = (event: AnalyticsEvent) => {
  try {
    trackEvent(event);
  } catch (error) {
    console.error('[Analytics Error]', error);
    // Optionally send error to error tracking service
  }
};
```

### 4. Data Sampling

Campionamento dei dati per ridurre il carico:

```typescript
export const shouldSample = (sampleRate: number = 0.1): boolean => {
  return Math.random() < sampleRate;
};

export const trackSampledEvent = (event: AnalyticsEvent, sampleRate: number = 0.1) => {
  if (shouldSample(sampleRate)) {
    trackEvent(event);
  }
};
```

---

Questa documentazione fornisce una guida completa per l'integrazione di analytics e monitoring in OpenFav, inclusi esempi pratici, best practices e implementazioni avanzate.
