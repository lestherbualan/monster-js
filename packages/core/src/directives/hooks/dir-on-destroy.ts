import { onDestroy } from "../../hooks/on-destroy";
import { DirectiveParam } from "../../interfaces/directive-param.interface";

export function dirOnDestroy(param: DirectiveParam, handler: () => void) {
    onDestroy(param.context, handler, () => param.element.isConnected);
}