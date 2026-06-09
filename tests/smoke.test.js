/**
 * Smoke tests — verify that every dependency we actively import still exports
 * the exact API surface we rely on after a `pnpm upgrade`.
 *
 * A failing test here means a dependency changed its public API.
 * Check its CHANGELOG before updating the code.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../../');

function installedVersion(pkg) {
  const pkgJsonPath = resolve(ROOT, 'node_modules', pkg, 'package.json');
  return JSON.parse(readFileSync(pkgJsonPath, 'utf-8')).version;
}

function majorOf(version) {
  return parseInt(version.split('.')[0], 10);
}

// ---------------------------------------------------------------------------
// react — used in every src/components/* and src/theme/* file
// ---------------------------------------------------------------------------
describe('react', async () => {
  const React = await import('react');

  it('resolves', () => {
    expect(React).toBeDefined();
  });

  it('exports createElement', () => {
    expect(typeof React.createElement).toBe('function');
  });

  it('exports hooks: useState, useEffect, useRef, useMemo, useCallback', () => {
    for (const hook of ['useState', 'useEffect', 'useRef', 'useMemo', 'useCallback']) {
      expect(typeof React[hook], `React.${hook}`).toBe('function');
    }
  });

  it('major version is 18 — bump requires migration review', () => {
    expect(majorOf(React.version)).toBe(18);
  });
});

// ---------------------------------------------------------------------------
// react-dom — React 18 concurrent-mode API (createRoot)
// ---------------------------------------------------------------------------
describe('react-dom/client', async () => {
  const ReactDOMClient = await import('react-dom/client');

  it('resolves', () => {
    expect(ReactDOMClient).toBeDefined();
  });

  it('exports createRoot (React 18+ API)', () => {
    expect(typeof ReactDOMClient.createRoot).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// clsx — used in Card.js and HomepageFeatures.js
// ---------------------------------------------------------------------------
describe('clsx', async () => {
  const { default: clsx } = await import('clsx');

  it('resolves as a function', () => {
    expect(typeof clsx).toBe('function');
  });

  it('merges class names correctly', () => {
    expect(clsx('foo', { bar: true }, ['baz'])).toBe('foo bar baz');
  });

  it('skips falsy values', () => {
    expect(clsx('a', false, null, undefined, 0, 'b')).toBe('a b');
  });
});

// ---------------------------------------------------------------------------
// prism-react-renderer — used in docusaurus.config.js (themes.github / themes.dracula)
// ---------------------------------------------------------------------------
describe('prism-react-renderer', async () => {
  const { themes } = await import('prism-react-renderer');

  it('exports themes object', () => {
    expect(typeof themes).toBe('object');
    expect(themes).not.toBeNull();
  });

  it('themes.github exists and has the expected shape', () => {
    expect(themes.github).toBeDefined();
    expect(typeof themes.github.plain).toBe('object');
    expect(Array.isArray(themes.github.styles)).toBe(true);
  });

  it('themes.dracula exists and has the expected shape', () => {
    expect(themes.dracula).toBeDefined();
    expect(typeof themes.dracula.plain).toBe('object');
    expect(Array.isArray(themes.dracula.styles)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// dotenv — used at the top of docusaurus.config.js
// ---------------------------------------------------------------------------
describe('dotenv', async () => {
  const dotenv = await import('dotenv');

  it('resolves', () => {
    expect(dotenv).toBeDefined();
  });

  it('exports config as a function', () => {
    expect(typeof dotenv.config).toBe('function');
  });

  it('exports parse as a function', () => {
    expect(typeof dotenv.parse).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// webpack-merge — used in any custom Docusaurus webpack config
// ---------------------------------------------------------------------------
describe('webpack-merge', async () => {
  const { merge } = await import('webpack-merge');

  it('exports merge as a function', () => {
    expect(typeof merge).toBe('function');
  });

  it('merges two objects', () => {
    const result = merge({ a: 1 }, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });
});

// ---------------------------------------------------------------------------
// ahize/chatwoot — used in ChatwootWidget.jsx (load, ready, identify)
// ---------------------------------------------------------------------------
describe('ahize/chatwoot', async () => {
  const chatwoot = await import('ahize/chatwoot');

  it('resolves', () => {
    expect(chatwoot).toBeDefined();
  });

  it('exports load as an async function', () => {
    expect(typeof chatwoot.load).toBe('function');
  });

  it('exports ready as a function', () => {
    expect(typeof chatwoot.ready).toBe('function');
  });

  it('exports identify as a function', () => {
    expect(typeof chatwoot.identify).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// @mdx-js/react — required by Docusaurus MDX pipeline
// ---------------------------------------------------------------------------
describe('@mdx-js/react', async () => {
  const mdxReact = await import('@mdx-js/react');

  it('resolves', () => {
    expect(mdxReact).toBeDefined();
  });

  it('exports MDXProvider as a function', () => {
    expect(typeof mdxReact.MDXProvider).toBe('function');
  });

  it('exports useMDXComponents as a function', () => {
    expect(typeof mdxReact.useMDXComponents).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// @scalar/docusaurus — API reference plugin used in docusaurus.config.js
// ---------------------------------------------------------------------------
describe('@scalar/docusaurus', async () => {
  const scalar = await import('@scalar/docusaurus');

  it('resolves', () => {
    expect(scalar).toBeDefined();
  });

  it('exports a plugin factory as default', () => {
    expect(typeof scalar.default).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// @easyops-cn/docusaurus-search-local — search plugin used in docusaurus.config.js
// ---------------------------------------------------------------------------
describe('@easyops-cn/docusaurus-search-local', async () => {
  const searchLocal = await import('@easyops-cn/docusaurus-search-local');

  it('resolves', () => {
    expect(searchLocal).toBeDefined();
  });

  it('exports a plugin factory as default', () => {
    expect(typeof searchLocal.default).toBe('function');
  });

  it('exports validateOptions as a function', () => {
    expect(typeof searchLocal.validateOptions).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// Docusaurus core packages — version guards (major must stay on 3)
// API is consumed by the Docusaurus webpack pipeline, not directly importable here.
// ---------------------------------------------------------------------------
describe('docusaurus version guards', () => {
  const docusaurusPkgs = [
    '@docusaurus/core',
    '@docusaurus/preset-classic',
    '@docusaurus/theme-mermaid',
  ];

  for (const pkg of docusaurusPkgs) {
    it(`${pkg} major version is 3 — bump requires full migration review`, () => {
      expect(majorOf(installedVersion(pkg))).toBe(3);
    });
  }
});
