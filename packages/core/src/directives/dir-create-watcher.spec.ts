import { ComponentInstance } from "../interfaces/component-instance.interface";
import { DirectiveParam } from "../interfaces/directive-param.interface";
import { dirCreateWatcher } from "./dir-create-watcher";

describe('dir-create-watcher', function() {

    it('should add a watcher', function() {
        const context: Partial<ComponentInstance> = {
            watchers: []
        };
        const param: DirectiveParam = {
            context: context as any,
            directives: {
                color: {
                    get: () => 100,
                    set: val => {}
                }
            },
            element: document.createElement('button'),
        };
        dirCreateWatcher(param, 'color', newValue => {});
        expect(context.watchers.length).toBe(1);
    });

});