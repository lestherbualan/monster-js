import { createComponentTester } from '@monster-js/tester';
import child from './child';

describe('child', function() {

    const { render } = createComponentTester(child);

    it('should render the component', function() {
        const { component } = render();
        expect(component).toBeTruthy();
    });

});
