const { readFileSync } = require("fs");

module.exports.fileReader = function(path) {
    return readFileSync(path, 'utf-8');
}
