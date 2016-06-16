const path = require('path');
const webpack = require('webpack');
const CarteBlanche = require('carte-blanche');
const ReactPlugin = require('carte-blanche-react-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCSS plugins
const postCSSImport = require('postcss-import');
const postCSSNext = require('postcss-cssnext');
const postCSSReporter = require('postcss-reporter');
const rucksack = require('rucksack-css');
const cssnano = require('cssnano');

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  debug: true,
  entry: [path.resolve(ROOT_PATH, 'src')],
  output: {
    publicPath: '/',
    path: path.resolve(ROOT_PATH, 'build.dev'),
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      },{
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css?sourceMap&-minimize&camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
      }, {
        test: /\.json$/,
        loader: 'json',
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: (webpack) => {
    return [
      postCSSImport({
        addDependencyTo: webpack,
        path: ['./src/styles']
      }),
      postCSSNext(),
      rucksack(),
      cssnano({
        autoprefixer: false,
        discardComments: {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true
      }),
      postCSSReporter(),
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(ROOT_PATH, 'src/index.html'),
    }),
    new CarteBlanche({
      componentRoot: 'src',
      plugins: [
        new ReactPlugin(),
      ]
    })
  ],
};
