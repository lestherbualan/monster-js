import { HooksCls } from "../../component/hooks";
import { ComponentInstance } from "../../interfaces/component-instance.interface";
import { DirectiveParam } from "../../interfaces/directive-param.interface";
import { dirOnViewChange } from "./dir-on-view-change";

describe('dir-on-view-changes', function() {

    it('should add a hook to onViewChanges hooks list', function() {
        const context: Partial<ComponentInstance> = {
            hooks: new HooksCls()
        };
        const param: DirectiveParam = {
            context: context as any,
            directives: {},
            element: {
                isConnected: true
            } as any
        };
        dirOnViewChange(param, () => {});
        expect(context.hooks['hooks'].onViewChange.length).toBe(1);
    });

});