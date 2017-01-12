const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

// PostCSS plugins
const postCSSImport = require('postcss-import');
const postCSSNext = require('postcss-cssnext');
const postCSSReporter = require('postcss-reporter');
const rucksack = require('rucksack-css');
const cssnano = require('cssnano');
const S3Plugin = require('webpack-s3-plugin');

const ROOT_PATH = path.resolve(__dirname);

const config = {
  debug: true,
  entry: ['babel-polyfill', path.resolve(ROOT_PATH, 'src')],
  output: {
    path: path.resolve(ROOT_PATH, 'build.prod'),
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
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
    new CleanPlugin('build.prod'),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APIDOC_HOST: '"http://apidoc.me"',
        /* APIDOC_HOST: '""',*/
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      children: true,
      minChunks: 2,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(ROOT_PATH, 'src/index.html'),
    }),
  ],
};


// Only deploy if required
if (process.env.DEPLOY) {
  console.log('Deploying to S3');
  config.plugins.push(
    new S3Plugin({
      // s3Options are required
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-west-2',
      },
      s3UploadOptions: {
        Bucket: 'apidoc.me',
      },
    })
  );
}

module.exports = config;
