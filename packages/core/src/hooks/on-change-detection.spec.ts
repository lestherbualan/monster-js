import { HooksCls } from "../component/hooks";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { onChangeDetection } from "./on-change-detection";

describe('on-change-detection', function() {

    it('should add a hook to onChangeDetection hooks list', function() {
        const context: Partial<ComponentInstance> = {
            hooks: new HooksCls()
        };
        onChangeDetection(context as any, () => {}, () => true);
        expect(context.hooks['hooks'].onChangeDetection.length).toBe(1);
    });

});
