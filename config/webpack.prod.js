const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');

const ROOT_PATH = path.resolve(__dirname, '..');
const resolve = p => path.resolve(ROOT_PATH, p);

const config = {
  context: resolve('src'),

  entry: ['babel-polyfill', './index.js'],

  devtool: 'cheap-module-source-map',

  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(ROOT_PATH, 'dist/prod'),
    publicPath: process.env.PREFIX ? process.env.PREFIX : '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: false,
                camelCase: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader' },
          ],
        }),
      },
      {
        test: /\.svg$/,
        use: ['svg-url-loader'],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/font-woff2',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 65000,
              mimetype: 'application/vnd.ms-fontobject',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: [resolve('src'), resolve('node_modules')],
  },

  plugins: [
    new CleanPlugin(['dist/prod'], {
      root: ROOT_PATH,
      verbose: true,
    }),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        TITLE: JSON.stringify(process.env.TITLE),
        APIDOC_HOST: '"' +
          (process.env.APIDOC_HOST
            ? process.env.APIDOC_HOST
            : 'https://api.apibuilder.io') +
          '"',
        /* APIDOC_HOST: '""',*/
      },
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      children: false,
      minChunk: 2,
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),
    new UglifyJSPlugin({
      mangle: true,
      compress: {
        warnings: false,
      },
      sourceMap: true,
      comments: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(ROOT_PATH, 'src/index.html.ejs'),
      title: process.env.TITLE ? process.env.TITLE : 'APIDOC',
      favicon: 'favicon.ico',
    }),
  ],
};

// Only deploy if required
if (process.env.DEPLOY) {
  config.plugins.push(
    new S3Plugin({
      // s3Options are required
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-west-2',
      },
      s3UploadOptions: {
        Bucket: process.env.APIDOC_S3_BUCKET
          ? process.env.APIDOC_S3_BUCKET
          : 'apidoc.me',
      },
    })
  );
}

module.exports = env => config;
