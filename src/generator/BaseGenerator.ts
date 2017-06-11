import * as Generator from 'yeoman-generator';
import io from '../utils/io/index';
import {YARN, NPM} from '../constants/constants';
import validation from '../utils/validation/index';
import * as path from 'path';
import data from '../utils/data/index';
import Questions = inquirer.Questions;
import inquirer = require('inquirer');
import Question = inquirer.Question;

export default class BaseGenerator extends Generator {
    protected answers;

    public constructor(args, opts) {
        super(args, opts);
        this.answers = {};
    }

    protected _getDefaultQuestions() {
        return [
            {
                type: 'input',
                name: 'appName',
                required: true,
                message: '请输入项目名称',
                default: this.appname,
                validate: (input: string): string|boolean => {
                    if (!input || !input.length) {
                        return true;
                    }
                    if (validation.isFileNameExcessLimit(input)) {
                        return '项目名称超过限制';
                    }
                    if (validation.isFileNameValid((input))) {
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
                choices: [YARN, NPM],
                default: YARN
            },
        ]
    }

    protected _prompting(questions: Question[] = []) {
        const {stripNullOrUndefinedItem} = data.array;
        return this.prompt(stripNullOrUndefinedItem(
            [
                ...this._getDefaultQuestions(),
                ...questions
            ]
        )).then((answers) => {
            this.answers = answers;
        });
    }

    protected _writing() {
        const {answers} = this;
        const sourcePackageJSON = path.resolve(__dirname, '../../generators/app/templates/package.json');
        const destinationPackageJSON = this.destinationPath('package.json');
        this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {appName: answers.appName});
    }

    protected _install() {
        const compiler = this.answers.compiler || YARN;
        this.installDependencies({
            yarn: compiler === YARN,
            npm: compiler === NPM,
            bower: false
        });
    }

    protected _end() {
        io.removeEmptyIndicatorFiles(this.destinationPath());
    }
}