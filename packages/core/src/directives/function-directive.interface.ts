import { DirectiveParam } from "./interfaces/directive-params.interface";

type FunctionDirectiveType = (param: DirectiveParam) => void;

export interface FunctionDirective extends FunctionDirectiveType {
    selector?: string;
}