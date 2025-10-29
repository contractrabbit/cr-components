#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generateRegistry() {
  const registryDir = path.join(rootDir, 'apps/web/public/registry');

  // Ensure registry directory exists
  await fs.mkdir(registryDir, { recursive: true });

  // Read source files
  const componentPath = path.join(rootDir, 'packages/ui/src/components/cumulative-density-filter.tsx');
  const utilsPath = path.join(rootDir, 'packages/ui/src/lib/cumulative-utils.ts');

  const componentContent = await fs.readFile(componentPath, 'utf-8');
  const utilsContent = await fs.readFile(utilsPath, 'utf-8');

  // Update import paths for shadcn convention
  const shadcnComponentContent = componentContent
    .replace(/from '\.\.\/lib\/cumulative-utils'/g, "from '@/lib/cumulative-utils'");

  // Create registry entry for cumulative-density-filter
  const cumulativeDensityRegistry = {
    name: 'cumulative-density-filter',
    type: 'registry:ui',
    description: 'An interactive chart component that displays a cumulative distribution with a draggable threshold for filtering numeric data.',
    dependencies: ['recharts'],
    devDependencies: ['@types/react', '@types/react-dom'],
    registryDependencies: [],
    files: [
      {
        path: 'components/ui/cumulative-density-filter.tsx',
        content: shadcnComponentContent,
        type: 'registry:ui',
        target: 'components/ui/cumulative-density-filter.tsx'
      },
      {
        path: 'lib/cumulative-utils.ts',
        content: utilsContent,
        type: 'registry:lib',
        target: 'lib/cumulative-utils.ts'
      }
    ],
    tailwind: {
      config: {
        theme: {
          extend: {}
        }
      }
    }
  };

  // Write cumulative-density-filter registry file
  await fs.writeFile(
    path.join(registryDir, 'cumulative-density-filter.json'),
    JSON.stringify(cumulativeDensityRegistry, null, 2)
  );

  // Create registry index (list of all components)
  const registryIndex = [
    {
      name: 'cumulative-density-filter',
      type: 'registry:ui',
      description: 'An interactive chart component that displays a cumulative distribution with a draggable threshold for filtering numeric data.',
      dependencies: ['recharts'],
      files: ['components/ui/cumulative-density-filter.tsx', 'lib/cumulative-utils.ts']
    }
  ];

  await fs.writeFile(
    path.join(registryDir, 'index.json'),
    JSON.stringify(registryIndex, null, 2)
  );

  console.log('✅ Registry generated successfully!');
  console.log(`📁 Registry location: ${registryDir}`);
  console.log('📦 Components:');
  console.log('  - cumulative-density-filter');
}

generateRegistry().catch(console.error);
