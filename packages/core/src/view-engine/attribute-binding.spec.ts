import { HooksCls } from "../component/hooks";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { attributeBinding } from "./attribute-binding";

describe('attribute-binding', function() {

    it('should set attributes', function() {
        const element = document.createElement('button');
        const context: Partial<ComponentInstance> = {
            watchers: []
        };
        const attributes = {
            date: () => new Date().getTime(),
            static: () => 'testing'
        };
        attributeBinding(context as any, element, attributes);
        expect(element.hasAttribute('date')).toBeTrue();
        expect(element.getAttribute('static')).toBe('testing');
    });

    it('should add a watcher', function() {
        const element = document.createElement('button');
        const context: Partial<ComponentInstance> = {
            watchers: [],
            hooks: new HooksCls()
        };
        const attributes = {
            date: () => new Date().getTime(),
            static: () => 'testing'
        };
        attributeBinding(context as any, element, attributes);
        expect(context.watchers.length).toBe(1);
    });

});