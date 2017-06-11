"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeEmptyIndicatorFiles_1 = require("./removeEmptyIndicatorFiles");
const copyRecursiveSync_1 = require("./copyRecursiveSync");
const io = {
    removeEmptyIndicatorFiles: removeEmptyIndicatorFiles_1.default,
    copyRecursiveSync: copyRecursiveSync_1.default
};
exports.default = io;
