#!/usr/bin/env node

import { findNextJsRoutes, type Route } from "./lib/find-nextjs-routes.ts";


try {
  const projectDir: string = process.cwd();
  console.log('Scanning Next.js routes...\n');

  const routes: Route[] = findNextJsRoutes(projectDir);

  console.log('Found routes:');
  routes.sort().forEach((route: Route): void => {
    console.log(`- ${route}`);
  });

  console.log(`\nTotal routes found: ${routes.length}`);
} catch (error) {
  console.error('Error scanning routes:', error instanceof Error ? error.message : error);
}
