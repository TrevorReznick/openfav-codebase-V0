import { useState, useEffect, lazy } from 'react'
import type { ComponentType } from 'react'
import { getDynamicComponent } from '../lib/autoComponentLoader'

export interface UseDynamicComponentResult {
  Component: ComponentType<any> | null
  loading: boolean
  error: string | null
}

/**
 * Hook for dynamically loading components using the auto component loader
 * Maps component paths like 'components/Navbar' to actual component imports
 *
 * @param componentPath - The component path to load (e.g., 'components/Navbar', 'auth/Auth')
 * @param debug - Enable debug logging
 * @returns Object with Component, loading state, and error
 *
 * @example
 * ```tsx
 * import { useDynamicComponent } from '@/react/hooks'
 *
 * function MyComponent() {
 *   const { Component: Navbar, loading, error } = useDynamicComponent('components/Navbar')
 *
 *   if (loading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error}</div>
 *   if (!Navbar) return <div>Component not found</div>
 *
 *   return <Navbar />
 * }
 * ```
 */
export function useDynamicComponent(
  componentPath: string,
  debug = false
): UseDynamicComponentResult {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!componentPath) {
      setError('Component path is required')
      setLoading(false)
      return
    }

    const loadComponent = async () => {
      try {
        setLoading(true)
        setError(null)

        const config = await getDynamicComponent(componentPath, debug)

        // Create a lazy component from the loader
        const LazyComponent = lazy(config.loader)

        setComponent(() => LazyComponent)
        setLoading(false)

        if (debug) {
          console.log(`[useDynamicComponent] Successfully loaded component: ${componentPath}`)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(`Failed to load component '${componentPath}': ${errorMessage}`)
        setLoading(false)

        if (debug) {
          console.error(`[useDynamicComponent] Error loading component:`, err)
        }
      }
    }

    loadComponent()
  }, [componentPath, debug])

  return { Component, loading, error }
}

export default useDynamicComponent
