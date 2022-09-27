import { onChangeDetection } from "../../../public_apis";
import { DirectiveParam } from "../interfaces/directive-params.interface";

export const dirOnchangeDetection = (param: DirectiveParam, handler: () => void) => onChangeDetection(param.context, handler, () => param.element.isConnected);