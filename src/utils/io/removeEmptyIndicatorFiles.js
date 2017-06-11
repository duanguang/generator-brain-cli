"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants/constants");
const path = require('path');
const del = require('del');
function removeEmptyIndicatorFiles(rootDirectory) {
    del.sync([path.join(rootDirectory, `**/${constants_1.EMPTY_FOLDER_INDICATOR}`)], { force: true });
}
exports.default = removeEmptyIndicatorFiles;
