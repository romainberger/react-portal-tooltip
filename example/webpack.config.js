var path = require('path'),
    webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

var config = {
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader?stage=0']}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output:{
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
  ],
}

if (NODE_ENV === "development") {
  config.entry.push('webpack-dev-server/client?http://0.0.0.0:3000')
  config.devtool = "inline-source-map"

  config.plugins = [
    new webpack.NoErrorsPlugin()
  ]
}

module.exports = config
