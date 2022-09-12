import { ComponentInstance } from "../interfaces/component-instance.interface";
import { createSharedState } from "./create-shared-state";

describe('create-shared-state', function() {

    it('should create a shared state function that returns a getter and setter', function() {
        const sharedState = createSharedState('sharedState');
        const context: Partial<ComponentInstance> = {};
        const [ getter, setter ] = sharedState(context as any)

        expect(sharedState).toBeTruthy();
        expect(typeof sharedState).toBe('function');
        expect(typeof getter).toBe('function');
        expect(typeof setter).toBe('function');
    });

    it('should properly set the initial value', function() {
        const sharedState = createSharedState('sharedState', 100);
        const context: Partial<ComponentInstance> = {};
        const [ getter ] = sharedState(context as any)
        expect(getter()).toBe(100);
    });

    it('should set value using setter ang get value using getter', function() {
        const sharedState = createSharedState('sharedState', 100);
        const context: Partial<ComponentInstance> = {};
        const [ getter, setter ] = sharedState(context as any)
        expect(getter()).toBe(100);
        setter(200);
        expect(getter()).toBe(200);
    });

    it('should trigger change detection of context when using setter', function() {
        const sharedState = createSharedState('sharedState', 100);
        const context: Partial<ComponentInstance> = {
            isConnected: true,
            detectChanges() {}
        };
        const [ getter, setter ] = sharedState(context as any)
        spyOn(context, 'detectChanges');
        setter(200);
        expect(context.detectChanges).toHaveBeenCalled();
    });

});