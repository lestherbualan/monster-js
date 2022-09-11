import { ComponentInstance } from "../interfaces/component-instance.interface";
import { unknownElementTag } from "./unknown-element-tag";

describe('unknown-element-tag', function() {

    it('should create an element if tag value is an element local name', function() {
        const element = unknownElementTag('button', {}, [], null, null);
        expect(element).toBeInstanceOf(HTMLButtonElement);
        expect(element.localName).toBe('button');
    });

    it('should create component if tag value is a component selector', function() {
        class C extends HTMLElement {}
        const context: Partial<ComponentInstance> = {};
        customElements.define('app-test', C);
        const element = unknownElementTag('app-test', {}, [], context as any, {});
        expect(element).toBeTruthy();
        expect(element.localName).toBe('app-test');
    });

});