import {GeneratorType, INIT_TYPE, TEMPLATE_TYPE} from './src/constants/constants';
const yeomanEnvironment = require('yeoman-environment');
const LegionAppGenerator = require('./generators/app/index');
const LegionTemplateGenerator = require('./generators/template/index');

export interface IExtraWrite {
    absolutePath: string;
    relativePath: string
}

export default function YoLegion(type: GeneratorType, extraWrites?: IExtraWrite[]) {
    const env = yeomanEnvironment.createEnv();
    if (type === INIT_TYPE) {
        env.registerStub(LegionAppGenerator, 'brain:app');
        env.run('brain:app', {extraWrites});
    }
    else if (type === TEMPLATE_TYPE) {
        env.registerStub(LegionTemplateGenerator, 'brain:tpl');
        env.run('brain:tpl', {extraWrites});
    }
}