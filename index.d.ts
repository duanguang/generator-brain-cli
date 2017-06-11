import { GeneratorType } from './src/constants/constants';
export interface IExtraWrite {
    absolutePath: string;
    relativePath: string;
}
export default function YoLegion(type: GeneratorType, extraWrites?: IExtraWrite[]): void;
