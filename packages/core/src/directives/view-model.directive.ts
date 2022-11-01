import { DirectiveArgInterface } from "../interfaces/directive-arg.interface";
import { Directive } from "./directive.decorator";
import { watchDirective } from "./utils/watch-directive";

@Directive('v')
export class ViewModelDirective {

    private selectModel = (param: DirectiveArgInterface) => this.processInputAndSelect(param, 'change');
    private setRadioChecked = (element: Element, newValue: any) => element.getAttribute('value') === newValue
        ? element.setAttribute('checked', '')
        : element.removeAttribute('checked');
    private setCheckboxChecked = (element: Element, value: any) => !!value
        ? element.setAttribute('checked', '')
        : element.removeAttribute('checked');

    public $model(param: DirectiveArgInterface) {
        switch(param.element.localName) {
            case 'input':
            case 'textarea':
                this.inputModel(param);
                break;
            case 'select':
                this.selectModel(param);
                break;
        }
    }

    private inputModel(param: DirectiveArgInterface) {
        const type = param.element.getAttribute('type');
        if (type && type === 'checkbox') {
            return this.checkboxModel(param);
        } else if (type && type === 'radio') {
            return this.radioModel(param);
        }
        this.processInputAndSelect(param, 'input');
    }

    private radioModel(param: DirectiveArgInterface) {
        const valueCaller = param.directive.get;
        const valueSetter = param.directive.set;

        if (!param.element.getAttribute('value')) throw new Error(`Radio buttons must have a value attribute to bind a model to it.`);

        param.element.addEventListener('change', (event: any) => valueSetter(event.target.value));

        watchDirective(param, newValue => this.setRadioChecked(param.element, newValue));
        this.setRadioChecked(param.element, valueCaller());
    }

    private checkboxModel(param: DirectiveArgInterface) {
        const valueCaller = param.directive.get;
        const valueSetter = param.directive.set;
        param.element.addEventListener('change', (event: any) => valueSetter(event.target.checked));

        watchDirective(param, newValue => this.setCheckboxChecked(param.element, newValue));

        this.setCheckboxChecked(param.element, valueCaller());
    }

    private processInputAndSelect(param: DirectiveArgInterface, eventType: string) {
        const valueCaller = param.directive.get;
        const valueSetter = param.directive.set;
        param.element.addEventListener(eventType, (event: any) => valueSetter(event.target.value));
        watchDirective(param, newValue => (param.element as any).value = newValue);
        (param.element as any).value = valueCaller();
    }
}
