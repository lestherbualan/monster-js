import { ComponentInstance } from "../interfaces/component-instance.interface";
import { textBinding } from "./text-binding";

describe('test-binding', function() {

    it('should add watcher', function() {
        const context: Partial<ComponentInstance> = {
            watchers: []
        };
        textBinding(context as any, () => 'sample-text');
        expect(context.watchers.length).toBe(1);
    });

    it('should create a text node with the correct text content', function() {
        const context: Partial<ComponentInstance> = {
            watchers: []
        };
        const text = textBinding(context as any, () => 'sample-text');
        expect(text).toBeInstanceOf(Text);
        expect(text.textContent).toBe('sample-text');
    });

});