import { Command, Option } from "commander";
import { rollup } from 'rollup';
import path from 'path';
import loadConfigFile from 'rollup/loadConfigFile';

export function buildCommand(program: Command) {
    program.command("build")
        .description("Build your application")
        .option("--env <value>", "Build the project using specific environment.", '')
        .addOption(
            new Option("--mode <value>", "This is an option to build the application using different modes. Same as webpack's '--mode' option.")
            .choices(['development', 'production', 'none']).default('development')
        )
        .action((options: { [key: string]: any; }) => {
            const { env, mode } = options;

            process.argv.push(`--config-env-${env}`);

            if (mode === 'production') {
                process.argv.push('--config-prod');
            }

            loadConfigFile(path.resolve(process.cwd(), '.config/rollup.config.mjs'), { format: 'es' }).then(async ({ options, warnings }) => {
                console.log(`We currently have ${warnings.count} warnings`);

                // This prints all deferred warnings
                warnings.flush();

                for (const optionsObj of options) {
                    const bundle = await rollup(optionsObj);
                    await Promise.all(optionsObj.output.map(bundle.write));
                }

                console.log('build done');

                // You can also pass this directly to "rollup.watch"
                // watch(options);
            });
        });
}