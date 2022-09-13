import { ncp } from 'ncp';
import { Command } from "commander";
import { resolve } from 'path';
import { fileExistsChecker } from "../utils/file-exists-checker";
import { logError } from "../utils/log-error";
import { paths } from '../utils/paths';
import { execSync } from 'child_process';

export function newCommand(program: Command) {
    program.command("new <name>")
        .description("Generate a component files")
        .action((name: string, options: { [key: string]: any }) => {
            const destination = resolve(process.cwd(), name);
            const folderExists = fileExistsChecker(destination);
            if (folderExists) {
                logError(`Unable to generate new app. The folder named ${name} already exists.`);
                return;
            }
            ncp(paths.NEW_APP, destination, function(error) {
                if (error) {
                    return console.error(error);
                }

                console.log("Installing packages ...");
                execSync(`cd ${name} && npm install`, {stdio: 'inherit'});
                console.log("Done");
            });
        });
}