import { createComponentTester } from '@monster-js/tester';
import { LoginComponent } from './login.component';

describe('attribute-binding.component.tsx', function() {

    const { render } = createComponentTester<LoginComponent>(LoginComponent);

    it('should create the component', function() {
        const { component } = render();
        expect(component).toBeTruthy();
    });

});