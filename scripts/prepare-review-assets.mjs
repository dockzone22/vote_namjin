import { copyFile, lstat, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputParent = path.join(root, "dist");
const outputDirectory = path.join(outputParent, "review-site");
const manifestPath = path.join(outputParent, ".review-assets-manifest.json");
const maxAssetBytes = 25 * 1024 * 1024;
const allowedFiles = [
  "index.html",
  "statement.html",
  "styles.css",
  "data.js",
  "app.js",
  "president_assets/jin_nam.jpg",
  "president_assets/261124_입후보소견서.pdf"
];
const verifiedFiles = [];

async function removePreviousOutput() {
  let outputInfo;
  try {
    outputInfo = await lstat(outputDirectory);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  if (outputInfo.isSymbolicLink() || !outputInfo.isDirectory()) {
    throw new Error("Refusing to replace an unexpected review asset output path.");
  }

  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    throw new Error("Review output exists without a valid generated-file manifest.", { cause: error });
  }
  if (manifest.format !== "vote-namjin-review-assets-v1") {
    throw new Error("Review output manifest is not recognized; refusing to remove it.");
  }
  await rm(outputDirectory, { recursive: true });
}

for (const relativePath of allowedFiles) {
  const sourcePath = path.join(root, ...relativePath.split("/"));
  const sourceInfo = await stat(sourcePath);
  if (!sourceInfo.isFile()) {
    throw new Error(`Allowlisted asset is not a file: ${relativePath}`);
  }
  if (sourceInfo.size > maxAssetBytes) {
    throw new Error(
      `Asset exceeds Cloudflare's 25 MiB per-file limit: ${relativePath} (${sourceInfo.size} bytes)`
    );
  }

  if (relativePath.endsWith(".html")) {
    const html = await readFile(sourcePath, "utf8");
    if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*\bnoindex\b[^"']*["']\s*>/i.test(html)) {
      throw new Error(`HTML page is missing a robots noindex directive: ${relativePath}`);
    }
  }

  verifiedFiles.push({ relativePath, sourcePath, size: sourceInfo.size });
}

await removePreviousOutput();
await mkdir(outputDirectory, { recursive: true });

for (const { relativePath, sourcePath, size } of verifiedFiles) {
  const destinationPath = path.join(outputDirectory, ...relativePath.split("/"));
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await copyFile(sourcePath, destinationPath);
  process.stdout.write(`${relativePath}\t${size} bytes\n`);
}

await mkdir(outputParent, { recursive: true });
await writeFile(
  manifestPath,
  JSON.stringify({ format: "vote-namjin-review-assets-v1", files: allowedFiles }, null, 2),
  "utf8"
);
process.stdout.write(`Prepared ${allowedFiles.length} allowlisted files in dist/review-site.\n`);
