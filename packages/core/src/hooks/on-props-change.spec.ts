import { HooksCls } from "../component/hooks";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { onPropsChange } from "./on-props-change";

describe('on-props-change', function() {

    it('should add a hook to onPropsChange hooks list', function() {
        const context: Partial<ComponentInstance> = {
            hooks: new HooksCls()
        };
        onPropsChange(context as any, () => {}, () => true);
        expect(context.hooks['hooks'].onPropsChange.length).toBe(1);
    });

});
