import { createComponentTester, fireEvent } from '@monster-js/tester';
import { ModelBindingComponent } from './model-binding.component';

describe('attribute-binding.component.tsx', function() {

    const { render } = createComponentTester<ModelBindingComponent>(ModelBindingComponent);

    it('should update input element value when component property is changed', function() {
        const { component, detectChanges, query } = render();
        const element = query<HTMLInputElement>('input');
        expect(element.value).toBe('initial value');
        component.model = 'updated value';
        detectChanges();
        expect(element.value).toBe('updated value');
    });

    it('should update component property value when input element value is changed', function() {
        const { component, query } = render();
        const element: HTMLInputElement = query('input');
        expect(component.model).toBe('initial value');
        element.value = 'Updated value';
        fireEvent(element, 'input');
        expect(component.model).toBe('Updated value');
    });

    it('should update component property and view if input element value is changed', function() {
        const { component, query, detectChanges } = render();
        const h1 = query('h1');
        const input = query<HTMLInputElement>('input');
        expect(component.model).toBe('initial value');
        expect(input.value).toBe('initial value');
        input.value = 'updated value';
        fireEvent(input, 'input');
        detectChanges();
        expect(component.model).toBe('updated value');
        expect(h1.innerHTML).toBe('updated value');
    });

});