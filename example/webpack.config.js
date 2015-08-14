var path = require('path'),
    webpack = require('webpack')

module.exports = {
    entry: [
        path.join(__dirname, 'src/index.js'),
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server'
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
