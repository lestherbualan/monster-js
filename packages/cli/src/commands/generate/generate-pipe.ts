import { basename, resolve } from "path";
import { fileExistsChecker } from "../../utils/file-exists-checker";
import { kebabToCamelCase } from "../../utils/kebab-to-camel-case";
import { logCreate } from "../../utils/log-create";
import { logError } from "../../utils/log-error";
import { writeFile } from "../../utils/write-file";

const pipeData = `import { pipe } from "@monster-js/core";

export function <pipeName>Pipe(value: any, args: any[]) {
    return value;
}

pipe(<pipeName>Pipe, '<pipeSelector>');`;

export function generatePipe(name: string, options: { [key: string]: any; }) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), 'src/app', name);
    const fullPath = resolve(`${fullDirPath}.pipe.ts`)

    // check if files don't exists
    // if yes, then throw an error
    if (fileExistsChecker(fullPath)) {
        return logError(`Unable to create new file. ${fullPath} file already exists.`);
    }

    // if not, create the files
    const camelCaseName = kebabToCamelCase(baseName);
    const writeData = pipeData
        .replace(/<pipeName>/g, camelCaseName)
        .replace(/<pipeSelector>/g, baseName);

    writeFile(fullPath, writeData);
    logCreate(`${fullPath}`);
}