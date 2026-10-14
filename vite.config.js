import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps every URL relative, so the build works at
// https://miluv.guruchanworks.com/ and the old https://cmtania.github.io/miluv-docs/ copy.
export default defineConfig({
  base: './',
  plugins: [react()],
});
