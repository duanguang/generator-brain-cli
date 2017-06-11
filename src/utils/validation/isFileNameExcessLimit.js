"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFileNameExcessLimit(filename) {
    return filename.length > 255;
}
exports.default = isFileNameExcessLimit;
