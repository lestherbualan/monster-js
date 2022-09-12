import { HookKeys } from "../enums/hook-keys.enum";
import { HookItem } from "../interfaces/hook-item.interface";
import { HooksCls } from "./hooks";

describe('hooks', function() {

    it('should be able to set hooks', function() {
        const hooks = new HooksCls();
        const anyHooks: any = hooks;
        expect(anyHooks.hooks[HookKeys.afterInit].length).toBe(0);
        hooks.set(HookKeys.afterInit, {
            hook: () => {},
            isActive: () => true
        });
        expect(anyHooks.hooks[HookKeys.afterInit].length).toBe(1);
        hooks.set(HookKeys.afterInit, {
            hook: () => {},
            isActive: () => true
        });
        expect(anyHooks.hooks[HookKeys.afterInit].length).toBe(2);
    });

    it('should be able to run active hooks only', function() {
        const hooks = new HooksCls();
        const active: HookItem = {
            hook: () => {},
            isActive: () => true
        };
        const inactive: HookItem = {
            hook: () => {},
            isActive: () => false
        };
        spyOn(active, 'hook');
        spyOn(inactive, 'hook');
        hooks.set(HookKeys.afterInit, active);
        hooks.set(HookKeys.afterInit, inactive);
        hooks.run(HookKeys.afterInit);
        expect(active.hook).toHaveBeenCalled();
        expect(inactive.hook).not.toHaveBeenCalled();
    });

    it('should be able to remove inactive hooks', function() {
        const hooks = new HooksCls();
        const anyHooks: any = hooks;
        const active: HookItem = {
            hook: () => {},
            isActive: () => true
        };
        const inactive: HookItem = {
            hook: () => {},
            isActive: () => false
        };
        spyOn(active, 'hook');
        spyOn(inactive, 'hook');
        hooks.set(HookKeys.afterInit, active);
        hooks.set(HookKeys.afterInit, inactive);
        expect(anyHooks.hooks[HookKeys.afterInit].length).toBe(2);
        hooks.run(HookKeys.afterInit);
        expect(anyHooks.hooks[HookKeys.afterInit].length).toBe(1);
    });

    it('should be able to clear hooks', function() {
        const hooks = new HooksCls();
        const anyHooks: any = hooks;
        const active: HookItem = {
            hook: () => {},
            isActive: () => true
        };
        const inactive: HookItem = {
            hook: () => {},
            isActive: () => false
        };
        hooks.set(HookKeys.afterInit, active);
        hooks.set(HookKeys.afterInit, inactive);
        expect(anyHooks.hooks[HookKeys.afterInit].length).toBe(2);
        hooks.clear(HookKeys.afterInit);
        expect(anyHooks.hooks[HookKeys.afterInit].length).toBe(0);
    });

});