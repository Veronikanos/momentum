'use strict';
let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  // mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'bundle.[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      // assetModuleFilename: path.join(
      //   'images',
      //   '[name].[contenthash][ext]'
      // ),
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'src/sounds', to: 'sounds'},
        {from: 'src/utils', to: 'utils'},
      ],
      // patterns: [{from: 'src/utils', to: 'utils'}],
    }),
  ],

  // watch: true,

  // devtool: 'source-map',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {targets: 'defaults'}]],
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      // {
      //   test: /\.mp3$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'assets/sounds/',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.mp3$/,
        include: path.resolve(__dirname, 'src', 'sounds'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/sounds/',
            },
          },
        ],
      },
    ],

    //   test: /\.(png|jpg|jpeg|gif)$/i,
    //   type: 'asset/resource',
    // },
    // +       {
    // +         test: /\.svg$/,
    // +         type: 'asset/resource',
    // +         generator: {
    // +           filename: path.join('icons', '[name].[contenthash][ext]'),
    // +         },
    // +       },
  },
};
