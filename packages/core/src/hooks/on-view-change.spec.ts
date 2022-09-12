import { HooksCls } from "../component/hooks";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { onViewChange } from "./on-view-change";

describe('on-view-change', function() {

    it('should add a hook to onViewChange hooks list', function() {
        const context: Partial<ComponentInstance> = {
            hooks: new HooksCls()
        };
        onViewChange(context as any, () => {}, () => true);
        expect(context.hooks['hooks'].onViewChange.length).toBe(1);
    });

});
