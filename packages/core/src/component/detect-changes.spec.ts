import { ComponentInstance } from "../interfaces/component-instance.interface";
import { detectChanges } from "./detect-changes";
import { HooksCls } from "./hooks";

describe('detect-changes', function() {

    it('should prevent running change detection if there is an instance running already', function() {
        const context: Partial<ComponentInstance> = {
            isChangeDetectionRunning: true,
            hooks: new HooksCls()
        };
        spyOn(context.hooks, 'run');
        detectChanges.bind(context)();
        expect(context.hooks.run).not.toHaveBeenCalled();
    });

    it('should run change detection if there are no instance running already', function() {
        const context: Partial<ComponentInstance> = {
            isChangeDetectionRunning: false,
            hooks: new HooksCls(),
            conditionWatchers: [],
            watchers: []
        };
        spyOn(context.hooks, 'run');
        detectChanges.bind(context)();
        expect(context.hooks.run).toHaveBeenCalled();
    });

});