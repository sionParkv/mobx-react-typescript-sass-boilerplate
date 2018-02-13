const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = 'production';

module.exports = function () {
    return webpackMerge(commonConfig({
        ENV: ENV
    }), {
        entry: {
            entry: helpers.root('src', 'app', 'index'),
            vendor: [ "semantic-ui-react" ] // must add these here bc of lazy loading w/ dynamic imports
        },
        output: {
            path: helpers.root('dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.js",
                minChunks: ({resource}) => {
                    return /node_modules/.test(resource)
                },
            }),
        ]
    });
};