var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'build',
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['latest']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
