/// <reference types="vitest" />
import { execSync } from 'node:child_process';
import { sveltekit } from '@sveltejs/kit/vite';
import packageJson from './package.json';

function gitCommit() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

const appVersion = process.env.APP_VERSION?.trim() || packageJson.version;
const appCommit = process.env.APP_COMMIT?.trim() || gitCommit();

export default {
  plugins: [sveltekit()],
  resolve: process.env.VITEST
    ? {
        conditions: ['browser']
      }
    : undefined,
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    __APP_COMMIT__: JSON.stringify(appCommit)
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.svelte.ts'],
    setupFiles: ['src/test/setup.ts']
  }
};
