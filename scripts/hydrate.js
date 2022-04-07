const { renderToString, hydrateDocument } = require('../hydrate');
const domino = require('domino');
const fs = require('fs');

const html = fs.readFileSync('./www/index.html', { encoding: 'utf-8' });

// async function hydrate(html) {
//   const result = await renderToString(html);
//   fs.writeFileSync('./www/index.ssr.html', result.html, { encoding: 'utf-8' });
// }
// hydrate(html);

const document = domino.createDocument(html);

function hydrate(document) {
  hydrateDocument(document, {}).then(() => {
    const hydratedDocument = `<!doctype html> ${document.documentElement.outerHTML}`;
    fs.writeFileSync('./www/index.ssr.html', hydratedDocument, {
      encoding: 'utf-8',
    });
  });
}

hydrate(document);
