# @contractrabbit/ui Components

A React component library featuring a cumulative density filter and shadcn/ui components.

**Live Demo:** https://cr-components.vercel.app

## Quick Start

Install the cumulative density filter component:

```bash
npx shadcn@latest add https://cr-components.vercel.app/registry/cumulative-density-filter.json
```

Or install the full package:

```bash
pnpm add @contractrabbit/ui
```

### Testing

We use Vitest for unit tests within the `@contractrabbit/ui` package.

Commands:
- `pnpm -C packages/ui test` – run tests once
- `pnpm -C packages/ui test:watch` – watch mode

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

Import components from `@contractrabbit/ui` in your app.

```tsx
import { Button } from "@contractrabbit/ui/components/button"
import { CumulativeDensityFilter } from "@contractrabbit/ui"
```

## Components

### CumulativeDensityFilter

An interactive chart component that displays a cumulative distribution with a draggable threshold for filtering numeric data.

**Features:**
- 📊 Smooth cumulative distribution visualization
- 🎯 Draggable threshold with real-time updates
- 📈 Support for logarithmic and linear scales
- 🎨 Customizable colors and styling
- 📱 Fully responsive
- ⚡ Optimized performance

**Example:**

```tsx
import { CumulativeDensityFilter } from "@contractrabbit/ui"

<CumulativeDensityFilter
  values={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
  filterMode="lte"
  onThresholdChange={(threshold, count) => {
    console.log(`Threshold: ${threshold}, Count: ${count}`)
  }}
  className="border rounded-md p-4"
/>
```

For full documentation, see [`packages/ui/README.md`](./packages/ui/README.md)
