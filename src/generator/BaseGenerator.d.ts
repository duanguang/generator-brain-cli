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
        default: any;
        validate: (input: string) => string | boolean;
    } | {
        type: string;
        name: string;
        required: boolean;
        message: string;
        choices: string[];
        default: string;
    })[];
    protected _prompting(questions?: Question[]): any;
    protected _writing(): void;
    protected _install(): void;
    protected _end(): void;
}
