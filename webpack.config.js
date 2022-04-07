const path = require('path');

module.exports = {
  entry: './app/index.js',
  mode: 'production',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './www/build/'),
  },
};
