import { createComponentTester, fireEvent } from '@monster-js/tester';
import { ModelBindingComponent } from './model-binding.component';

describe('attribute-binding.component.tsx', function() {

    const { render } = createComponentTester<ModelBindingComponent>(ModelBindingComponent);

    it('should update input element value when component property is changed', function() {
        const { component, element, detectChanges } = render();
        const el: HTMLInputElement = element as any;
        expect(el.value).toBe('initial value');
        component.model = 'updated value';
        detectChanges();
        expect(el.value).toBe('updated value');
    });

    it('should update component property value when input element value is changed', function() {
        const { component, element } = render();
        const el: HTMLInputElement = element as any;
        expect(component.model).toBe('initial value');
        el.value = 'Updated value';
        fireEvent(element, 'input');
        expect(component.model).toBe('Updated value');
    });

});