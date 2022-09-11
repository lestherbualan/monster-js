import { HookItem } from "./hook-item.interface";

export interface Hooks {
    afterInit: HookItem;                    // comp, dir
    onDestroy: HookItem;                    // comp, dir
    onViewChange: HookItem;                 // comp, dir
    onChangeDetection: HookItem;            // comp, dir
    onPropsChange: HookItem;                // comp, dir
}
