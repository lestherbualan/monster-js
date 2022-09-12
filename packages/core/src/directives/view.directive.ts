import { DirectiveParam } from "../interfaces/directive-param.interface";

export function viewDir(params: DirectiveParam) {
    const { directives, element, context } = params;
    const { model, ref } = directives;

    if (model) {
        const [ modelGetter, modelSetter ] = model.get();
        (element as HTMLInputElement).value = modelGetter();
        element.addEventListener('input', (event: any) => {
            modelSetter(event.target.value);
            context.detectChanges();
        });
    }

    if (ref) {
        ref.set(element);
    }
}
