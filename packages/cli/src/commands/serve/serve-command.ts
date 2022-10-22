import { Command } from "commander";
import { webpack } from "webpack";
import WebpackDevServer from 'webpack-dev-server';
import { ObjectInterface } from "../../interfaces/object.interface";
import { WebpackConfig } from "../../utils/webpack.config";

export function serveCommand(program: Command) {
    program.command("serve")
        .description("Build your application")
        .option("--env <value>", "Serve the project using the specified environment.")
        .option("--mode <value>", "Serve the project in 'development', 'production', or 'none' mode. See https://webpack.js.org/configuration/mode/ for more info about the different modes", 'development')
        .option("--port <value>", "Set the port for the local development server", '4000')
        .option("--open", "Opens a browser when local development server is ready.", false)
        .action((options: ObjectInterface) => {
            const env = options.env;
            const mode = options.mode;
            const config = WebpackConfig({ environment: env, mode });

            const compiler = webpack(config);

            const devServerOptions = {
                ...config.devServer,
                open: options.open,
                port: options.port
            };
            const server = new WebpackDevServer(devServerOptions, compiler);

            const runServer = async () => {
                await server.start();
            };

            runServer();

        });
}
