/**
 * `astro check` with a bounded V8 heap.
 *
 * The Astro language service holds every `.astro`, `.ts` and content-collection
 * type in one process. At this project's size that peaks around 300 MB, which is
 * unremarkable — but V8 sizes its young generation from total system RAM, not
 * from free memory, so on a 16 GB machine it will try to grow new space by 16 MB
 * at a time. When the machine is near its commit limit that allocation fails and
 * Node aborts with `NewSpace::EnsureCurrentCapacity Allocation failed`, which
 * reads as "out of memory" at 300 MB of heap and sends you looking in the wrong
 * place. Capping the semi-space keeps the growth steps small enough to succeed.
 *
 * A wrapper rather than an inline `NODE_OPTIONS=` prefix in package.json because
 * npm runs scripts through cmd.exe on Windows, where that prefix is a syntax
 * error rather than an assignment. An existing NODE_OPTIONS wins, so CI can
 * override it without editing this file.
 */
import { spawnSync } from 'node:child_process';

const DEFAULT_V8_FLAGS = '--max-semi-space-size=1 --max-old-space-size=2048';

const result = spawnSync('astro', ['check'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NODE_OPTIONS: process.env.NODE_OPTIONS ?? DEFAULT_V8_FLAGS },
});

process.exit(result.status ?? 1);
