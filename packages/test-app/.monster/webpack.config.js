const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env, mode) {


    /**
     * https://webpack.js.org/guides/environment-variables/
     */
    let environment = 'src/environments/environment.ts';
    if (env.environment) {
        environment = `src/environments/environment.${env.environment}.ts`;
    }


    /**
     * https://webpack.js.org/configuration/mode/
     */
    let configMode = 'development';
    if (mode.mode) {
        configMode = mode.mode;
    }


    return {
        mode: configMode,
        entry: './src/index.ts',
        context: path.resolve(__dirname, '../'),
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '../dist')
        },
        optimization: {
            usedExports: true, // used for tree shaking
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: "src/index.html", to: "" },
                    { from: "src/assets", to: "assets" }
                ],
            })
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                'module:@monster-js/transformer',
                                'babel-plugin-transform-typescript-metadata',
                                ["@babel/plugin-proposal-decorators", { "legacy": true }]
                            ]
                        }
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                [path.resolve('src/environments/environment')]: path.resolve(environment)
            }
        },
        devServer: {
            static: {
                directory: path.join(__dirname, '../dist'),
            },
            compress: true,
            port: 4000,
            historyApiFallback: {
                index: 'index.html'
            }
        },
        devtool: 'source-map'
    };
}