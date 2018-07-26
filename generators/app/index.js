"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BaseGenerator_1 = require("../../src/generator/BaseGenerator");
class AppGenerator extends BaseGenerator_1.default {
    constructor(args, opts) {
        super(args, opts);
    }
    prompting() {
        //noinspection JSIgnoredPromiseFromCall
        return super._prompting();
    }
    writing() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("_writing").call(this);
            // const source = path.resolve(__dirname, './templates/src');
            // const destination = this.destinationPath('src');
            // this.fs.copy(source, destination);
            // const eConfigContent: any = await request.get(`https://raw.githubusercontent.com/duanguang/generator-react-cli/master/.e-config.js`);
            // this.fs.write(this.destinationPath('.e-config.js'), eConfigContent);
        });
    }
    install() {
        super._install();
    }
    end() {
        super._end();
    }
}
module.exports = AppGenerator;
