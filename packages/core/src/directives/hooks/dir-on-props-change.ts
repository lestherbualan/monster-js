import { onPropsChange } from "../../hooks/on-props-change";
import { CustomObject } from "../../interfaces/custom-object.interface";
import { DirectiveParam } from "../../interfaces/directive-param.interface";

export function dirOnPropsChange<T = CustomObject>(param: DirectiveParam, handler: (props?: T) => void) {
    onPropsChange(param.context, handler, () => param.element.isConnected);
}
