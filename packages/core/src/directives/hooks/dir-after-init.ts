import { afterInit } from "../../../public_apis";
import { DirectiveParam } from "../interfaces/directive-params.interface";

export const dirAfterInit = (param: DirectiveParam, handler: () => void) => afterInit(param.context, handler, () => param.element.isConnected);