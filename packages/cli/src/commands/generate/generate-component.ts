import { basename, resolve } from 'path';
import { camelToKebab } from '../../utils/camel-to-kebab';
import { fileExistsChecker } from '../../utils/file-exists-checker';
import { kebabToCamelCase } from '../../utils/kebab-to-camel-case';
import { logCreate } from '../../utils/log-create';
import { logError } from '../../utils/log-error';
import { writeFile } from '../../utils/write-file';

const componentData = `import './<styleName>.component.scss';
import { component } from '@monster-js/core';

export function <functionName>() {
    return <h1><functionName> component</h1>
}

component(<functionName>, '<componentSelector>');
`;

export function generateComponentStyle(name: string) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), 'src/app', name);
    const fullTestPath = resolve(fullDirPath, `${baseName}.component.scss`)


    // check if files don't exists
    // if yes, then throw an error
    if (fileExistsChecker(fullTestPath)) {
        return logError(`Unable to create new file. ${fullTestPath} file already exists.`);
    }

    writeFile(fullTestPath, '');
    logCreate(fullTestPath);
}

export function generateFunctionComponent(name: string) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), 'src/app', name);
    const fullLogicPath = resolve(fullDirPath, `${baseName}.component.tsx`);


    /**
     * check if files don't exists
     * if file exists, then throw an error
     */
    if (fileExistsChecker(fullLogicPath)) {
        return logError(`Unable to create new file. ${fullLogicPath} file already exists.`);
    }


    /**
     * if not, create the files
     */
    const camelCaseName = kebabToCamelCase(baseName);
    const writeData = componentData
        .replace(/<styleName>/g, baseName)
        .replace(/<functionName>/g, camelCaseName)
        .replace(/<componentSelector>/g, 'app-' + camelToKebab(baseName));


    writeFile(fullLogicPath, writeData);
    logCreate(fullLogicPath);
}

export function generateComponent(name: string, options: { [key: string]: any; }) {
    generateFunctionComponent(name);
    generateComponentStyle(name);
}