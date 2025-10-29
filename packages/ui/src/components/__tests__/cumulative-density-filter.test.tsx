import { render, within, fireEvent } from '@testing-library/react'
import React from 'react'
import { CumulativeDensityFilter } from '../../components/cumulative-density-filter'
import { describe, it, expect, vi } from 'vitest'

function genValues(n = 50) {
  return Array.from({ length: n }, (_, i) => i + 1)
}

describe('CumulativeDensityFilter component', () => {
  it('renders without crashing and shows threshold label by default', async () => {
    const { container } = render(
      <div style={{ width: 900, height: 260 }}>
        <CumulativeDensityFilter values={genValues()} />
      </div>
    )
    // label group renders
    const label = await within(container).findByTestId('cdf-threshold-label')
    expect(label).toBeTruthy()
    // svg present
    expect(document.querySelector('svg')).toBeTruthy()
  })

  it('hides the threshold label when showThresholdLabel=false', async () => {
    const { container } = render(
      <div style={{ width: 900, height: 260 }}>
        <CumulativeDensityFilter values={genValues()} showThresholdLabel={false} />
      </div>
    )
    // Label group should be absent (only within host)
    const labels = within(container).queryAllByTestId('cdf-threshold-label')
    expect(labels.length).toBe(0)
  })

  it('fires onThresholdChange when dragging the handle', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <div style={{ width: 900, height: 260 }}>
        <CumulativeDensityFilter
          values={genValues(100)}
          onThresholdChange={onChange}
        />
      </div>
    )

    const hitbox = within(container).getAllByTestId('cdf-handle-hitbox')[0]
    // mousedown on the handle (use mouse events to trigger onMouseDown)
    fireEvent.mouseDown(hitbox!)
    await Promise.resolve()
    // move to the right by simulating a window mousemove
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 600 }))
    // release
    window.dispatchEvent(new MouseEvent('mouseup'))
    await Promise.resolve()

    expect(onChange).toHaveBeenCalled()
  })
})
