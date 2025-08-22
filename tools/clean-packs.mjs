import fs from 'node:fs/promises';
import path from 'node:path';

const packsDir = path.join(process.cwd(), 'packs');
await fs.rm(packsDir, { recursive: true, force: true });
await fs.mkdir(packsDir, { recursive: true });
console.log('Cleaned packs/');
