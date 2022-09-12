import { DirectiveParam } from "./directive-param.interface";

type FnDirective = (param: DirectiveParam) => void;

export interface FunctionDirective extends FnDirective {
    selector?: string;
}