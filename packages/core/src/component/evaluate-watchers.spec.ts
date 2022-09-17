import { ComponentInstance } from "../interfaces/component-instance.interface";
import { evaluateWatchers } from "./evaluate-watchers";

describe('evaluate-watchers', function() {

    it('should remove all watchers with elements that are not connected', function() {
        const context: Partial<ComponentInstance> = {
            watchers: [
                {
                    val: null,
                    isConnected: () => true,
                    isUpdated: () => false,
                    update: () => {}
                },
                {
                    val: null,
                    isConnected: () => false,
                    isUpdated: () => false,
                    update: () => {}
                }
            ],
            conditionWatchers: [
                {
                    val: null,
                    isConnected: () => true,
                    isUpdated: () => false,
                    update: () => {}
                },
                {
                    val: null,
                    isConnected: () => false,
                    isUpdated: () => false,
                    update: () => {}
                }
            ]
        };
        evaluateWatchers(context as any);
        expect(context.watchers.length).toBe(1);
        expect(context.conditionWatchers.length).toBe(1);
    });

    it('should return true if there are changes to the view', function() {
        const context: Partial<ComponentInstance> = {
            watchers: [
                {
                    val: null,
                    isConnected: () => true,
                    isUpdated: () => true,
                    update: () => {}
                }
            ],
            conditionWatchers: []
        };
        const hasViewChanges = evaluateWatchers(context as any);
        expect(hasViewChanges).toBeTrue();
    });

    it('should return false if there are no changes to the view', function() {
        const context: Partial<ComponentInstance> = {
            watchers: [
                {
                    val: null,
                    isConnected: () => true,
                    isUpdated: () => false,
                    update: () => {}
                }
            ],
            conditionWatchers: []
        };
        const hasViewChanges = evaluateWatchers(context as any);
        expect(hasViewChanges).toBeFalse();
    });

});