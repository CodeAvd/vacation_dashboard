import { statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const thresholdKb = Number(process.env.BUNDLE_SIZE_THRESHOLD_KB || 350);
const manifestPath = join(process.cwd(), '.next', 'build-manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const assets = [...(manifest.rootMainFiles || []), ...(manifest.polyfillFiles || [])];
const jsAssets = assets.filter((asset) => asset.endsWith('.js'));

const totalBytes = jsAssets.reduce((sum, assetPath) => sum + statSync(join(process.cwd(), '.next', assetPath)).size, 0);
const totalKb = totalBytes / 1024;

console.log(`Root JS bundle: ${totalKb.toFixed(1)} KiB (threshold ${thresholdKb} KiB)`);

if (totalKb > thresholdKb) {
  console.error(`Bundle budget exceeded by ${(totalKb - thresholdKb).toFixed(1)} KiB.`);
  process.exit(1);
}
