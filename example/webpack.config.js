var path = require('path')

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/index.js')
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader?stage=0']}
        ]
    }
}
