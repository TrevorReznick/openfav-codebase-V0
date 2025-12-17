import React from 'react';
import { getDynamicComponent } from '@/react/lib/autoComponentLoader';

// Fallback component provided by user
const SayHello: React.FC = () => {
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

/**
 * Checks if a component path is available and returns it, otherwise returns the fallback component
 * @param componentPath - The component path to check (e.g., 'index' for /build/index)
 * @param debug - Enable debug logging
 * @returns Promise resolving to component config with loader function
 */
export async function checkComponentOrFallback(
  componentPath: string,
  debug = false
): Promise<{ loader: () => Promise<{ default: React.ComponentType<any> }>, isFallback: boolean }> {
  try {
    if (debug) {
      console.log(`[componentChecker] Checking component: ${componentPath}`);
    }

    // Try to get the dynamic component config
    const config = await getDynamicComponent(componentPath, debug);

    if (debug) {
      console.log(`[componentChecker] ✅ Component found: ${componentPath}`);
    }

    return {
      loader: config.loader,
      isFallback: false
    };
  } catch (error) {
    if (debug) {
      console.warn(`[componentChecker] ❌ Component not found: ${componentPath}`, error);
      console.log(`[componentChecker] 🔄 Using fallback component for: ${componentPath}`);
    }

    // Return fallback component loader
    return {
      loader: async () => ({ default: SayHello }),
      isFallback: true
    };
  }
}

/**
 * Specific function to check /build/index page
 * @param debug - Enable debug logging
 * @returns Promise resolving to component config
 */
export async function checkBuildIndex(debug = false) {
  return checkComponentOrFallback('index', debug);
}

// Export the fallback component for direct use if needed
export { SayHello as FallbackComponent };
