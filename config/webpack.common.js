const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {
    return {
        devtool: 'eval',
        entry: {
            bundle: helpers.root('src', 'app', 'index'),
            vendor: ["semantic-ui-react"]
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
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.js",
                minChunks: ({resource}) => {
                    return /node_modules/.test(resource)
                },
            }),

        ]
    }
};