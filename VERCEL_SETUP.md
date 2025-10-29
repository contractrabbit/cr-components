# Vercel Deployment Setup

## Issue

The monorepo needs to be configured properly in Vercel. The CLI deployment is failing because Vercel needs to know:
1. This is a Turborepo monorepo
2. Which app to deploy (`apps/web`)
3. The root directory for the build

## Solution: Deploy via Vercel Dashboard

###  Step 1: Go to Vercel Dashboard

1. Visit https://vercel.com/new
2. Import your Git repository

### Step 2: Configure Project Settings

Set these in the project configuration:

**Framework Preset:** Next.js

**Root Directory:** `apps/web`

**Build Command:**
```bash
cd ../.. && pnpm registry:generate && cd apps/web && pnpm build
```

Or simpler:
```bash
pnpm turbo build --filter=web
```

**Install Command:**
```bash
pnpm install
```

**Output Directory:** (leave default `.next`)

### Step 3: Environment Variables

No special environment variables needed for now.

### Step 4: Deploy

Click "Deploy" and Vercel will:
1. Install dependencies with pnpm
2. Generate the registry files
3. Build the Next.js app
4. Deploy everything

## Alternative: Use Turbo Remote Cache

For better performance, configure Turbo remote caching:

```bash
pnpm turbo login
pnpm turbo link
```

Then Vercel will automatically use Turbo's caching.

## Verify Deployment

After deployment, check:

1. **Demo site:** `https://cr-components.vercel.app/`
2. **Registry:** `https://cr-components.vercel.app/registry/cumulative-density-filter.json`

## Production URLs

- **Live Demo:** https://cr-components.vercel.app
- **Registry Index:** https://cr-components.vercel.app/registry/index.json
- **Component Registry:** https://cr-components.vercel.app/registry/cumulative-density-filter.json

## Install Command for Users

```bash
npx shadcn@latest add https://cr-components.vercel.app/registry/cumulative-density-filter.json
```
