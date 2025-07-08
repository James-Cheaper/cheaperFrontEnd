const path = require('path');
const fse = require('fs-extra');

const srcIcons = path.join(__dirname, '../public/icons');
const destIcons = path.join(__dirname, '../build/icons');

fse.copy(srcIcons, destIcons)
  .then(() => {})
  .catch(() => {});
