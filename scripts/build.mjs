import { mkdir, cp, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for (const name of await readdir('.')) {
  if (/\.(html|css|js)$/.test(name)) await cp(name,resolve('dist',name));
}
await cp('assets','dist/assets',{recursive:true});
await build({configFile:resolve('classroom/vite.config.mjs')});
await cp('node_modules/@excalidraw/excalidraw/dist/prod/fonts','dist/classroom/fonts',{recursive:true});
await cp('classroom/excalidraw-license.txt','dist/classroom/excalidraw-license.txt');
console.log('School pages and Classroom Studio built successfully.');
