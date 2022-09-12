import { defineComponent } from "./define-component";

describe('define-component', function() {

    it('should be able to define a web component', function() {
        class WebComponent extends HTMLElement {
            public static selector = 'app-root';
        }
        defineComponent(WebComponent);
        const defined = customElements.get('app-root');
        expect(defined).toBe(WebComponent);
    });

});