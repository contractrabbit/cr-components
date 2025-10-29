export type FilterMode = 'lt' | 'lte' | 'gt' | 'gte'

export function lowerBound(arr: number[], x: number): number {
  let l = 0, r = arr.length
  while (l < r) {
    const m = (l + r) >> 1
    if (arr[m]! < x) l = m + 1
    else r = m
  }
  return l
}

export function upperBound(arr: number[], x: number): number {
  let l = 0, r = arr.length
  while (l < r) {
    const m = (l + r) >> 1
    if (arr[m]! <= x) l = m + 1
    else r = m
  }
  return l
}

export function getCountAtThreshold(mode: FilterMode, sortedValues: number[], t: number): number {
  if (!sortedValues.length) return 0
  switch (mode) {
    case 'lt':
      return lowerBound(sortedValues, t)
    case 'lte':
      return upperBound(sortedValues, t)
    case 'gt': {
      const i = upperBound(sortedValues, t)
      return Math.max(0, sortedValues.length - i)
    }
    case 'gte': {
      const i = lowerBound(sortedValues, t)
      return Math.max(0, sortedValues.length - i)
    }
    default:
      return upperBound(sortedValues, t)
  }
}

export function thresholdToPercentage(min: number, max: number, t: number, logScale: boolean): number {
  if (max === min) return 0
  if (logScale && min > 0 && max > 0 && t > 0) {
    const logMin = Math.log(min)
    const logMax = Math.log(max)
    const logT = Math.log(t)
    return ((logT - logMin) / (logMax - logMin)) * 100
  }
  return ((t - min) / (max - min)) * 100
}

export function computeTicks(
  minValue: number,
  maxValue: number,
  logScale: boolean,
  containerWidth: number,
  xAxisTicks?: number
): number[] | undefined {
  if (maxValue === minValue) return undefined
  const autoTickCount = Math.max(6, Math.round((containerWidth || 0) / 40))
  const count = xAxisTicks ?? autoTickCount
  if (!count || count < 2) return undefined

  const ticks: number[] = []
  if (logScale && minValue > 0) {
    const logMin = Math.log(minValue)
    const logMax = Math.log(maxValue)
    for (let i = 0; i < count; i++) {
      const logValue = logMin + (i / (count - 1)) * (logMax - logMin)
      ticks.push(Math.exp(logValue))
    }
  } else {
    for (let i = 0; i < count; i++) {
      ticks.push(minValue + (i / (count - 1)) * (maxValue - minValue))
    }
  }
  return ticks
}

