import BaseGenerator from '../../src/generator/BaseGenerator';
import * as path from 'path';
import request from '../../src/utils/request';

class AppGenerator extends BaseGenerator {

    public constructor(args, opts) {
        super(args, opts);
    }

    public prompting() {
        //noinspection JSIgnoredPromiseFromCall
        return super._prompting();
    }

    public async writing() {
        await  super._writing();
        // const source = path.resolve(__dirname, './templates/src');
        // const destination = this.destinationPath('src');
        // this.fs.copy(source, destination);

        // const eConfigContent: any = await request.get(`https://raw.githubusercontent.com/duanguang/generator-react-cli/master/.e-config.js`);
        // this.fs.write(this.destinationPath('.e-config.js'), eConfigContent);
    }

    public install() {
        super._install();
    }

    public end() {
        super._end();
    }
}

export = AppGenerator;