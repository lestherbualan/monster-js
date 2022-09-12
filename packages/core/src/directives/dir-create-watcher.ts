import { DirectiveParam } from "../interfaces/directive-param.interface";
import { createWatcher } from "../utils/create-watcher";

export function dirCreateWatcher(param: DirectiveParam, directiveName: string, updateHandler: (newValue?: any) => void) {
    createWatcher(param.context, param.element, () => param.directives[directiveName].get(), updateHandler);
}
