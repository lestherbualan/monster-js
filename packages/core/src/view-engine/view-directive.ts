import { HooksEnum } from "../enums/hooks.enum";
import { Container } from "../dependency-injection/container";
import { ComponentInterface } from "../interfaces/component-interface";
import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ViewDirectiveInterface } from "../interfaces/view-directive.interface";
import { allDirectiveMethodCaller } from "./utils/all-directive-method-caller";
import { directiveMethodCaller } from "./utils/directive-method-caller";
import { registerDirectiveHook } from "./utils/register-directive-hooks";
import { __remove_in_prod__ } from "./utils/__remove_in_prod__";
import { kebabToCamel } from "../utils/kebab-to-camel";
import { DirectiveInterface } from "../core";

function setDirectiveTracker(directiveTracker: any, directive: ViewDirectiveInterface) {
    /**
     * Set a tracker of directives and log warning for directives that are not called
     */
    __remove_in_prod__(() => {
        Object.keys(directive.directives).forEach(key => {
            directiveTracker[`${directive.namespace}:${key}`] = false;

            let getValue = directive.directives[key].get;
            Object.defineProperty(directive.directives[key], 'get', {
                get: () => {
                    directiveTracker[`${directive.namespace}:${key}`] = true;
                    return getValue;
                }
            });

            if (directive.directives[key].set) {
                let setValue = directive.directives[key].set;
                Object.defineProperty(directive.directives[key], 'set', {
                    get: () => {
                        directiveTracker[`${directive.namespace}:${key}`] = true;
                        return setValue;
                    }
                });
            }
        });
    });
}

function processDirective(dir: DirectiveInterface, di: Container, directive: ViewDirectiveInterface, context: ComponentInstanceInterface, element: HTMLElement, directiveTracker: any) {
    const instance = di.resolve(dir);

    for (const key in HooksEnum) registerDirectiveHook((HooksEnum as any)[key], context.$wrapper, instance);

    allDirectiveMethodCaller(directive.directives, instance, context, element);

    for (const key2 in directive.directives) {


        __remove_in_prod__(() => {
            const method = `$${kebabToCamel(key2)}`;
            if (instance[method] && typeof instance[method] === 'function') {
                directiveTracker[`${directive.namespace}:${key2}`] = true;
            }
        });


        directiveMethodCaller(key2, directive.directives[key2], instance, context, element);
    }
}

export function viewDirective(context: ComponentInstanceInterface, element: HTMLElement, directives: ViewDirectiveInterface[]) {

    const component: ComponentInterface = context.constructor as any;


    /**
     * Should not be used outside __remove_in_prod__ function so that tree shaking can remove this code
     */
    let directiveTracker = {};


    directives.forEach(directive => {

        setDirectiveTracker(directiveTracker, directive);

        const selectedDirectives = component.directives[directive.namespace];
        if (!component.directives[directive.namespace]) return console.error(`Directive '${directive.namespace}' is not registered in ${component.dataSource.name}`);

        const di = new Container(component.dataSource);
        selectedDirectives.forEach(dir => processDirective(dir, di, directive, context, element, directiveTracker));


        /**
         * Check the directive tracker if there are directives that are not called
         */
        __remove_in_prod__(() => {
            Object.keys(directiveTracker).forEach(key => {
                if (!directiveTracker[key]) {
                    console.warn(`The directive ${key} is defined in the ${component.name} but is not being used. Please check if the directive is registered in the ${component.dataSource.name}.`);
                }
            });
        });


    });

    return element;
}
