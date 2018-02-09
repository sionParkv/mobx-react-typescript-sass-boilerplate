const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = 'local';

module.exports = function() {
    return webpackMerge(commonConfig({
        ENV: ENV
    }), {
        output: {
            path: helpers.root('dist'),
            filename: 'bundle.js',
            publicPath: '/dist/'
        },

        plugins: [
            new webpack.LoaderOptionsPlugin({
                debug: true,
                options: {}
            })
        ],

        devServer: {
            port: 3000,
            host: '127.0.0.1',
            historyApiFallback: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
            stats: 'minimal',
            watchOptions: {
                // aggregateTimeout: 300,
                // poll: 1000,
                ignored: /node_modules/
            }
        }
    })
};

