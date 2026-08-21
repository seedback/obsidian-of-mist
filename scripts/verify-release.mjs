import { execFileSync } from "node:child_process";
import {
  readFileSync,
  statSync,
} from "node:fs";

const versionFiles = new Set([
  "manifest.json",
  "package-lock.json",
  "package.json",
  "versions.json",
]);

const allowedFiles = versionFiles;

const releaseFiles = [
  "manifest.json",
  "main.js",
  "styles.css",
];

function git(...args) {
  return execFileSync(
    "git",
    args,
    {
      encoding: "utf8",
    },
  ).trim();
}

function readJson(file) {
  return JSON.parse(
    readFileSync(
      file,
      "utf8",
    ),
  );
}

const packageJson = readJson(
  "package.json",
);

const manifest = readJson(
  "manifest.json",
);

const versions = readJson(
  "versions.json",
);

const version = packageJson.version;

if (manifest.version !== version) {
  throw new Error(
    [
      "Version mismatch:",
      `  package.json: ${version}`,
      `  manifest.json: ${manifest.version}`,
    ].join("\n"),
  );
}

if (!(version in versions)) {
  throw new Error(
    `versions.json has no entry for ${version}.`,
  );
}

if (versions[version] !== manifest.minAppVersion) {
  throw new Error(
    [
      `versions.json entry for ${version} is incorrect:`,
      `  versions.json: ${versions[version]}`,
      `  manifest.json: ${manifest.minAppVersion}`,
    ].join("\n"),
  );
}

for (const file of releaseFiles) {
  const stats = statSync(file);

  if (!stats.isFile()) {
    throw new Error(
      `${file} is not a file.`,
    );
  }

  if (stats.size === 0) {
    throw new Error(
      `${file} is empty.`,
    );
  }
}

const changedOutput = git(
  "diff",
  "--name-only",
  "HEAD",
);

const changedFiles = changedOutput
  ? changedOutput.split("\n")
  : [];

const unexpectedFiles = changedFiles.filter(
  (file) => !allowedFiles.has(file),
);

if (unexpectedFiles.length > 0) {
  throw new Error(
    [
      "Unexpected modified files:",
      ...unexpectedFiles.map(
        (file) => `  ${file}`,
      ),
    ].join("\n"),
  );
}

for (const file of versionFiles) {
  if (!changedFiles.includes(file)) {
    throw new Error(
      `Expected version file ${file} has not changed.`,
    );
  }
}

const untrackedFiles = git(
  "ls-files",
  "--others",
  "--exclude-standard",
);

if (untrackedFiles) {
  throw new Error(
    `Unexpected untracked files:\n${untrackedFiles}`,
  );
}

console.log(
  `Release ${version} verified successfully.`,
);