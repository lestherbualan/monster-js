import { HooksCls } from "../../component/hooks";
import { ComponentInstance } from "../../interfaces/component-instance.interface";
import { DirectiveParam } from "../../interfaces/directive-param.interface";
import { dirOnchangeDetection } from "./dir-on-change-detection";

describe('dir-on-change-detection', function() {

    it('should add a hook to onChangeDetection hooks list', function() {
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
        dirOnchangeDetection(param, () => {});
        expect(context.hooks['hooks'].onChangeDetection.length).toBe(1);
    });

});