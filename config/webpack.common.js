const webpack = require('webpack');
const helpers = require('./helpers');
const Visualizer = require('webpack-visualizer-plugin');


module.exports = function (options) {
    return {
        devtool: 'eval',
        entry: {
            entry: [
                helpers.root('src', 'app', 'index')
            ],
        },
        resolve: {
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
            new Visualizer(),
            //3rd Party Libraries
            new webpack.ProvidePlugin({}),
            new webpack.DefinePlugin({
                'Settings': {
                    'NODE_ENV': JSON.stringify(options.ENV)
                }
            }),
        ]
    }
};