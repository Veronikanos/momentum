'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
  // mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.html'),
      filename: 'index.html',
    }),
  ],
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  watch: true,

  devtool: 'source-map',
  module: {},
};
