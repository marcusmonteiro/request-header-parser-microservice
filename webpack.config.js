var webpack = require('webpack')
var path = require('path')
var nodeExternals = require('webpack-node-externals')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  bail: true,
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/'
  },
  target: 'node',
  node: {
    __dirname: false
  },
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
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: 'public'
      }
    ])
  ]
}
