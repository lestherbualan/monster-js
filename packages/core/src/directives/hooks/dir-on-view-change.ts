import { onViewChange } from "../../hooks/on-view-change";
import { DirectiveParam } from "../../interfaces/directive-param.interface";

export function dirOnViewChange(param: DirectiveParam, handler: () => void) {
    onViewChange(param.context, handler, () => param.element.isConnected);
}
