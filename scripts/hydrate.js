const { renderToString, hydrateDocument } = require('../hydrate');
const fs = require('fs');

const htmlFiles = ['./www/index.html', './www/app.html'];

async function hydrate(file) {
  const html = fs.readFileSync(file, { encoding: 'utf-8' });
  const result = await renderToString(html);
  fs.writeFileSync(file, result.html, { encoding: 'utf-8' });
}

htmlFiles.forEach(file => hydrate(file));
