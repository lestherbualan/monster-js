import { createComponentTester } from '@monster-js/tester';
import { AttributeBindingComponent } from './attribute-binding.component';

describe('attribute-binding.component.tsx', function() {

    const { render } = createComponentTester<AttributeBindingComponent>(AttributeBindingComponent);

    it('should bind component property to element attribute', function() {
        const { component, element, detectChanges } = render();
        detectChanges();
        expect(element.getAttribute('id')).toBe(component.id.toString());
        component.id = 300;
        detectChanges();
        expect(element.getAttribute('id')).toBe((300).toString());
    });

});