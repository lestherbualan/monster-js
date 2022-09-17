import { basename, resolve } from 'path';
import { camelToKebab } from '../../utils/camel-to-kebab';
import { fileExistsChecker } from '../../utils/file-exists-checker';
import { kebabToCamelCase } from '../../utils/kebab-to-camel-case';
import { logCreate } from '../../utils/log-create';
import { logError } from '../../utils/log-error';
import { writeFile } from '../../utils/write-file';

const componentData = `import { component } from '@monster-js/core';

function <functionName>() {
    return <h1><functionName> component</h1>
}

export default component(<functionName>, '<componentSelector>');
`;

const componentTestData = `import { createComponentTester } from '@monster-js/tester';
import <functionName> from './<importPath>';

describe('<describeName>', function() {

    const { render } = createComponentTester(<functionName>);

    it('should render the component', function() {
        const { component } = render();
        expect(component).toBeTruthy();
    });

});
`;

export function generateComponentTest(name: string) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), 'src/app', name);
    const fullTestPath = resolve(fullDirPath, `${baseName}.spec.ts`)


    // check if files don't exists
    // if yes, then throw an error
    if (fileExistsChecker(fullTestPath)) {
        return logError(`Unable to create new file. ${fullTestPath} file already exists.`);
    }


    // if not, create the files
    const camelCaseName = kebabToCamelCase(baseName);
    const test = componentTestData
        .replace(/<functionName>/g, camelCaseName)
        .replace(/<importPath>/g, camelToKebab(baseName))
        .replace(/<describeName>/g, baseName);


    writeFile(fullTestPath, test);
    logCreate(fullTestPath);
}

export function generateFunctionComponent(name: string) {
    const baseName = basename(name);
    const fullDirPath = resolve(process.cwd(), 'src/app', name);
    const fullLogicPath = resolve(fullDirPath, `${baseName}.tsx`)


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
        .replace(/<functionName>/g, camelCaseName)
        .replace(/<componentSelector>/g, 'app-' + camelToKebab(baseName));


    writeFile(fullLogicPath, writeData);
    logCreate(fullLogicPath);
}

export function generateComponent(name: string, options: { [key: string]: any; }) {
    generateFunctionComponent(name);
    if (!options.noTest) {
        generateComponentTest(name);
    }
}