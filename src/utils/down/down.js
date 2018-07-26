"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_git_repo_1 = require("./download-git-repo");
const ora = require("ora");
function downloadAndGenerate(template, templateDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora('正在初始化项目').start();
        yield download_git_repo_1.download(template, templateDir, {}, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                yield spinner.stop();
                if (err) {
                    console.log('Failed to download repo ' + template + ': ' + err.message.trim());
                }
                // generate
            });
        });
    });
}
exports.downloadAndGenerate = downloadAndGenerate;
