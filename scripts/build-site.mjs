import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2];
if (!['pages', 'toy'].includes(target)) throw new Error('Expected build target: pages or toy');
const env = {
  ...process.env,
  NEXT_BASE_PATH: process.env.NEXT_BASE_PATH ?? (target === 'toy' ? '/toy/cig-model-world' : '/cigModelWorld'),
  NEXT_DIST_DIR: process.env.NEXT_DIST_DIR ?? (target === 'toy' ? '.next-toy' : 'out'),
  NEXT_TELEMETRY_DISABLED: '1',
};
function run(args) {
  const result = spawnSync(process.execPath, args, { cwd: root, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
if (!process.env.npm_execpath) throw new Error('Run this launcher using npm run build:pages or npm run toy:build');
run([process.env.npm_execpath, 'run', 'build']);
if (target === 'toy') run([join(root, 'node_modules/tsx/dist/cli.mjs'), join(root, 'scripts/toy/pack.ts')]);
