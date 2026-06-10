/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.svelte.ts'],
    setupFiles: ['src/test/setup.ts']
  }
};
