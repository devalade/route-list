import fs from 'fs';
import path from 'path';

export type Route = string;

interface RouteScanner {
  processAppDirectory: (currentPath: string, routePath?: string) => void;
  processPagesDirectory: (currentPath: string, routePath?: string) => void;
}

export function findNextJsRoutes(dir: string): Route[] {
  const routes: Route[] = [];

  // Function to process app directory (App Router)
  const processAppDirectory: RouteScanner['processAppDirectory'] = (
    currentPath: string,
    routePath: string = ''
  ): void => {
    const items: string[] = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath: string = path.join(currentPath, item);
      const stat: fs.Stats = fs.statSync(fullPath);

      // Skip if it's node_modules or hidden folders
      if (item.startsWith('.') || item === 'node_modules') continue;

      if (stat.isDirectory()) {
        // Handle route groups
        if (item.startsWith('(')) {
          processAppDirectory(fullPath, routePath);
        } else {
          const newRoutePath: string = routePath + '/' + item;
          processAppDirectory(fullPath, newRoutePath);
        }
      } else if (stat.isFile()) {
        // Handle page files
        if (item === 'page.js' || item === 'page.tsx') {
          routes.push(routePath || '/');
        }
      }
    }
  };

  const processPagesDirectory: RouteScanner['processPagesDirectory'] = (
    currentPath: string,
    routePath: string = ''
  ): void => {
    const items: string[] = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath: string = path.join(currentPath, item);
      const stat: fs.Stats = fs.statSync(fullPath);

      // Skip if it's node_modules or hidden folders
      if (item.startsWith('.') || item === 'node_modules') continue;

      if (stat.isDirectory()) {
        const newRoutePath: string = routePath + '/' + item;
        processPagesDirectory(fullPath, newRoutePath);
      } else if (stat.isFile()) {
        // Handle page files
        if (item.endsWith('.js') || item.endsWith('.tsx')) {
          const routeName: string = item.replace(/\.(js|tsx)$/, '');
          if (routeName === 'index') {
            routes.push(routePath || '/');
          } else {
            routes.push((routePath + '/' + routeName).replace(/\/+/g, '/'));
          }
        }
      }
    }
  };

  const srcDir: string = path.join(dir, 'src');
  const baseDir: string = fs.existsSync(srcDir) ? srcDir : dir;

  const appDir: string = path.join(baseDir, 'app');
  if (fs.existsSync(appDir)) {
    console.log('Found App Router directory...');
    processAppDirectory(appDir);
  }

  const pagesDir: string = path.join(baseDir, 'pages');
  if (fs.existsSync(pagesDir)) {
    console.log('Found Pages Router directory...');
    processPagesDirectory(pagesDir);
  }

  return routes;
}

export function main(): void {
}
