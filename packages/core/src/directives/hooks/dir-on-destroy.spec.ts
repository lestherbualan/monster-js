import { HooksCls } from "../../component/hooks";
import { ComponentInstance } from "../../interfaces/component-instance.interface";
import { DirectiveParam } from "../../interfaces/directive-param.interface";
import { dirOnDestroy } from "./dir-on-destroy";

describe('dir-on-destroy', function() {

    it('should add a hook to onDestroy hooks list', function() {
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
        dirOnDestroy(param, () => {});
        expect(context.hooks['hooks'].onDestroy.length).toBe(1);
    });

});