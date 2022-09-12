import { viewDir } from "../directives/view.directive";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { CustomObject } from "../interfaces/custom-object.interface";
import { DirectiveParam } from "../interfaces/directive-param.interface";
import { Watcher } from "../interfaces/watcher.interface";
import { FunctionComponent } from "../interfaces/function-component.interface";
import { setProps } from "./set-props";
import { HooksCls } from "./hooks";
import { HookKeys } from "../enums/hook-keys.enum";
import { detectChanges } from "./detect-changes";
import { defineComponent } from "../utils/define-component";

export function createComponent(functionComponent: FunctionComponent, selector: string): CustomElementConstructor {

    const superClass = functionComponent.superClass || HTMLElement;

    return class extends superClass implements ComponentInstance {

        public static selector = selector;


        private fnComponent = functionComponent;


        /**
         * State
         */
        state: CustomObject = {};
        stateIndex: number = 0;


        /**
         * Directives
         */
        directives: CustomObject<(param: DirectiveParam) => void> = {
            view: viewDir,
            ...functionComponent.directives
        };


        /**
         * Pipes
         */
        pipes = functionComponent.pipes || {};


        /**
         * Hooks
         */
        hooks: HooksCls = new HooksCls();


        /**
         * Props
         */
        props: CustomObject = {};
        setProps = setProps.bind(this);


        /**
         * Change detection
         */
        public isChangeDetectionRunning: boolean = false;
        detectChanges = detectChanges.bind(this);
        watchers: Watcher[] = [];
        conditionWatchers: Watcher[] = [];





        connectedCallback() {

            if (!this.fnComponent.childrenDefined) {
                (this.fnComponent.children || []).forEach(child => defineComponent(child));
            }
            this.fnComponent.childrenDefined = true;

            const element = this.fnComponent(this.props, this);
            this.appendChild(element);


            if (this.fnComponent.styles) {
                const styles = this.fnComponent.styles;
                this.fnComponent.styles = null;
                const styleEl = document.createElement('style');
                styleEl.textContent = styles;
                document.getElementsByTagName('head')[0].appendChild(styleEl);
            }


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