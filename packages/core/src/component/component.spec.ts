import { component } from "./component";

describe('component', function() {

    it('should be able to add selector to the component', function() {
        function test() { return null; }
        const webComponent = component(test, 'app-root');
        expect((webComponent as any).selector).toBe('app-root');
    });

    it('should be able to create a custom element constructor', function() {
        function test() { return null; }
        const webComponent = component(test, 'app-root');
        customElements.define('app-root', webComponent);
        expect(webComponent).toBeTruthy();
        expect(customElements.get('app-root')).toBe(webComponent);
    });

});