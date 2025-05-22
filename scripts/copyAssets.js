const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const srcIcons = path.join(__dirname, '../public/icons');
const destIcons = path.join(__dirname, '../build/icons');

fse.copy(srcIcons, destIcons)
  .then(() => console.log('✅ Copied icons to build/icons'))
  .catch((err) => console.error('❌ Failed to copy icons:', err));
