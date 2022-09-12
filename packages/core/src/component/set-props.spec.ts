import { HookKeys } from "../enums/hook-keys.enum";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { HookItem } from "../interfaces/hook-item.interface";
import { HooksCls } from "./hooks";
import { setProps } from "./set-props";

describe('set-props', function() {

    it('should be able to set props', function() {
        const context: Partial<ComponentInstance> = {
            props: {},
            hooks: new HooksCls()
        };
        setProps.bind(context)({ count: 123 });
        expect(context.props.count).toBe(123);
    });

    it('should call onPropsChange hook when setting props', function() {
        const context: Partial<ComponentInstance> = {
            props: {},
            hooks: new HooksCls()
        };
        const hook: HookItem = {
            hook: () => {},
            isActive: () => true
        };
        context.hooks.set(HookKeys.onPropsChange, hook);
        spyOn(hook, 'hook');
        setProps.bind(context)({ count: 123 });
        expect(hook.hook).toHaveBeenCalled();
    });

    it('should run change detection if context is connected', function() {
        const context: Partial<ComponentInstance> = {
            props: {},
            hooks: new HooksCls(),
            detectChanges: () => {},
            isConnected: true
        };
        spyOn(context, 'detectChanges');
        setProps.bind(context)({ count: 123 });
        expect(context.detectChanges).toHaveBeenCalled();
    });

    it('should not run change detection if context is not connected', function() {
        const context: Partial<ComponentInstance> = {
            props: {},
            hooks: new HooksCls(),
            detectChanges: () => {},
            isConnected: false
        };
        spyOn(context, 'detectChanges');
        setProps.bind(context)({ count: 123 });
        expect(context.detectChanges).not.toHaveBeenCalled();
    });

});
