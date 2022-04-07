const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  mode: 'production',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './www/build/'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './app/app.html', to: '../app.html' }],
    }),
  ],
};
