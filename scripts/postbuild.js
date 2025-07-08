/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Fix index.html paths for file-based loading (needed for extensions)
const indexPath = path.join(__dirname, '../build/index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

indexHtml = indexHtml.replace(/\/static\//g, './static/');
indexHtml = indexHtml.replace(/\/favicon\.ico/g, './favicon.ico');
indexHtml = indexHtml.replace(/\/logo\d+\.png/g, (match) => `./${match.substring(1)}`);

fs.writeFileSync(indexPath, indexHtml, 'utf8');

// If manifest is extension, update popup path
const manifestPath = path.join(__dirname, '../build/manifest.json');

if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const isExtension = manifest.manifest_version === 3 && manifest.action;

  if (isExtension) {
    manifest.action.default_popup = './index.html';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Extension manifest updated.');
  } else {
    console.log('PWA manifest detected — no changes needed.');
  }
} else {
  console.warn('No manifest.json found in build — skipping.');
}
