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
const Generator = require("yeoman-generator");
const index_1 = require("../utils/io/index");
const constants_1 = require("../constants/constants");
const index_2 = require("../utils/validation/index");
const path = require("path");
const index_3 = require("../utils/data/index");
const down_1 = require("../utils/down/down");
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
                name: 'template',
                required: true,
                message: '请选择需要创建的项目',
                choices: ['react', 'vue', 'angular', 'react-mobile'],
                default: 'react'
            },
            {
                type: 'input',
                name: 'projectDesc',
                message: 'Please input project description:'
            },
            {
                type: 'input',
                name: 'projectMain',
                message: 'Main file (index.js):',
                default: 'index.js'
            },
            {
                type: 'input',
                name: 'projectAuthor',
                message: 'Author (other):',
                default: 'other she'
            },
            {
                type: 'list',
                name: 'projectLicense',
                message: 'Please choose license:',
                choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
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
    createVue() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootDir = path.join(process.cwd(), '');
            const template = 'https://github.com:duanguang/vue-template';
            yield down_1.downloadAndGenerate(template, rootDir);
            const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
            const destinationPackageJSON = this.destinationPath('package.json');
            this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
                appName: this.answers.appName,
                projectDesc: this.answers.projectDesc,
                projectMain: this.answers.projectMain,
                projectAuthor: this.answers.projectAuthor,
                projectLicense: this.answers.projectLicense
            });
        });
    }
    createAngular() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootDir = path.join(process.cwd(), '');
            const template = 'http://192.168.1.122:3000:erp-front-project/bang-template';
            yield down_1.downloadAndGenerate(template, rootDir);
            const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
            const destinationPackageJSON = this.destinationPath('package.json');
            this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
                appName: this.answers.appName,
                projectDesc: this.answers.projectDesc,
                projectMain: this.answers.projectMain,
                projectAuthor: this.answers.projectAuthor,
                projectLicense: this.answers.projectLicense
            });
            const sourceAngular = `${rootDir}/.gitkeep-angular.json`;
            const destinationAngularJSON = this.destinationPath('angular.json');
            this.fs.copyTpl(sourceAngular, destinationAngularJSON, { appName: this.answers.appName });
        });
    }
    createReact() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootDir = path.join(process.cwd(), '');
            const template = 'https://github.com:duanguang/react-template';
            yield down_1.downloadAndGenerate(template, rootDir);
            const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
            const destinationPackageJSON = this.destinationPath('package.json');
            this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
                appName: this.answers.appName,
                projectDesc: this.answers.projectDesc,
                projectMain: this.answers.projectMain,
                projectAuthor: this.answers.projectAuthor,
                projectLicense: this.answers.projectLicense
            });
        });
    }
    createReactMobile() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootDir = path.join(process.cwd(), '');
            const template = 'https://github.com:duanguang/react-mobile-template';
            yield down_1.downloadAndGenerate(template, rootDir);
            const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
            const destinationPackageJSON = this.destinationPath('package.json');
            this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
                appName: this.answers.appName,
                projectDesc: this.answers.projectDesc,
                projectMain: this.answers.projectMain,
                projectAuthor: this.answers.projectAuthor,
                projectLicense: this.answers.projectLicense
            });
        });
    }
    _writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const { answers } = this;
            if (answers.template === 'vue') {
                yield this.createVue();
            }
            else if (answers.template === 'angular') {
                yield this.createAngular();
            }
            else if (answers.template === 'react') {
                yield this.createReact();
            }
            else if (answers.template === 'react-mobile') {
                yield this.createReactMobile();
            }
            // const sourcePackageJSON = path.resolve(__dirname, '../../generators/app/templates/package.json');
            // const destinationPackageJSON = this.destinationPath('package.json');
            // this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {appName: answers.appName});
        });
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
