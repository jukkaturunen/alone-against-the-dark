import { cp, mkdir, readdir, rm } from 'node:fs/promises';
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('../dist/', import.meta.url));
await cp(new URL('../web/', import.meta.url), new URL('../dist/', import.meta.url), { recursive: true });
const files = await readdir(new URL('../dist/', import.meta.url), { recursive: true });
if (files.some(f => /\.pdf$|\.env|\.git/.test(f))) throw new Error('Unexpected private file in build');
console.log(`Built ${files.length} app files into dist/; source PDFs excluded.`);
