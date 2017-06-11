import BaseGenerator from '../../src/generator/BaseGenerator';
import * as path from 'path';

class TemplateGenerator extends BaseGenerator {

    public constructor(args, opts) {
        super(args, opts);
    }

    public prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'templateName',
                required: true,
                message: '请输入模板名'
            } as any
        ]).then((answers) => {
            this.answers = answers;
        });
    }

    public writing() {
        const {answers} = this;
        const sourceTemplate = path.resolve(__dirname, './default');
        const destinationTemplate = this.destinationPath(this.answers.templateName);
        this.fs.copyTpl(sourceTemplate, destinationTemplate, {appName: answers.appName});
    }

    public end() {
        super._end();
    }
}

export = TemplateGenerator;