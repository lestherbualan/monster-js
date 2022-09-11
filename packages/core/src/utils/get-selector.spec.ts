import { getSelector } from "./get-selector";

describe('get-selector', function() {

    it('should get the selector from the static property', function() {
        const webComponent = class extends HTMLElement {
            public static selector = 'app-test-root';
        }
        const selector = getSelector(webComponent);
        expect(selector).toBe('app-test-root');
    });

});