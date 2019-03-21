const path = require('path')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

var config = {
  mode: NODE_ENV,
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    host: "127.0.0.1",
    port: "3000",
    publicPath: "/build/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
  ],
}

// if (NODE_ENV === "development") {
//   config.entry.push('webpack-dev-server/client?http://0.0.0.0:3000')
//   config.devtool = "inline-source-map"

//   config.plugins = [
//     new webpack.NoErrorsPlugin()
//   ]
// }

module.exports = config
