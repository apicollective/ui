module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['./src/styles'],
    }),
    require('postcss-cssnext')({
      features: {
        rem: {
          rootValue: '14px',
        },
      },
    }),
    require('rucksack-css'),
    require('cssnano')({
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
    require('postcss-reporter'),
  ],
};
