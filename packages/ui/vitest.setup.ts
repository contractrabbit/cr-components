// Basic ResizeObserver mock for Recharts + our component
class RO {
  cb: ResizeObserverCallback
  constructor(cb: ResizeObserverCallback) { this.cb = cb }
  observe(target: Element) {
    // Fire once with a sensible width
    this.cb([{ target, contentRect: { width: 800, height: 200 } as DOMRectReadOnly } as ResizeObserverEntry], this)
  }
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error - ResizeObserver is not defined in the test environment
global.ResizeObserver = RO

// Provide getBoundingClientRect with non-zero defaults
const origGetBCR = Element.prototype.getBoundingClientRect
Element.prototype.getBoundingClientRect = function () {
  const r = origGetBCR.call(this)
  // If width is 0, return a default rect so calculations work in JSDOM
  if (!r || (r.width === 0 && r.height === 0)) {
    return { x: 0, y: 0, left: 0, top: 0, right: 800, bottom: 200, width: 800, height: 200, toJSON: () => {} } as DOMRect
  }
  return r
}
import '@testing-library/jest-dom/vitest'
