import { HooksCls } from "../component/hooks";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { onDestroy } from "./on-destroy";

describe('on-destroy', function() {

    it('should add a hook to onDestroy hooks list', function() {
        const context: Partial<ComponentInstance> = {
            hooks: new HooksCls()
        };
        onDestroy(context as any, () => {}, () => true);
        expect(context.hooks['hooks'].onDestroy.length).toBe(1);
    });

});
