import { ComponentInstance } from "../interfaces/component-instance.interface";
import { useState } from "./use-state";

describe('use-state', function() {

    it('should return a getter and setter', function() {
        const context: Partial<ComponentInstance> = {
            detectChanges() {}
        };
        const [ getter, setter ] = useState(context as any, 100);
        expect(getter()).toBe(100);
        setter(200);
        expect(getter()).toBe(200);
    });

});