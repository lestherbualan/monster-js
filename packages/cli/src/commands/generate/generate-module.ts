import { basename, resolve } from "path";
import { fileExistsChecker } from "../../utils/file-exists-checker";
import { kebabToCamelCase } from "../../utils/kebab-to-camel-case";
import { logCreate } from "../../utils/log-create";
import { logError } from "../../utils/log-error";
import { writeFile } from "../../utils/write-file";

const moduleData = `import { Module } from '@monster-js/core';

export const <moduleName>Module: Module = {
}
`;

export function generateModule(name: string, options: { [key: string]: any; }) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), 'src/app', name);
    const fullPath = resolve(fullDirPath, `${baseName}.module.ts`);

    // check if files don't exists
    // if yes, then throw an error
    if (fileExistsChecker(fullPath)) {
        return logError(`Unable to create new file. ${fullPath} file already exists.`);
    }

    // if not, create the files
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const writeData = moduleData
        .replace(/<moduleName>/g, camelCaseName);

    writeFile(fullPath, writeData);
    logCreate(fullPath);
}