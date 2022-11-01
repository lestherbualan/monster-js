import { createComponentTester } from '@monster-js/tester';
import { ObservedAttributesComponent } from './observed-attributes.component';

describe('attribute-binding.component.tsx', function() {

    const { render } = createComponentTester<ObservedAttributesComponent>(ObservedAttributesComponent);

    it('should set the component property with a string value if element attribute is changed', function() {
        const { component, host } = render();
        expect(component.stringAttr).toBe('initial value');
        host.setAttribute('string-attr', 'updated value');
        expect(typeof component.stringAttr).toBe('string');
        expect(component.stringAttr).toBe('updated value');
    });

    it('should set the component property with a number value if element attribute is changed', function() {
        const { component, host } = render();
        expect(component.numberAttr).toBe(0);
        expect(typeof component.numberAttr).toBe('number');
        host.setAttribute('number-attr', '100');
        expect(typeof component.numberAttr).toBe('number');
        expect(component.numberAttr).toBe(100);
    });

    it('should set the component property with a boolean value if element attribute is changed', function() {
        const { component, host } = render();
        expect(component.booleanAttr).toBe(true);
        expect(typeof component.booleanAttr).toBe('boolean');
        host.setAttribute('boolean-attr', 'false');
        expect(typeof component.booleanAttr).toBe('boolean');
        expect(component.booleanAttr).toBe(false);
    });

    it('should only accept numeric attribute value for number type attributes', function() {
        const { component, host } = render();
        expect(component.numberAttr).toBe(0);
        expect(typeof component.numberAttr).toBe('number');
        host.setAttribute('number-attr', '100');
        expect(typeof component.numberAttr).toBe('number');
        expect(component.numberAttr).toBe(100);
        host.setAttribute('number-attr', 'test200');
        expect(component.numberAttr).toBeNaN();
        host.setAttribute('number-attr', '200test');
        expect(component.numberAttr).toBeNaN();
    });

    it('should only accept boolean attribute value for boolean type attributes', function() {
        const { component, host } = render();
        expect(component.booleanAttr).toBe(true);
        expect(typeof component.booleanAttr).toBe('boolean');

        spyOn(console, 'error');
        host.setAttribute('boolean-attr', 'test');
        expect(component.booleanAttr).toBe(true);
        host.setAttribute('boolean-attr', 'true');
        expect(component.booleanAttr).toBe(true);
        host.setAttribute('boolean-attr', '1');
        expect(component.booleanAttr).toBe(true);

        host.setAttribute('boolean-attr', '0');
        expect(component.booleanAttr).toBe(false);
        host.setAttribute('boolean-attr', 'false');
        expect(component.booleanAttr).toBe(false);
        host.setAttribute('boolean-attr', '');
        expect(component.booleanAttr).toBe(false);
        host.setAttribute('boolean-attr', null);
        expect(component.booleanAttr).toBe(false);
        host.setAttribute('boolean-attr', undefined);
        expect(component.booleanAttr).toBe(false);
    });

    it('should trigger the attributeChangedCallback hook if attribute is changed', function() {
        const { component, host } = render();
        spyOn(component, 'attributeChangedCallback');
        host.setAttribute('string-attr', 'test');
        host.setAttribute('boolean-attr', 'false');
        host.setAttribute('number-attr', '123');
        expect(component.attributeChangedCallback).toHaveBeenCalledTimes(3);
    });

    it('should have a proper old and new value parameters of attributeChangedCallback hook');
    it('should have a proper name and camel case name parameters of attributeChangedCallback hook');
    it('should have a name and in kebab case and camelCaseName in camel case');

    it('should have a convertedOldValue of type string');
    it('should have a convertedNewValue of type string');

    it('should have a convertedOldValue of type number');
    it('should have a convertedNewValue of type number');

    it('should have a convertedOldValue of type boolean');
    it('should have a convertedNewValue of type boolean');

});