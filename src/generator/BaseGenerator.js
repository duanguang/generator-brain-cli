"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const index_1 = require("../utils/io/index");
const constants_1 = require("../constants/constants");
const index_2 = require("../utils/validation/index");
const path = require("path");
const index_3 = require("../utils/data/index");
class BaseGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.answers = {};
    }
    _getDefaultQuestions() {
        return [
            {
                type: 'input',
                name: 'appName',
                required: true,
                message: '请输入项目名称',
                default: this.appname,
                validate: (input) => {
                    if (!input || !input.length) {
                        return true;
                    }
                    if (index_2.default.isFileNameExcessLimit(input)) {
                        return '项目名称超过限制';
                    }
                    if (index_2.default.isFileNameValid((input))) {
                        return '文件命名不能包含\/:*?<>|';
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'compiler',
                required: true,
                message: '请选择包安装工具',
                choices: [constants_1.YARN, constants_1.NPM],
                default: constants_1.YARN
            },
        ];
    }
    _prompting(questions = []) {
        const { stripNullOrUndefinedItem } = index_3.default.array;
        return this.prompt(stripNullOrUndefinedItem([
            ...this._getDefaultQuestions(),
            ...questions
        ])).then((answers) => {
            this.answers = answers;
        });
    }
    _writing() {
        const { answers } = this;
        const sourcePackageJSON = path.resolve(__dirname, '../../generators/app/templates/package.json');
        const destinationPackageJSON = this.destinationPath('package.json');
        this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, { appName: answers.appName });
    }
    _install() {
        const compiler = this.answers.compiler || constants_1.YARN;
        this.installDependencies({
            yarn: compiler === constants_1.YARN,
            npm: compiler === constants_1.NPM,
            bower: false
        });
    }
    _end() {
        index_1.default.removeEmptyIndicatorFiles(this.destinationPath());
    }
}
exports.default = BaseGenerator;
