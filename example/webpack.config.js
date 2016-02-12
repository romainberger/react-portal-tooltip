var path = require('path'),
    webpack = require('webpack')

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
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?stage=0']}
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
    })
  ],
}

if (!process.env.BUILD) {
  config.entry.push('webpack-dev-server/client?http://0.0.0.0:3000')
  config.entry.push('webpack/hot/only-dev-server')

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

module.exports = config
