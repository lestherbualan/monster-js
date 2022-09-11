import { fireEvent } from "@monster-js/tester";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { DirectiveParam } from "../interfaces/directive-param.interface";
import { useState } from "../state/use-state";
import { viewDir } from "./view.directive";

describe('view.directive', function() {

    it('should set reference of an element to a variable', function() {

        const context: Partial<ComponentInstance> = {
            detectChanges() {}
        };

        let ref: HTMLElement = null;
        const element = document.createElement('button');

        const params: DirectiveParam = {
            context: context as any,
            directives: {
                ref: {
                    get: () => {},
                    set: val => ref = val
                }
            },
            element
        };

        viewDir(params);

        expect(ref).toBe(element);

    });

    it('should set element value if variable is changed from the logic', function() {
        const context: Partial<ComponentInstance> = {
            detectChanges() {}
        };

        let state = useState<string>(context as any, 'hello');
        const [ getter ] = state;
        const element = document.createElement('input');

        const params: DirectiveParam = {
            context: context as any,
            directives: {
                model: {
                    get: () => state,
                    set: val => state = val
                }
            },
            element
        };

        viewDir(params);
        expect(element.value).toBe(getter());
    });

    it('should set variable value when model is changed from the element', function() {
        const context: Partial<ComponentInstance> = {
            detectChanges() {}
        };

        let state = useState<string>(context as any, 'hello');
        const [ getter ] = state;
        const element = document.createElement('input');

        const params: DirectiveParam = {
            context: context as any,
            directives: {
                model: {
                    get: () => state,
                    set: val => state = val
                }
            },
            element
        };

        viewDir(params);
        expect(getter()).toBe('hello');
        expect(element.value).toBe(getter());
        element.value = 'changed';
        fireEvent(element, 'input');
        expect(getter()).toBe('changed');
    });

});
