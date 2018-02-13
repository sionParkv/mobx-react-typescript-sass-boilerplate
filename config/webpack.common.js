const webpack = require('webpack');
const helpers = require('./helpers');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

var noVisualization = process.env.NODE_ENV === 'production'
    || process.argv.some(arg => arg.indexOf('webpack-dev-server') >= 0);

module.exports = function (options) {
    return {
        devtool: 'eval',
        entry: {
            entry: [
                helpers.root('src', 'app', 'index')
            ],
        },
        resolve: {
            modules: [
                helpers.root('src', 'app'),
                helpers.root('node_modules')
            ],
            extensions: ['.ts', '.js', '.tsx', '.css', '.scss', '.d.ts']
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: helpers.root('tsconfig.json')
                            }
                        },
                    ],
                    include: helpers.root('src')
                },
                {
                    test: /\.s?css$/,
                    use: [
                        "style-loader",
                        "typings-for-css-modules-loader?modules&namedExport&camelCase&sass",
                        "sass-loader?sourceMap"
                    ],
                    include: [
                        helpers.root('src')
                    ]
                },
            ]
        },
        plugins: [
            (!noVisualization ?
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static'
                }) : null),
            new HtmlWebpackPlugin({
                chunks: [], // don't inject chunks
                template: helpers.root('index.html')
            }),
            //3rd Party Libraries
            new webpack.ProvidePlugin({}),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(options.ENV)
                }
            }),

        ]
    }
};