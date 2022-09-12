import { ComponentInstance } from "./component-instance.interface";

type FnPipe = (text: string, args?: any[], ctx?: ComponentInstance) => any;

export interface FunctionPipe extends FnPipe {
    selector?: string;
}

