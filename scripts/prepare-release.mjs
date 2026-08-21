import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const allowedBumps = new Set([
  "patch",
  "minor",
  "major",
]);

const expectedFiles = new Set([
  "manifest.json",
  "package-lock.json",
  "package.json",
  "versions.json",
]);

const bump = process.argv[2];

if (!allowedBumps.has(bump)) {
  throw new Error(
    `Invalid version bump "${bump}". Expected patch, minor, or major.`,
  );
}

function git(...args) {
  return execFileSync(
    "git",
    args,
    {
      encoding: "utf8",
    },
  ).trim();
}

function npm(...args) {
  execFileSync(
    "npm",
    args,
    {
      stdio: "inherit",
    },
  );
}

function getChangedFiles() {
  const output = git(
    "diff",
    "--name-only",
    "HEAD",
  );

  if (!output) {
    return [];
  }

  return output.split("\n");
}

const branch = git(
  "branch",
  "--show-current",
);

if (branch !== "main") {
  throw new Error(
    `Release must be prepared on main, not ${branch || "detached HEAD"}.`,
  );
}

const status = git(
  "status",
  "--porcelain",
);

if (status) {
  throw new Error(
    `Repository is not clean before release:\n${status}`,
  );
}

console.log(`Bumping ${bump} version...`);

npm(
  "version",
  bump,
  "--no-git-tag-version",
);

const changedFiles = getChangedFiles();

const unexpectedFiles = changedFiles.filter(
  (file) => !expectedFiles.has(file),
);

if (unexpectedFiles.length > 0) {
  throw new Error(
    [
      "Version bump changed unexpected files:",
      ...unexpectedFiles.map(
        (file) => `  ${file}`,
      ),
    ].join("\n"),
  );
}

const missingFiles = [...expectedFiles].filter(
  (file) => !changedFiles.includes(file),
);

if (missingFiles.length > 0) {
  throw new Error(
    [
      "Version bump did not update all expected files:",
      ...missingFiles.map(
        (file) => `  ${file}`,
      ),
    ].join("\n"),
  );
}

const untrackedFiles = git(
  "ls-files",
  "--others",
  "--exclude-standard",
);

if (untrackedFiles) {
  throw new Error(
    `Version bump created unexpected files:\n${untrackedFiles}`,
  );
}

const packageJson = JSON.parse(
  readFileSync(
    "package.json",
    "utf8",
  ),
);

console.log(
  `Prepared version ${packageJson.version}.`,
);