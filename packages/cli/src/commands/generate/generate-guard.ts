import { basename, resolve } from "path";
import { fileExistsChecker } from "../../utils/file-exists-checker";
import { kebabToCamelCase } from "../../utils/kebab-to-camel-case";
import { logCreate } from "../../utils/log-create";
import { logError } from "../../utils/log-error";
import { writeFile } from "../../utils/write-file";

const guardData = `export function <gaurdName>Guard(context) {
    return {
        canActivate: function() {
            return true;
        },
        canDeactivate: function() {
            return true;
        }
    };
}`;

export function generateGuard(name: string, options: { [key: string]: any; }) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), 'src/app', name);
    const fullPath = resolve(fullDirPath, `${baseName}.guard.ts`)

    // check if files don't exists
    // if yes, then throw an error
    if (fileExistsChecker(fullPath)) {
        logError(`Unable to create new file. ${fullPath} file already exists.`);
        return;
    }

    // if not, create the files
    const camelCaseName = kebabToCamelCase(`${baseName}`);
    const logic = guardData
        .replace(/<gaurdName>/g, camelCaseName);

    writeFile(fullPath, logic);
    logCreate(fullPath);
}