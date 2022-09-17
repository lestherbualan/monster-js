import karma from 'karma';
import { Command } from "commander";
import { resolve } from "path";

const parseConfig = karma.config.parseConfig
const Server = karma.Server

export function testCommand(program: Command) {
    program.command("test")
        .description("Test your application")
        .option("--env <value>", "Test the project using the specified environment.", 'dev')
        .option("--watch", "Runs the test and watch for changes.", false)
        .action((options: { [key: string]: any; }) => {

            const webpackEnvironmentSetter = require(resolve(process.cwd(), './.monster/karma.conf')).webpackEnvironmentSetter;
            webpackEnvironmentSetter(options.env);

            parseConfig(resolve(process.cwd(), './.monster/karma.conf'), { singleRun: !options.watch }, {promiseConfig: true, throwErrors: true})
                .then(karmaConfig => {
                    const server = new Server(karmaConfig, function doneCallback(exitCode) {
                        console.log('Karma has exited with ' + exitCode)
                        process.exit(exitCode)
                    });
                    server.start();
                });
        });
}