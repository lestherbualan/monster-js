const { existsSync } = require("fs");

module.exports.fileExistsChecker = function(path) {
    if (existsSync(path)) {
        return true;
    }
    return false;
}