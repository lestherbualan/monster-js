import { HookKeys } from "./enums/hook-keys.enum";
import { HookItem } from "./interfaces/hook-item.interface";
import { Hooks } from "./interfaces/hooks.interface";

export class HooksCls {
    private hooks: { [key in keyof Hooks]: HookItem[] } = {
        afterInit: [],
        onDestroy: [],
        onViewChange: [],
        onChangeDetection: [],
        onPropsChange: []
    };

    public set(key: HookKeys, hook: HookItem) {
        this.hooks[key].push(hook);
    }

    public run(key: HookKeys, args: any[] = []) {
        this.hooks[key] = this.hooks[key].filter(hook => hook.isActive());
        this.hooks[key].forEach(item => item.hook(...args));
    }

    public clear(key: HookKeys) {
        this.hooks[key] = [];
    }
}