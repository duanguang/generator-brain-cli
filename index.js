"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./src/constants/constants");
const yeomanEnvironment = require('yeoman-environment');
const LegionAppGenerator = require('./generators/app/index');
const LegionTemplateGenerator = require('./generators/template/index');
function YoLegion(type, extraWrites) {
    const env = yeomanEnvironment.createEnv();
    if (type === constants_1.INIT_TYPE) {
        env.registerStub(LegionAppGenerator, 'brain:app');
        env.run('brain:app', { extraWrites });
    }
    else if (type === constants_1.TEMPLATE_TYPE) {
        env.registerStub(LegionTemplateGenerator, 'brain:tpl');
        env.run('brain:tpl', { extraWrites });
    }
}
exports.default = YoLegion;
