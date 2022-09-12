import { ComponentInstance } from "../interfaces/component-instance.interface";
import { listRendering } from "./list-rendering";

describe('list-rendering', function() {

    it('should add condition watcher', function() {
        const context: Partial<ComponentInstance> = {
            conditionWatchers: []
        };
        listRendering(context as any, () => document.createElement('div'), () => [1,2,3]);
        expect(context.conditionWatchers.length).toBe(1);
    });

    it('should generate elements base on given array', function() {
        const context: Partial<ComponentInstance> = {
            conditionWatchers: []
        };
        const fragment = listRendering(context as any, () => document.createElement('div'), () => [1,2,3]);
        expect(fragment.childNodes.length).toBe(4);
    });

});