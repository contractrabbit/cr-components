# Deployment Guide

This document explains how to deploy the component registry to Vercel.

## Overview

The shadcn component registry is served as static JSON files from the Next.js app at `apps/web/public/registry/`. When deployed to Vercel, these files are accessible at `https://your-domain.vercel.app/registry/[component].json`.

## Setup

### 1. Generate Registry Files

Before deploying, generate the registry files:

```bash
pnpm registry:generate
```

This creates:
- `apps/web/public/registry/cumulative-density-filter.json` - Component registry entry
- `apps/web/public/registry/index.json` - Registry index

### 2. Deploy to Vercel

#### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# For production
vercel --prod
```

#### Option B: Via GitHub Integration

1. Push your code to GitHub
2. Import the repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel will automatically detect the Next.js app and deploy it
4. Set the root directory to `apps/web` if needed

### 3. Configure Build Settings

Vercel configuration is already set in `vercel.json`:

```json
{
  "buildCommand": "pnpm registry:generate && pnpm build",
  "outputDirectory": "apps/web/.next",
  "framework": "nextjs"
}
```

This ensures registry files are generated before each deployment.

### 4. Verify Deployment

After deployment, verify the registry is accessible:

```bash
# Check index
curl https://cr-components.vercel.app/registry/index.json

# Check component
curl https://cr-components.vercel.app/registry/cumulative-density-filter.json
```

## Using the Registry

Once deployed, users can install components with:

```bash
npx shadcn@latest add https://cr-components.vercel.app/registry/cumulative-density-filter.json
```

Live site: **https://cr-components.vercel.app**

## Updating the Registry

To add new components:

1. Create the component in `packages/ui/src/components/`
2. Update `scripts/generate-registry.mjs` to include the new component
3. Run `pnpm registry:generate`
4. Commit and push (or redeploy)

## Custom Domain

To use a custom domain:

1. Go to your project settings in Vercel
2. Add your custom domain
3. Update DNS records as instructed
4. Update the registry URL in `packages/ui/README.md`

## Troubleshooting

### Registry files not found

- Ensure `pnpm registry:generate` runs successfully
- Check that files exist in `apps/web/public/registry/`
- Verify Vercel build logs show registry generation

### CORS issues

The `vercel.json` includes CORS headers for the `/registry/*` path. If you still have issues, check browser console for specific errors.

### Component installation fails

- Verify the JSON structure matches shadcn registry format
- Test the registry file locally with `npx shadcn@latest add file:./apps/web/public/registry/cumulative-density-filter.json`
