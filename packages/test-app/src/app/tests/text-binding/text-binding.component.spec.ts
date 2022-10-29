import { createComponentTester } from '@monster-js/tester';
import { TextBindingComponent } from './text-binding.component';

describe('attribute-binding.component.tsx', function() {

    const { render } = createComponentTester<TextBindingComponent>(TextBindingComponent);

    it('should bind property to view as text node', function() {
        const { component, detectChanges } = render();
        expect(component.greeting).toBe('Hello World');
        component.greeting = 'Hi world';
        detectChanges();
        expect(component.greeting).toBe('Hi world');
    });

});