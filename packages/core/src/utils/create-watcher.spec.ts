import { ComponentInstance } from "../interfaces/component-instance.interface";
import { createWatcher } from "./create-watcher";
import { evaluateWatchers } from '../component/evaluate-watchers';

describe('create-watcher', function() {

    it('should create a watcher inside the context', function() {
        const context: Partial<ComponentInstance> = {
            watchers: []
        };
        createWatcher(context as any, { isConnected: true } as any, () => {}, newValue => {});
        expect(context.watchers.length).toBe(1);
    });

    it('should not call the update method if value is not updated', function() {
        const context: Partial<ComponentInstance> = {
            watchers: [],
            conditionWatchers: []
        };
        const updateHolder = {
            update: () => {}
        };
        spyOn(updateHolder, 'update');
        createWatcher(context as any, { isConnected: true } as any, () => 100, () => updateHolder.update());
        evaluateWatchers(context as any);
        expect(context.watchers.length).toBe(1);
        expect(updateHolder.update).not.toHaveBeenCalled();
    });

    it('should call the update method if value is updated', function() {
        const context: Partial<ComponentInstance> = {
            watchers: [],
            conditionWatchers: []
        };
        const updateHolder = {
            update: () => {}
        };
        spyOn(updateHolder, 'update');
        createWatcher(context as any, { isConnected: true } as any, () => Math.random(), () => updateHolder.update());
        evaluateWatchers(context as any);
        expect(context.watchers.length).toBe(1);
        expect(updateHolder.update).toHaveBeenCalled();
    });

    it('should be removed from the watchers array if not connected', function() {
        const context: Partial<ComponentInstance> = {
            watchers: [],
            conditionWatchers: []
        };
        const updateHolder = {
            update: () => {}
        };
        spyOn(updateHolder, 'update');
        createWatcher(context as any, { isConnected: false } as any, () => Math.random(), () => updateHolder.update());
        expect(context.watchers.length).toBe(1);
        evaluateWatchers(context as any);
        expect(context.watchers.length).toBe(0);
        expect(updateHolder.update).not.toHaveBeenCalled();
    });

});