import { onDestroy } from "../../../public_apis";
import { DirectiveParam } from "../interfaces/directive-params.interface";

export const dirOnDestroy = (param: DirectiveParam, handler: () => void) => onDestroy(param.context, handler, () => param.element.isConnected);