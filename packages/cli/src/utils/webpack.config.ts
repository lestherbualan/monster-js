import CopyWebpackPlugin from 'copy-webpack-plugin';
const path = require('path');

interface WebpackConfigArgsInterface {
    output?: string;
}

const DEFAULT_OUTPUT = 'dist';

export const WebpackConfig = (env: any, args: WebpackConfigArgsInterface = {}) => {


    let environment: string = 'src/environments/environment.ts';
    if (env.environment) {
        environment = `src/environments/environment.${env.environment}.ts`;
    }


    return {
        mode: env.mode, // development | production | none | defaults to development
        entry: {
            index: './src/index.ts',
            polyfill: './src/polyfill.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(process.cwd(), args.output || DEFAULT_OUTPUT),
            clean: true
        },
        optimization: {
            usedExports: true,
        },
        devServer: {
            static: './src',
            host: 'localhost',
            historyApiFallback: {
                index: 'index.html'
            }
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
                    test: /(\.scss|\.sass)$/i,
                    use: [
                        require.resolve('style-loader'),
                        require.resolve('css-loader'),
                        require.resolve('@monster-js/transformer/css'),
                        require.resolve('sass-loader'),
                    ],
                    include: [path.resolve(process.cwd(), 'src')],
                    exclude: [path.resolve(process.cwd(), 'src/assets')]
                },
                {
                    test: /\.(ts|tsx)$/i,
                    use: {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [
                                require.resolve("@babel/preset-typescript")
                            ],
                            plugins: [
                                require.resolve("babel-plugin-transform-typescript-metadata"),
                                require.resolve("@monster-js/transformer/jsx"),
                                [require.resolve("@babel/plugin-proposal-decorators"), { "legacy": true }],
                                require.resolve("@babel/plugin-proposal-class-properties"),
                            ]
                        }
                    }
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|jpeg|ico)$/i,
                    type: 'asset',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                [path.resolve('src/environments/environment')]: path.resolve(environment)
            }
        },
        devtool: 'source-map'
    }
};
