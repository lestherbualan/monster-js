import { Command } from "commander";
import open from 'open';

export function docsCommand(program: Command) {
    program.command('docs')
        .description('Opens the official MonsterJS documentation.')
        .action(async () => {
            const url = 'https://monster-js.org';
            await open(url);
            console.log(`Documentation url : ${url}`);
        });
}