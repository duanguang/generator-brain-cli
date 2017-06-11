"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFileNameValid_1 = require("./isFileNameValid");
const isFileNameExcessLimit_1 = require("./isFileNameExcessLimit");
const validation = {
    isFileNameValid: isFileNameValid_1.default,
    isFileNameExcessLimit: isFileNameExcessLimit_1.default
};
exports.default = validation;
