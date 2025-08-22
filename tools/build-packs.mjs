import { spawn } from 'node:child_process';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import fs from 'node:fs/promises';

const root = path.resolve(process.cwd());
const moduleJson = JSON.parse(await fs.readFile(path.join(root, 'module.json'), 'utf-8'));
const packs = moduleJson.packs ?? [];

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

for (const pack of packs) {
  const name = pack.name;
  const sourceDir = path.join(root, 'data-json', name);
  const targetDir = path.join(root, 'packs', name);
  if (!(await exists(sourceDir))) continue;
  await fs.mkdir(targetDir, { recursive: true });

  // Pack using foundryvtt-cli
  console.log(`Packing ${name} -> LevelDB`);
  await new Promise((resolve, reject) => {
    const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['-y', 'foundryvtt-cli', 'package', 'pack', name, '--input', sourceDir, '--output', targetDir, '--format', 'leveldb'], { stdio: 'inherit' });
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`fvtt-cli exited with ${code}`)));
  });
}
