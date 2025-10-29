# @contractrabbit/ui

A React component library featuring a cumulative density filter and shadcn/ui components.

## Installation

### Using shadcn CLI (Recommended)

The easiest way to add the cumulative density filter component to your project:

```bash
npx shadcn@latest add https://cr-components.vercel.app/registry/cumulative-density-filter.json
```

This will automatically:
- Install required dependencies (`recharts`)
- Add the component to `components/ui/cumulative-density-filter.tsx`
- Add utility functions to `lib/cumulative-utils.ts`

You can also browse all available components at: **https://cr-components.vercel.app**

Or install standard shadcn/ui components:

```bash
npx shadcn@latest init
npx shadcn@latest add button
```

### Via Package Manager

Install the entire package:

```bash
npm install @contractrabbit/ui
# or
pnpm add @contractrabbit/ui
# or
yarn add @contractrabbit/ui
```

## Components

### CumulativeDensityFilter

An interactive chart component that displays a cumulative distribution with a draggable threshold for filtering numeric data.

#### Features

- 📊 Smooth cumulative distribution visualization
- 🎯 Draggable threshold with real-time updates
- 📈 Support for logarithmic and linear scales
- 🎨 Customizable colors and styling
- 📱 Fully responsive
- ⚡ Optimized performance
- 🎭 Conditional fill based on filter mode (lt/lte/gt/gte)
- 🔧 Customizable tooltip rendering

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `values` | `number[]` | **required** | Array of numeric values to visualize |
| `initialThreshold` | `number` | midpoint | Starting threshold position |
| `filterMode` | `'lt' \| 'lte' \| 'gt' \| 'gte'` | `'lte'` | Comparison operator for filtering |
| `logScale` | `boolean` | `false` | Use logarithmic scale for X-axis |
| `xAxisTicks` | `number` | auto | Number of X-axis ticks |
| `thresholdColor` | `string` | `'#ef4444'` | Color for threshold line and handle |
| `onThresholdChange` | `(threshold: number, count: number) => void` | - | Callback when threshold changes |
| `showThresholdLabel` | `boolean` | `true` | Show count label above threshold |
| `renderTooltip` | `function` | - | Custom tooltip renderer |
| `height` | `number` | `200` | Component height in pixels |
| `className` | `string` | `''` | Additional CSS classes |

#### Example

```tsx
import { CumulativeDensityFilter } from "@contractrabbit/ui"

function MyComponent() {
  const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

  const handleThresholdChange = (threshold: number, count: number) => {
    console.log(`Threshold: ${threshold}, Items: ${count}`)
  }

  return (
    <CumulativeDensityFilter
      values={data}
      filterMode="lte"
      onThresholdChange={handleThresholdChange}
      className="border rounded-md p-4"
    />
  )
}
```

#### Advanced Example with Custom Tooltip

```tsx
<CumulativeDensityFilter
  values={contractValues}
  filterMode="lte"
  logScale={false}
  xAxisTicks={10}
  thresholdColor="#ef4444"
  showThresholdLabel={true}
  onThresholdChange={(threshold, count) => {
    setFilteredContracts(contracts.filter(c => c.value <= threshold))
  }}
  renderTooltip={({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-popover border border-border rounded p-2 shadow-md">
        <div className="font-medium">Value: {Number(label).toFixed(2)}</div>
        <div>Count: {Number(payload[0]?.value || 0)}</div>
      </div>
    )
  }}
  height={250}
  className="w-full"
/>
```

### Other Components

This package also includes components from shadcn/ui:

- `Button` - Versatile button component
- `ThemeToggle` - Dark/light mode toggle

See the [shadcn/ui documentation](https://ui.shadcn.com/) for more details on these components.

## Styling

This library uses Tailwind CSS. Make sure your project has Tailwind configured. Import the global styles:

```tsx
import "@contractrabbit/ui/globals.css"
```

## License

MIT
