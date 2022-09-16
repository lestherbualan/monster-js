import { basename, resolve } from "path";
import { fileExistsChecker } from "../../utils/file-exists-checker";
import { kebabToCamelCase } from "../../utils/kebab-to-camel-case";
import { logCreate } from "../../utils/log-create";
import { logError } from "../../utils/log-error";
import { writeFile } from "../../utils/write-file";

const interfaceData = `export interface <interfaceName> {
}`;

export function generateInterface(name: string, options: { [key: string]: any; }) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), name);
    const fullPath = resolve(`${fullDirPath}.interface.ts`)

    // check if files don't exists
    // if yes, then throw an error
    const fileExists = fileExistsChecker(fullPath);
    if (fileExists) {
        return logError(`Unable to create new file. ${fullPath} file already exists.`);
    }

    // if not, create the files
    const camelCaseName = kebabToCamelCase(`-${baseName}`);
    const writeData = interfaceData
        .replace(/<interfaceName>/g, camelCaseName);
    writeFile(fullPath, writeData);
    logCreate(fullPath);
}