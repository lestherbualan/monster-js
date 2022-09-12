import { HooksCls } from "../../component/hooks";
import { ComponentInstance } from "../../interfaces/component-instance.interface";
import { DirectiveParam } from "../../interfaces/directive-param.interface";
import { dirAfterInit } from './dir-after-init';

describe('dir-after-init', function() {

    it('should add a hook to afterInit hooks list', function() {
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
        dirAfterInit(param, () => {});
        expect(context.hooks['hooks'].afterInit.length).toBe(1);
    });

});