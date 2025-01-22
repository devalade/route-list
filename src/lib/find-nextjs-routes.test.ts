import { test } from 'node:test';
import assert from 'node:assert';
import path from 'path';
import fs from 'fs';
import { findNextJsRoutes } from './find-nextjs-routes.ts';

test('findNextJsRoutes - App Router', async (t) => {
  // Setup test directory structure
  const testDir = path.join(process.cwd(), 'test-app');
  fs.mkdirSync(testDir);
  fs.mkdirSync(path.join(testDir, 'app'));
  fs.mkdirSync(path.join(testDir, 'app', 'about'));
  fs.writeFileSync(path.join(testDir, 'app', 'page.tsx'), '');
  fs.writeFileSync(path.join(testDir, 'app', 'about', 'page.tsx'), '');

  try {
    const routes = findNextJsRoutes(testDir);
    assert.deepStrictEqual(routes.sort(), ['/', '/about'].sort());
  } finally {
    // Cleanup
    fs.rmSync(testDir, { recursive: true });
  }
});

test('findNextJsRoutes - Pages Router', async (t) => {
  // Setup test directory structure
  const testDir = path.join(process.cwd(), 'test-pages');
  fs.mkdirSync(testDir);
  fs.mkdirSync(path.join(testDir, 'pages'));
  fs.mkdirSync(path.join(testDir, 'pages', 'blog'));
  fs.writeFileSync(path.join(testDir, 'pages', 'index.tsx'), '');
  fs.writeFileSync(path.join(testDir, 'pages', 'blog', 'index.tsx'), '');

  try {
    const routes = findNextJsRoutes(testDir);
    assert.deepStrictEqual(routes.sort(), ['/', '/blog'].sort());
  } finally {
    // Cleanup
    fs.rmSync(testDir, { recursive: true });
  }
});

test('findNextJsRoutes - Empty directory', async (t) => {
  // Setup empty test directory
  const testDir = path.join(process.cwd(), 'test-empty');
  fs.mkdirSync(testDir);

  try {
    const routes = findNextJsRoutes(testDir);
    assert.deepStrictEqual(routes, []);
  } finally {
    // Cleanup
    fs.rmSync(testDir, { recursive: true });
  }
});


test('findNextJsRoutes - src directory structure', async (t) => {
  // Setup test directory structure with src folder
  const testDir = path.join(process.cwd(), 'test-src');
  fs.mkdirSync(testDir);
  fs.mkdirSync(path.join(testDir, 'src'));
  fs.mkdirSync(path.join(testDir, 'src', 'app'));
  fs.mkdirSync(path.join(testDir, 'src', 'pages'));
  fs.mkdirSync(path.join(testDir, 'src', 'app', 'about'));
  fs.mkdirSync(path.join(testDir, 'src', 'pages', 'blog'));

  fs.writeFileSync(path.join(testDir, 'src', 'app', 'page.tsx'), '');
  fs.writeFileSync(path.join(testDir, 'src', 'app', 'about', 'page.tsx'), '');
  fs.writeFileSync(path.join(testDir, 'src', 'pages', 'index.tsx'), '');
  fs.writeFileSync(path.join(testDir, 'src', 'pages', 'blog', 'index.tsx'), '');

  try {
    const routes = findNextJsRoutes(testDir);
    assert.deepStrictEqual(routes.sort(), ['/', '/about', '/', '/blog'].sort());
  } finally {
    // Cleanup
    fs.rmSync(testDir, { recursive: true });
  }
});
