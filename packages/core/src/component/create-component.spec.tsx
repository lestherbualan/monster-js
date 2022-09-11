import { ComponentInstance } from "../interfaces/component-instance.interface";
import { FunctionComponent } from "../interfaces/function-component.interface";
import { createComponent } from "./create-component";

describe('create-component', function() {

    it('should create a web component with super class based on provided by the function component', function() {
        const component = createComponent(function() {
            return document.createElement('button');
        }, 'app-test');
        customElements.define('app-test', component);
        const defined = customElements.get('app-test');
        const instance = new defined();
        expect(component).toBeTruthy();
        expect(defined).toBeTruthy();
        expect(instance).toBeInstanceOf(HTMLElement);
    });

    it('should merge directives from function component to class component', function() {
        function dir() {}
        function app() { return null; }
        (app as FunctionComponent).directives = {
            highlight: dir
        };
        const component = createComponent(app, 'app-test-2');
        customElements.define('app-test-2', component);
        const defined = customElements.get('app-test-2');
        const instance: ComponentInstance = new defined() as any;
        expect(instance.directives.highlight).toBe(dir);
    });

});