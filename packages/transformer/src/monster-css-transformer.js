const path = require('path');
const { fileExistsChecker } = require('./file-exists-checker');
const { fileWriter } = require('./file-writer');
const cssTransformer = require('./css-transformer');

module.exports = function(source) {
    const cacheFilePath = path.resolve(process.cwd(), '.monster/cache.json');

    if (!fileExistsChecker(cacheFilePath)) {
        fileWriter(cacheFilePath, JSON.stringify({}));
    }

    const contentReader = () => require(cacheFilePath);
    const cacheContent = contentReader();
    const originalCacheName = this.resourcePath.replace(process.cwd(), '');

    if (!originalCacheName.endsWith('.component.scss')) {
        return source;
    }

    const cacheName = originalCacheName
        .replace(/(\.component\.css|\.component\.scss)$/, '')
        .replace(/\\/g, '-')
        .replace(/\//g, '-')
        .replace(/\./g, '-');
    if (cacheContent[cacheName] === null || cacheContent[cacheName] === undefined) {
        return source;
    }

    const elCount = cacheContent[cacheName];
    const elKey = `el${elCount}`;
    return cssTransformer(source, elKey);
}