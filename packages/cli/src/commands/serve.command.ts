import { Command, Option } from "commander";
import { resolve } from 'path';
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export function serveCommand(program: Command) {
    program.command("serve")
        .description("Build your application")
        .option("--env <value>", "Serve the project using the specified environment.", 'dev')
        .addOption(
            new Option("--mode <value>", "This is an option to serve the application using different modes. Same as webpack's '--mode' option.")
            .choices(['development', 'production', 'none']).default('development')
        )
        .option("--port <value>", "Set the port for the local development server")
        .option("--open", "Opens a browser when local development server is ready.")
        .action((options: { [key: string]: any; }) => {
            const { env, mode } = options;
            const config = require(resolve(process.cwd(), './.monster/webpack.config'))({ environment: env }, { mode });

            const compiler = webpack(config);

            const devServerOptions = {
                ...config.devServer,
                open: options.open !== undefined ? options.open : config.devServer.open,
                port: options.port || config.devServer.port
            };
            const server = new WebpackDevServer(devServerOptions, compiler);

            const runServer = async () => {
                await server.start();
            };

            runServer();

        });
}