import { HooksCls } from "../component/hooks";
import { CustomObject } from "./custom-object.interface";
import { DirectiveParam } from "./directive-param.interface";
import { Watcher } from "./watcher.interface";

export interface ComponentInstance extends HTMLElement {

    watchers: Watcher[];
    conditionWatchers: Watcher[];

    state: CustomObject;
    stateIndex: number;

    isChangeDetectionRunning: boolean;
    detectChanges(): void;

    directives: CustomObject<(param: DirectiveParam) => void>;
    pipes: CustomObject<(value: any, params?: any[]) => any>;

    hooks: HooksCls;
    props: CustomObject;
    setProps(props: CustomObject): void;
}