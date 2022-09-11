import { ComponentInstance } from "../interfaces/component-instance.interface";
import { ifCondition } from "./if-condition";

describe('if-condition', function() {

    it('should add condition watcher', function() {
        const context: Partial<ComponentInstance> = {
            conditionWatchers: []
        };
        ifCondition(context as any, () => document.createElement('button'), () => false);
        expect(context.conditionWatchers.length).toBe(1);
    });

    it('should create the element if value is true', function() {
        const context: Partial<ComponentInstance> = {
            conditionWatchers: []
        };
        const fragment = ifCondition(context as any, () => document.createElement('button'), () => true);
        expect(fragment.childNodes.length).toBe(2);
    });

    it('should not create the element if value is false', function() {
        const context: Partial<ComponentInstance> = {
            conditionWatchers: []
        };
        const fragment = ifCondition(context as any, () => document.createElement('button'), () => false);
        expect(fragment.childNodes.length).toBe(1);
    });

});