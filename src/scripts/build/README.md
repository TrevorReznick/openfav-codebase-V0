# Component Checker Script

This script provides functionality to check if React components are available at given paths and provides fallback handling.

## Files

- `componentChecker.tsx` - Main utility script for checking component availability

## Usage

### Basic Component Checking

```typescript
import { checkComponentOrFallback } from '@/scripts/build/componentChecker';

// Check if a component exists, fallback to default if not
const result = await checkComponentOrFallback('some-component', true);
const Component = await result.loader();
```

### Build Index Specific Check

```typescript
import { checkBuildIndex } from '@/scripts/build/componentChecker';

// Specifically check /build/index page
const result = await checkBuildIndex(true);
if (result.isFallback) {
  console.log('Using fallback component for /build/index');
}
```

## Integration with Astro Middleware

This script is designed to work with Astro middleware that handles route resolution. When a component path (like 'index' for /build/index) cannot be found, it automatically returns the fallback React component.

## Fallback Component

The script includes a default fallback component that displays:
- Green-themed styling with dark mode support
- Message indicating it's a fallback component
- Loaded dynamically in Astro

## API

### `checkComponentOrFallback(componentPath: string, debug?: boolean)`

Checks if a component exists at the given path.

**Parameters:**
- `componentPath`: The component path to check
- `debug`: Enable debug logging (optional)

**Returns:**
```typescript
{
  loader: () => Promise<{ default: React.ComponentType<any> }>,
  isFallback: boolean
}
```

### `checkBuildIndex(debug?: boolean)`

Specific function to check the /build/index page.

**Parameters:**
- `debug`: Enable debug logging (optional)

**Returns:** Same as `checkComponentOrFallback`

## Error Handling

The script gracefully handles component loading failures and automatically provides the fallback component without throwing errors.
