import { onViewChange } from "../../../public_apis";
import { DirectiveParam } from "../interfaces/directive-params.interface";

export const dirOnViewChange = (param: DirectiveParam, handler: () => void) => onViewChange(param.context, handler, () => param.element.isConnected);