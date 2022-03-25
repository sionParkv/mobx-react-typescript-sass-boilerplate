const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const path = require('path');

const ENV = 'local';

module.exports = function() {
    return webpackMerge(commonConfig({
        ENV,
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
            static: './',
            hot: true,
            host: '127.0.0.1',
            historyApiFallback: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
            watchFiles: [
              'src/**/*',
            ],
        }
    })
};

