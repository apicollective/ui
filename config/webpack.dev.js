const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '..');
const resolve = p => path.resolve(ROOT_PATH, p);

module.exports = env => ({
  context: resolve('src'),

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './index.js',
  ],

  devtool: 'cheap-module-eval-source-map',

  output: {
    publicPath: '/',
    path: resolve('dist/dev'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [resolve('src')],
        use: [
          { loader: 'style-loader' },
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin({
      inject: true,
      template: path.resolve(ROOT_PATH, 'src/index.html.ejs'),
      showErrors: true,
      title: process.env.TITLE ? process.env.TITLE : 'APIDOC',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        APIDOC_HOST: '"/api"',
        TITLE: JSON.stringify(process.env.TITLE),
      },
    }),
  ],

  devServer: {
    stats: 'minimal',
    hot: true,
    publicPath: '/',
    port: 8080,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://api.apidoc.me',
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
