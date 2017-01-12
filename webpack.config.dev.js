const path = require('path');
const webpack = require('webpack');
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
  entry: ['babel-polyfill', path.resolve(ROOT_PATH, 'src')],
  output: {
    publicPath: '/',
    path: path.resolve(ROOT_PATH, 'build.dev'),
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        // FIXME - make config or use static files
        target: 'http://apidoc.movio.co:9001/',
        pathRewrite: { '^/api': '' },
      },
      // This is to support period/dot's in URL params
      '/*.*': {   // Match all URL's with period/dot
        target: 'http://localhost:8080/', // send to webpack dev server
        rewrite: (req) => {
          req.url = 'index.html';  // Send to react app
        },
      },
    },
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot', 
          'babel?cacheDirectory',
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css?sourceMap&-minimize&camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
      }, {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  postcss: (webpack) => {
    return [
      postCSSImport({
        path: ['./src/styles'],
      }),
      postCSSNext({
        features: {
          rem: {
            rootValue: '14px',
          },
        },
      }),
      rucksack(),
      cssnano({
        autoprefixer: false,
        discardComments: {
          removeAll: true,
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true,
      }),
      postCSSReporter(),
    ];
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(ROOT_PATH, 'src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        APIDOC_HOST: '""',
      },
    }),
  ],
};
