import { createWatcher } from "../watcher/create-watcher";
import { directive } from "./directive";
import { DirectiveParam } from "./interfaces/directive-params.interface";

export function viewDir(params: DirectiveParam) {
    const { directives, element, context } = params;
    const { model, ref } = directives;

    if (model) {
        const [ modelGetter, modelSetter ] = model.get();
        (element as HTMLInputElement).value = modelGetter();
        element.addEventListener('input', (event: any) => {
            modelSetter(event.target.value);
        });
        createWatcher(params.context, params.element, () => modelGetter(), newVal => {
            (element as HTMLInputElement).value = newVal;
        });
    }

    if (ref) {
        ref.set(element);
    }
}
directive(viewDir, 'view');