import { DIDataSource } from "../dependency-injection/interfaces/di-data-source.interface";
import { FunctionDirective } from "../directives/function-directive.interface";
import { viewDir } from "../directives/view.directive";
import { HookKeys } from "../hooks/enums/hook-keys.enum";
import { HooksCls } from "../hooks/hook";
import { Module } from "../module/interfaces/module.interface";
import { FunctionPipe } from "../pipes/interfaces/function-pipe.interface";
import { Watcher } from "../watcher/interfaces/watcher.interface";
import { detectChanges } from "./detect-changes";
import { ComponentInstance } from "./interfaces/component-instance.interface";
import { FunctionComponent } from "./interfaces/function-component.interface";
import { setProps } from "./set-props";

export const createComponent = (fnComponent: FunctionComponent, module: Module) => {
    const directives: { [key: string]: FunctionDirective } = {};
    const pipes: { [key: string]: FunctionPipe } = {};
    (module.directives || []).forEach(dir => directives[dir.selector] = dir);
    (module.pipes || []).forEach(pipe => pipes[pipe.selector] = pipe);

    return class extends (fnComponent.super) implements ComponentInstance {

        public static dataSource = module.diSource;

        public watchers: Watcher[] = [];
        public cWatchers: Watcher[] = [];
        public setProps = (props: { [key: string]: any; }) => setProps(props, this);
        public props = {};

        public isCDRunning: boolean;
        public detectChanges = () => detectChanges(this);
        public hooks: HooksCls = new HooksCls();
        public dirs: ComponentInstance['dirs'] = {
            view: viewDir,
            ...directives
        };
        public pipes = pipes;
        public definedSelectors: string[] = module.definedSelectors;

        connectedCallback() {
            this.appendChild(fnComponent.bind(this)(this.props));



            /**
             * Run onPropsChange hook during initialization if there are props present
             */
            if (Object.keys(this.props).length > 0) {
                this.hooks.run(HookKeys.onPropsChange, [this.props]);
            }


            this.hooks.run(HookKeys.afterInit);
            this.hooks.clear(HookKeys.afterInit);
        }

        disconnectedCallback() {
            this.hooks.run(HookKeys.onDestroy);
        }
    }
}
