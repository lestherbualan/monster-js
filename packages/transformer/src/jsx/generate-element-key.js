const nodePath = require('path');
const { fileWriter } = require("../file-writer");
const { fileExistsChecker } = require('../file-exists-checker');

module.exports.generateElementKey = function(path) {
    let addElKey = false;
    let elKey = '';
    const cacheFilePath = nodePath.resolve(process.cwd(), '.monster/cache.json');
    const filePath = path.hub.file.opts.filename;

    if (!fileExistsChecker(cacheFilePath)) {
        fileWriter(cacheFilePath, JSON.stringify({}));
    }

    const contentReader = () => require(cacheFilePath);
    const cacheContent = contentReader();
    const originalCacheName = filePath.replace(process.cwd(), '');

    if (originalCacheName.endsWith('.component.tsx')) {
        const cacheName = originalCacheName
        .replace(/(\.component.tsx)$/, '')
        .replace(/\\/g, '-')
        .replace(/\//g, '-')
        .replace(/\./g, '-');
        if (cacheContent[cacheName] === null || cacheContent[cacheName] === undefined) {
        cacheContent[cacheName] = Object.keys(cacheContent).length;
        fileWriter(cacheFilePath, JSON.stringify(cacheContent));
        }
        addElKey = true;
        elKey = `el${cacheContent[cacheName]}`
    } else {
        addElKey = false;
    }
    return {
        addElKey,
        elKey
    };
}
