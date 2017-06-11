"use strict";
const BaseGenerator_1 = require("../../src/generator/BaseGenerator");
const path = require("path");
class TemplateGenerator extends BaseGenerator_1.default {
    constructor(args, opts) {
        super(args, opts);
    }
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'templateName',
                required: true,
                message: '请输入模板名'
            }
        ]).then((answers) => {
            this.answers = answers;
        });
    }
    writing() {
        const { answers } = this;
        const sourceTemplate = path.resolve(__dirname, './default');
        const destinationTemplate = this.destinationPath(this.answers.templateName);
        this.fs.copyTpl(sourceTemplate, destinationTemplate, { appName: answers.appName });
    }
    end() {
        super._end();
    }
}
module.exports = TemplateGenerator;
