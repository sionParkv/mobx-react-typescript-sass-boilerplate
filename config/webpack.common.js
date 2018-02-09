const webpack = require('webpack');
const helpers = require('./helpers');

module.exports = function (options) {
    return {
        devtool: 'eval',
        entry: {
            entry: [
                helpers.root('src', 'index')
            ],
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx','.css', '.scss']
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
                        // "to-string-loader",
                        // "css-loader?sourceMap",
                        // "resolve-url-loader",
                        // "sass-loader?sourceMap"
                    ],
                    include: [
                        helpers.root('src')
                    ]
                },
            ]
        },

        plugins: [
            //3rd Party Libraries
            new webpack.ProvidePlugin({}),

            new webpack.DefinePlugin({
                'FitRankings': {
                    'NODE_ENV': JSON.stringify(options.ENV)
                }
            }),
        ]
    }
};