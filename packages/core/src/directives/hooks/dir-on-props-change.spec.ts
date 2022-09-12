import { HooksCls } from "../../component/hooks";
import { ComponentInstance } from "../../interfaces/component-instance.interface";
import { DirectiveParam } from "../../interfaces/directive-param.interface";
import { dirOnPropsChange } from "./dir-on-props-change";

describe('dir-on-props-change', function() {

    it('should add a hook to onPropsChange hooks list', function() {
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
        dirOnPropsChange(param, () => {});
        expect(context.hooks['hooks'].onPropsChange.length).toBe(1);
    });

});