import { watch } from "../utils/watch";
import { Directive } from "./directive.decorator";
import { DirectiveArgInterface } from "../interfaces/directive-arg.interface";

@Directive('v')
export class ViewDirective {

    public $ref = (param: DirectiveArgInterface) => param.directive.set!(param.element);

    private updateClassList = (value: {[key: string]: any}, element: HTMLElement) => Object.keys(value).forEach(key => !!value[key]
        ? element.classList.add(key)
        : element.classList.remove(key));

    public $class(param: DirectiveArgInterface) {
        const valueCaller = param.directive.get;
        const value = valueCaller();

        watch(
            () => {
                const newVal = valueCaller();
                return Object.keys(newVal).map(key => newVal[key]).join();
            },
            param.element,
            param.component,
            () => this.updateClassList(valueCaller(), param.element)
        );

        this.updateClassList(value, param.element);
    }
}