"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stripNullOrUndefinedItem(arr) {
    return arr.filter((item) => {
        return item != null && item != undefined;
    });
}
exports.stripNullOrUndefinedItem = stripNullOrUndefinedItem;
const array = {
    stripNullOrUndefinedItem
};
exports.default = array;
