const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = 'production';

module.exports = function () {
    return webpackMerge(commonConfig({
        ENV: ENV
    }), {
        output: {
            path: helpers.root('dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new BundleAnalyzerPlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
        ]
    });
};