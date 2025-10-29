import { describe, it, expect } from 'vitest'
import { lowerBound, upperBound, getCountAtThreshold, thresholdToPercentage, computeTicks } from './cumulative-utils'

describe('binary search utils', () => {
  const arr = [1, 2, 2, 5, 9]

  it('lowerBound', () => {
    expect(lowerBound(arr, 0)).toBe(0)
    expect(lowerBound(arr, 2)).toBe(1)
    expect(lowerBound(arr, 3)).toBe(3)
    expect(lowerBound(arr, 10)).toBe(5)
  })

  it('upperBound', () => {
    expect(upperBound(arr, 0)).toBe(0)
    expect(upperBound(arr, 2)).toBe(3)
    expect(upperBound(arr, 5)).toBe(4)
    expect(upperBound(arr, 10)).toBe(5)
  })
})

describe('getCountAtThreshold', () => {
  const arr = [1, 2, 2, 5, 9]
  it('lt / lte / gt / gte', () => {
    expect(getCountAtThreshold('lt', arr, 2)).toBe(1)
    expect(getCountAtThreshold('lte', arr, 2)).toBe(3)
    expect(getCountAtThreshold('gt', arr, 5)).toBe(1)
    expect(getCountAtThreshold('gte', arr, 5)).toBe(2)
  })
})

describe('thresholdToPercentage', () => {
  it('linear', () => {
    expect(thresholdToPercentage(0, 100, 50, false)).toBe(50)
  })
  it('degenerate equal min/max', () => {
    expect(thresholdToPercentage(10, 10, 10, false)).toBe(0)
  })
  it('log scale', () => {
    const p1 = thresholdToPercentage(1, 100, 10, true)
    const p2 = thresholdToPercentage(1, 100, 1, true)
    const p3 = thresholdToPercentage(1, 100, 100, true)
    expect(p2).toBe(0)
    expect(Math.round(p1)).toBeCloseTo(50, 0)
    expect(p3).toBe(100)
  })
})

describe('computeTicks', () => {
  it('auto ticks by width', () => {
    const ticks = computeTicks(0, 100, false, 800)
    expect(ticks).toBeDefined()
    expect(ticks!.length).toBeGreaterThan(10)
  })
  it('fixed ticks', () => {
    const ticks = computeTicks(0, 100, false, 200, 5)
    expect(ticks!.length).toBe(5)
    expect(ticks![0]).toBe(0)
    expect(Math.round(ticks![4]!)).toBe(100)
  })
})

