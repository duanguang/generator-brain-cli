/// <reference types="yeoman-generator" />
/// <reference types="inquirer" />
import * as Generator from 'yeoman-generator';
import inquirer = require('inquirer');
import Question = inquirer.Question;
export default class BaseGenerator extends Generator {
    protected answers: any;
    constructor(args: any, opts: any);
    protected _getDefaultQuestions(): ({
        type: string;
        name: string;
        required: boolean;
        message: string;
        default: string;
        validate: (input: string) => string | boolean;
    } | {
        type: string;
        name: string;
        required: boolean;
        message: string;
        choices: string[];
        default: string;
    })[];
    protected _prompting(questions?: Question[]): Promise<void>;
    protected createVue(): Promise<void>;
    protected createAngular(): Promise<void>;
    protected createReact(): Promise<void>;
    protected createReactMobile(): Promise<void>;
    protected _writing(): Promise<void>;
    protected _install(): void;
    protected _end(): void;
}
