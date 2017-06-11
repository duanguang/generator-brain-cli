"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
function get(url) {
    console.log(url);
    return axios_1.default.get(url).then((response) => {
        return response.data;
    });
}
const request = {
    get
};
exports.default = request;
