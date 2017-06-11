"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFileNameValid(filename) {
    return /\/|\|<|>|\*|\?/.test(filename);
}
exports.default = isFileNameValid;
