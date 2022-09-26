import { Command, Option } from "commander";
import { rollup, watch } from 'rollup';
import path from 'path';
import loadConfigFile from 'rollup/loadConfigFile';

export function serveCommand(program: Command) {
    program.command("serve")
        .description("Build your application")
        .option("--env <value>", "Serve the project using the specified environment.", '')
        .addOption(
            new Option("--mode <value>", "This is an option to serve the application using different modes. Same as webpack's '--mode' option.")
            .choices(['development', 'production']).default('development')
        )
        .option("--port <value>", "Set the port for the local development server")
        .option("--open", "Opens a browser when local development server is ready.")
        .action((options: { [key: string]: any; }) => {

            const { env, port, mode, open } = options;

            process.argv.push('--config-dev-server');
            process.argv.push(`--config-env-${env}`);

            if (port) {
                process.argv.push(`--config-port-${port}`);
            }

            if (mode === 'production') {
                process.argv.push('--config-prod');
            }

            if (open) {
                process.argv.push('--config-open-browser');
            }

            loadConfigFile(path.resolve(process.cwd(), '.config/rollup.config.mjs'), { format: 'es' }).then(async ({ options, warnings }) => {

                if (warnings.count > 0) {
                    console.log(`We currently have ${warnings.count} warnings`);
                }

                // This prints all deferred warnings
                warnings.flush();

                for (const optionsObj of options) {
                    const bundle = await rollup(optionsObj);
                    await Promise.all(optionsObj.output.map(bundle.write));
                }

                // You can also pass this directly to "rollup.watch"
                watch(options);
            });

        });
}