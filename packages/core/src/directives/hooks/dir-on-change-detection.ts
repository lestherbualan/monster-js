import { onChangeDetection } from "../../hooks/on-change-detection";
import { DirectiveParam } from "../../interfaces/directive-param.interface";

export function dirOnchangeDetection(param: DirectiveParam, handler: () => void) {
    onChangeDetection(param.context, handler, () => param.element.isConnected);
}