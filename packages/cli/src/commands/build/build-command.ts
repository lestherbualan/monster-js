import { Command } from "commander";
import { webpack } from "webpack";
import { ObjectInterface } from "../../interfaces/object.interface";
import { WebpackConfig } from "../../utils/webpack.config";

export function buildCommand(program: Command) {
    program.command("build")
        .description("Build your application")
        .option("--env <value>", "Build the project using specific environment.")
        .option("--mode <value>", "Build the project in 'development', 'production', or 'none' mode. See https://webpack.js.org/configuration/mode/ for more info about the different modes", 'development')
        .option("--output <value>", "The directory where it should output the bundles, assets and other files.", 'dist')
        .action((options: ObjectInterface) => {
            const env = options.env;
            const mode = options.mode;
            const config = WebpackConfig({ environment: env, mode }, { output:  options.output });
            const compiler = webpack(config);
            compiler.run((err, res) => {
                if (err) {
                    console.error(err);
                }
            });
        });
}