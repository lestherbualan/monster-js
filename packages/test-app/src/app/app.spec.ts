import { createComponentTester } from '@monster-js/tester';
import app from './app';

describe('app', function() {

    const { render } = createComponentTester(app);

    it('should render the component', function() {
        const { component } = render();
        expect(component).toBeTruthy();
    });

});