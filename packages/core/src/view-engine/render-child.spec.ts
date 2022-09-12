import { ComponentInstance } from "../interfaces/component-instance.interface";
import { CustomObject } from "../interfaces/custom-object.interface";
import { renderChild } from "./render-child";

describe('render-child', function() {

    it('should log error if component is not defined', function() {
        const context: Partial<ComponentInstance> = {};
        spyOn(console, 'error');
        renderChild('app-root', {}, [], context as any, {});
        expect(console.error).toHaveBeenCalled();
    });

    it('should add watcher if there are props', function() {
        customElements.define('app-test', class extends HTMLElement {
            setProps() {}
        });
        const context: Partial<ComponentInstance> = {
            watchers: [],
        };
        renderChild('app-test', {}, [], context as any, { id: () => 'test-id' });
        expect(context.watchers.length).toBe(1);
    });

    it('should not add watcher if there are no props', function() {
        customElements.define('app-test-2', class extends HTMLElement {
            setProps() {}
        });
        const context: Partial<ComponentInstance> = {
            watchers: [],
        };
        renderChild('app-test-2', {}, [], context as any, {});
        expect(context.watchers.length).toBe(0);
    });

    it('should set props', function() {
        customElements.define('app-test-3', class extends HTMLElement {
            setProps(props) { this.props = props; }
            props: CustomObject = {};
        });
        const context: Partial<ComponentInstance> = {
            watchers: [],
        };
        const child = renderChild('app-test-3', {}, [], context as any, { date: () => 'test-date' });
        expect(child['props']).toEqual({ date: 'test-date' });
    });

});