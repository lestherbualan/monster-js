const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = function(env, mode) {


    /**
     * https://webpack.js.org/guides/environment-variables/
     */
    let environment = './src/environments/environment.ts';
    if (env.environment) {
        environment = `./src/environments/environment.${env.environment}.ts`;
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
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'public')
        },
        optimization: {
            usedExports: true, // used for tree shaking
        },
        plugins: [
            new NormalModuleReplacementPlugin(
                new RegExp(path.resolve(__dirname, 'src/environments/environment.ts')),
                path.resolve(__dirname, environment)
            )
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'node_modules/@monster-js'),
                    ],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                'module:@monster-js/transformer'
                            ]
                        }
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
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