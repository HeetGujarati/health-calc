/**
 * Supply-chain gate.
 *
 * `npm audit --audit-level=high` is the control section 12 asks for, and on this
 * tree it can never pass. The whole set of high advisories reaches the project
 * through one dev dependency, `@lhci/cli`, and one of them — the symlink path
 * traversal in `extract-zip` — has no patched release to move to. npm's own
 * suggested remedy is `@lhci/cli@0.1.0`, a version from 2019. So a plain audit
 * step fails every build for a reason nobody can act on, and a gate that always
 * fails is a gate everyone learns to ignore.
 *
 * This splits the check along the line that matters: what ships, versus what
 * builds.
 *
 * Anything in `dependencies` ends up in the artifact or in the process that
 * writes it, so it is held to zero advisories at any severity.
 *
 * Anything in `devDependencies` runs on a developer's machine and in CI. That
 * still matters — CI has a token — so dev advisories fail too, unless they are
 * listed below with a reason and a date. An entry that no longer matches
 * anything also fails, so the list cannot quietly outlive the problem it
 * describes.
 *
 * Reviewing an entry means checking whether a fixed version exists yet. If one
 * does, take it and delete the entry.
 */
import { spawnSync } from 'node:child_process';

/**
 * Advisories accepted for now, by GHSA id.
 *
 * `reviewed` is when the upstream state below was last confirmed.
 */
const ACCEPTED = [
  {
    id: 'GHSA-jmr9-qjv8-65gv',
    package: 'extract-zip',
    reviewed: '2026-08-20',
    reason:
      'Unvalidated symlink path traversal. 2.0.1 is the latest release and no fix exists, so there is nothing to upgrade to. Reached only through @lhci/cli → puppeteer-core, which unpacks a Chrome build it fetched itself over TLS; the archive is never attacker-supplied. Absent from the production tree.',
  },
  {
    id: 'GHSA-ph9p-34f9-6g65',
    package: 'tmp',
    reviewed: '2026-08-20',
    reason:
      'Path traversal via unsanitised prefix, fixed in tmp 0.2.6 — but @lhci/cli depends on 0.1.0 and its inquirer on 0.0.33, and neither prefix comes from outside this repo. Absent from the production tree. Clears when @lhci/cli next updates its own dependencies.',
  },
];

const FAIL_DEV_AT = new Set(['high', 'critical']);

const run = (args) => {
  const result = spawnSync('npm', args, {
    encoding: 'utf8',
    shell: true,
    maxBuffer: 64 * 1024 * 1024,
  });
  // A non-zero exit is how npm reports findings, so only a missing report is fatal.
  if (result.stdout === '' || result.stdout === null) {
    console.error(`npm ${args.join(' ')} produced no report`);
    console.error(result.stderr);
    process.exit(1);
  }
  return JSON.parse(result.stdout);
};

/** Every GHSA id behind a vulnerability entry, flattened out of npm's `via` chain. */
const advisoriesOf = (entry) =>
  entry.via
    .filter((via) => typeof via === 'object')
    .map((via) => ({
      id: String(via.url ?? '')
        .split('/')
        .pop(),
      title: via.title,
      severity: via.severity,
    }));

const problems = [];

// --- what ships -------------------------------------------------------------
const production = run(['audit', '--omit=dev', '--json']);
for (const [name, entry] of Object.entries(production.vulnerabilities ?? {})) {
  problems.push(`production: ${name} (${entry.severity})`);
}

// --- what builds ------------------------------------------------------------
const full = run(['audit', '--json']);
const seen = new Set();

for (const [name, entry] of Object.entries(full.vulnerabilities ?? {})) {
  for (const advisory of advisoriesOf(entry)) {
    if (advisory.id !== undefined) seen.add(advisory.id);
    const accepted = ACCEPTED.find((item) => item.id === advisory.id);
    if (accepted !== undefined) continue;
    if (!FAIL_DEV_AT.has(advisory.severity)) continue;
    problems.push(`dev: ${name} (${advisory.severity}) ${advisory.id} — ${advisory.title}`);
  }
}

for (const accepted of ACCEPTED) {
  if (!seen.has(accepted.id)) {
    problems.push(
      `stale exception: ${accepted.id} (${accepted.package}) no longer matches any advisory — delete it`
    );
  }
}

const counts = Object.values(full.vulnerabilities ?? {}).length;
console.log(
  `Dependency audit: 0 in dependencies, ${counts} in the dev tree, ${ACCEPTED.length} accepted`
);

if (problems.length === 0) {
  console.log('Within policy.');
  process.exit(0);
}

for (const problem of problems) console.error(`  - ${problem}`);
console.error(`\n${problems.length} problem(s). See the header of scripts/audit-deps.mjs.`);
process.exit(1);
