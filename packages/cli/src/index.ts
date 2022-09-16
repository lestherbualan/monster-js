#! /usr/bin/env node
import { Command } from "commander";
import packageJson from '../package.json';
import { buildCommand } from "./commands/build.command";
import { docsCommand } from "./commands/docs.command";
import { newCommand } from "./commands/new.command";
import { serveCommand } from "./commands/serve.command";

const program = new Command();

program.name('MonsterJS Cli')
    .description('A command-line interface to initialize, develop, scaffold, and maintain MonsterJS applications.')
    .version(packageJson.version);

docsCommand(program);
newCommand(program);
serveCommand(program);
buildCommand(program);

program.parse();