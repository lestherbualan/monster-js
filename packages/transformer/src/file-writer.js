const { writeFileSync, mkdirSync } = require("fs");
const { dirname } = require("path");

module.exports.fileWriter = function(path, contents) {
    mkdirSync(dirname(path), { recursive: true});
    writeFileSync(path, contents);
}