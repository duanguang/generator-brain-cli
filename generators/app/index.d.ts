import BaseGenerator from '../../src/generator/BaseGenerator';
declare class AppGenerator extends BaseGenerator {
    constructor(args: any, opts: any);
    prompting(): Promise<void>;
    writing(): Promise<void>;
    install(): void;
    end(): void;
}
export = AppGenerator;
