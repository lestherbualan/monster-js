import { HooksCls } from "../component/hooks";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { afterInit } from "./after-init";

describe('after-init', function() {

    it('should add a hook to afterInit hooks list', function() {
        const context: Partial<ComponentInstance> = {
            hooks: new HooksCls()
        };
        afterInit(context as any, () => {}, () => true);
        expect(context.hooks['hooks'].afterInit.length).toBe(1);
    });

});
