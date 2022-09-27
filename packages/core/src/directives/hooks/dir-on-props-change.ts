import { onPropsChange } from "../../../public_apis";
import { DirectiveParam } from "../interfaces/directive-params.interface";

export const dirOnPropsChange = <T = { [key: string]: any; }>(param: DirectiveParam, handler: (props?: T) => void) => onPropsChange(param.context, handler, () => param.element.isConnected);