import { createComponentTester } from '@monster-js/tester';
import childComponent from './child-component';

describe('child-component', function() {

    const { render } = createComponentTester(childComponent);

    it('should render the component', function() {
        const { component } = render();
        expect(component).toBeTruthy();
    });

});
