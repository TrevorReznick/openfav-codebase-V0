import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { 
  checkComponentOrFallback, 
  checkBuildIndex, 
  FallbackComponent 
} from '@/scripts/build/componentChecker'
import { getDynamicComponent } from '@/react/lib/autoComponentLoader'

vi.mock('@/react/lib/autoComponentLoader', () => ({
  getDynamicComponent: vi.fn()
}))

describe('componentChecker', () => {
  it('returns dynamic component loader when component exists', async () => {
    const TestComp: React.FC = () => <div>Loaded</div>
    vi.mocked(getDynamicComponent).mockResolvedValue({
      loader: async () => ({ default: TestComp }),
      layout: 'default',
      requiredAuth: false
    })

    const result = await checkComponentOrFallback('examples/TestComponent', true)
    expect(result.isFallback).toBe(false)
    const mod = await result.loader()
    expect(mod.default).toBe(TestComp)
  })

  it('returns fallback component loader when component is missing', async () => {
    vi.mocked(getDynamicComponent).mockRejectedValue(new Error('not found'))

    const result = await checkComponentOrFallback('missing/Widget', true)
    expect(result.isFallback).toBe(true)
    const mod = await result.loader()
    expect(mod.default).toBe(FallbackComponent)

    render(React.createElement(mod.default))
    expect(screen.getByText('React fallback component!')).toBeDefined()
  })

  it('checkBuildIndex delegates to index path', async () => {
    const Dummy: React.FC = () => <div />
    vi.mocked(getDynamicComponent).mockResolvedValue({
      loader: async () => ({ default: Dummy })
    } as any)

    const result = await checkBuildIndex(true)
    expect(vi.mocked(getDynamicComponent)).toHaveBeenCalledWith('index', true)
    expect(result.isFallback).toBe(false)
  })
})

