import { afterInit } from "../../hooks/after-init";
import { DirectiveParam } from "../../interfaces/directive-param.interface";

export function dirAfterInit(param: DirectiveParam, handler: () => void) {
    afterInit(param.context, handler, () => param.element.isConnected);
}
