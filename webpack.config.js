const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./src/index.js'],
    devServer: {port: 9999},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};

/*example
entry: ['@babel/polyfill', ...]
...
module: {
        rules: [
            {
                test: /\.js?$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
*/