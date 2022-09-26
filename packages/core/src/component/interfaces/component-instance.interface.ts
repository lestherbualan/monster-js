import { FunctionDirective } from "../../directives/function-directive.interface";
import { DirectiveParam } from "../../directives/interfaces/directive-params.interface";
import { HooksCls } from "../../hooks/hook";
import { FunctionPipe } from "../../pipes/interfaces/function-pipe.interface";
import { Watcher } from "../../watcher/interfaces/watcher.interface";

export interface ComponentInstance extends HTMLElement {
    setProps(props: { [key: string]: any; }): void;
    watchers: Watcher[];
    cWatchers: Watcher[];
    props: { [key: string]: any; };
    detectChanges(): void;
    isCDRunning: boolean;
    hooks: HooksCls;
    dirs: { [key: string]: FunctionDirective };
    pipes: { [key: string]: FunctionPipe };
}