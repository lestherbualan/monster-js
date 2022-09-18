import { Command, Option } from "commander";
import { resolve } from 'path';
import { webpack } from 'webpack';

export function buildCommand(program: Command) {
    program.command("build")
        .description("Build your application")
        .option("--env <value>", "Build the project using specific environment.", 'dev')
        .addOption(
            new Option("--mode <value>", "This is an option to build the application using different modes. Same as webpack's '--mode' option.")
            .choices(['development', 'production', 'none']).default('development')
        )
        .option("--output <value>", "The directory where it should output the bundles, assets and other files.")
        .action((options: { [key: string]: any; }) => {
            const { env, mode, output } = options;
            const config = require(resolve(process.cwd(), './.monster/webpack.config'))({ environment: env }, { mode });

            if (output) {
                config.output.path = resolve(process.cwd(), output);
            }

            const compiler = webpack(config);
            compiler.hooks.done.tap('test', function(c) {
                console.log(c.toString());
            });
            compiler.run((err, res) => {
                if (err) {
                    console.error(err);
                }
            });
        });
}