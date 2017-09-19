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
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [
          {
            loader: 'react-hot-loader'
          }, 
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['css-hot-loader', 'style-loader','css-loader']
      }
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
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config
