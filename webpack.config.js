function buildConfig(env) {
  return require(`./config/webpack.${env ? env : 'dev'}.js`)({ env });
}

module.exports = buildConfig;
