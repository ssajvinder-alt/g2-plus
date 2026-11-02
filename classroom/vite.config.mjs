import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({root:fileURLToPath(new URL('.',import.meta.url)),base:'/classroom/',build:{outDir:fileURLToPath(new URL('../dist/classroom',import.meta.url)),emptyOutDir:true,chunkSizeWarningLimit:2000}});
