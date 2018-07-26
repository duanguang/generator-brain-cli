import BaseGenerator from '../../src/generator/BaseGenerator';
declare class TemplateGenerator extends BaseGenerator {
    constructor(args: any, opts: any);
    prompting(): Promise<void>;
    writing(): void;
    end(): void;
}
export = TemplateGenerator;
