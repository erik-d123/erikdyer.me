// build.mjs: compile site/*.jsx in load order into a single dist/bundle.js.
// Each source file uses globals (window.X = ...) and depends on order;
// we transform JSX -> JS per file with esbuild, then concatenate inside
// one IIFE for top-level scope safety.

import { transform } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const ORDER = [
  'shared.jsx',
  'sidebar.jsx',
  'pages-about.jsx',
  'pages-research.jsx',
  'pages-work.jsx',
  'pages-projects.jsx',
  'timeline-data.jsx',
  'pages-timeline.jsx',
  'app.jsx',
];

const root = new URL('./', import.meta.url).pathname;
const SRC_DIR = join(root, 'site');
const OUT_DIR = join(root, 'dist');
const OUT_FILE = join(OUT_DIR, 'bundle.js');

const compiled = [];
for (const f of ORDER) {
  const src = await readFile(join(SRC_DIR, f), 'utf8');
  const { code } = await transform(src, {
    loader: 'jsx',
    jsx: 'transform',
    target: 'es2020',
    sourcemap: false,
  });
  compiled.push(`/* ---- ${f} ---- */\n${code}`);
}

await mkdir(OUT_DIR, { recursive: true });
const bundle = `(function(){\n${compiled.join('\n')}\n})();`;
await writeFile(OUT_FILE, bundle);

const bytes = (await readFile(OUT_FILE)).length;
console.log(`built dist/bundle.js (${(bytes / 1024).toFixed(1)} KB, ${ORDER.length} files)`);
