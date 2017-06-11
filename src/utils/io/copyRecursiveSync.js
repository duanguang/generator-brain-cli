"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
function copyRecursiveSync(src, dest, options = {}) {
    const { ignoreFile, ignoreDirectory } = options;
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        if (!ignoreDirectory) {
            try {
                fs.mkdirSync(dest);
                options.directoryCreatedCallback && options.directoryCreatedCallback(dest);
            }
            catch (e) {
                if (e.code === `EEXIST`) {
                    options.directoryExistCallback && options.directoryExistCallback(dest);
                }
            }
        }
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), options);
        });
    }
    else {
        if (!ignoreFile) {
            try {
                fs.linkSync(src, dest);
                options.fileCreatedCallback && options.fileCreatedCallback(dest);
            }
            catch (e) {
                if (e.code === `EEXIST`) {
                    options.fileExistCallback && options.fileExistCallback(dest);
                }
            }
        }
    }
}
exports.default = copyRecursiveSync;
