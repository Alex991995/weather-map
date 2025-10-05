const path = require('path');
const express = require('express');
const port = 4200;
const dirname = __dirname.split('/')
dirname.pop()
const rootDir = path.join(dirname.join('/'), 'dist/weather-map/browser');
const locales = ['en', 'ru'];
const defaultLocale = 'en';
const server = express();

server.use(express.static(rootDir));

locales.forEach((locale) => {
  server.get(`/${locale}/*`, (req, res) => {
    res.sendFile(
      path.resolve(rootDir, locale, 'index.html')
    );
  });
});

server.get('/', (req, res) =>
  res.redirect(`/${defaultLocale}/`)
);
server.listen(port, () =>

  console.log(`App running at port ${port}…`)
);