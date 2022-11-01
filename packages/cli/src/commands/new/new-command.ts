import { ncp } from "ncp";
import { resolve } from "path";
import { ObjectInterface } from "../../interfaces/object.interface";
import { paths } from "../../paths";
import { fileExistsChecker } from "../../utils/file-exists-checker";
import { execSync } from 'child_process';
import { Command } from "commander";
import chalk from 'chalk';

export function newCommand(program: Command) {

    program.command("new <name>")
        .description("Generate a component files")
        .option("-na, --noapplication","create without monster application", false)
        .action((name: string, options: ObjectInterface) => {
            const destination = resolve(process.cwd(), name);
            const folderExists = fileExistsChecker(destination, `Unable to generate new app. The folder named ${name} already exists.`);
            if (folderExists) {
                return;
            }
            ncp(paths.newApp, destination, function(error) {
                if (error) {
                    return console.error(error);
                }
                if(options.noapplication){
                    console.log("\nCreating empty Project ... \n");
                    console.log("generating " + chalk.green("tsconfig.json") +" file ... \n");
                    execSync(`cd ${name} && tsc --init`, {stdio: 'inherit'});
                    console.log('\n');
                    console.log("generating " + chalk.green("package.json") +" file ... \n");
                    execSync(`cd ${name} && npm init --yes`, {stdio: 'inherit'});

                    console.log("\n generating " + chalk.green(".gitignore") +" file ...");
                    execSync(`cd ${name} && echo "" >.gitignore`, {stdio: 'inherit'});

                    console.log(chalk.green("Done!"));
                    
                }else{
                    console.log("Installing packages ...");
                    execSync(`cd ${name} && npm install`, {stdio: 'inherit'});
                    console.log(chalk.green("Done!"));
                }
                
            });
        });
}
