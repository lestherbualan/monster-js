import { createWatcher } from "../watcher/create-watcher";
import { DirectiveParam } from "./interfaces/directive-params.interface";

export function dirCreateWatcher(param: DirectiveParam, directiveName: string, updateHandler: (newValue?: any) => void) {
    createWatcher(param.context, param.element, () => param.directives[directiveName].get(), updateHandler);
}