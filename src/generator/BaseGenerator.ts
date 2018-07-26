import * as Generator from 'yeoman-generator';
import io from '../utils/io/index';
import {YARN, NPM} from '../constants/constants';
import validation from '../utils/validation/index';
import * as path from 'path';
import data from '../utils/data/index';
import Questions = inquirer.Questions;
import inquirer = require('inquirer');
import Question = inquirer.Question;
import  { downloadAndGenerate } from '../utils/down/down';
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
                name: 'template',
                required: true,
                message: '请选择需要创建的项目',
                choices: ['react', 'vue','angular','react-mobile'],
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

    protected async createVue(){
        const rootDir = path.join(process.cwd(),'');
        const template = 'https://github.com:duanguang/vue-template';
        await downloadAndGenerate(template,rootDir);
        const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
        const destinationPackageJSON = this.destinationPath('package.json');
        this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
            appName: this.answers.appName,
            projectDesc:this.answers.projectDesc,
            projectMain:this.answers.projectMain,
            projectAuthor:this.answers.projectAuthor,
            projectLicense:this.answers.projectLicense
        });
    }
    protected async createAngular(){
        const rootDir = path.join(process.cwd(),'');
        const template = 'http://192.168.1.122:3000:erp-front-project/bang-template';
        await downloadAndGenerate(template,rootDir);
        const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
        const destinationPackageJSON = this.destinationPath('package.json');
        this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
            appName: this.answers.appName,
            projectDesc:this.answers.projectDesc,
            projectMain:this.answers.projectMain,
            projectAuthor:this.answers.projectAuthor,
            projectLicense:this.answers.projectLicense
        });
        const sourceAngular = `${rootDir}/.gitkeep-angular.json`;
        const destinationAngularJSON = this.destinationPath('angular.json');
        this.fs.copyTpl(sourceAngular, destinationAngularJSON, {appName: this.answers.appName});
    }
    protected async createReact(){
        const rootDir = path.join(process.cwd(),'');
        const template = 'https://github.com:duanguang/react-template';
        await downloadAndGenerate(template,rootDir);
        const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
        const destinationPackageJSON = this.destinationPath('package.json');
        this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
            appName: this.answers.appName,
            projectDesc:this.answers.projectDesc,
            projectMain:this.answers.projectMain,
            projectAuthor:this.answers.projectAuthor,
            projectLicense:this.answers.projectLicense
        });
    }
    protected async createReactMobile(){
        const rootDir = path.join(process.cwd(),'');
        const template = 'https://github.com:duanguang/react-mobile-template';
        await downloadAndGenerate(template,rootDir);
        const sourcePackageJSON = `${rootDir}/.gitkeep.json`;
        const destinationPackageJSON = this.destinationPath('package.json');
        this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {
            appName: this.answers.appName,
            projectDesc:this.answers.projectDesc,
            projectMain:this.answers.projectMain,
            projectAuthor:this.answers.projectAuthor,
            projectLicense:this.answers.projectLicense
        });
    } 
    protected async _writing() {
        const {answers} = this;
        if(answers.template==='vue'){
            await  this.createVue();
         }
         else if(answers.template==='angular'){
             await this.createAngular();
         }
         else if(answers.template==='react'){
             await this.createReact();
         }
         else if(answers.template==='react-mobile'){
             await this.createReactMobile();
         }
        // const sourcePackageJSON = path.resolve(__dirname, '../../generators/app/templates/package.json');
        // const destinationPackageJSON = this.destinationPath('package.json');
        // this.fs.copyTpl(sourcePackageJSON, destinationPackageJSON, {appName: answers.appName});
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