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

export function component(functionComponent: FunctionComponent, selector: string): CustomElementConstructor {

    const superClass = functionComponent.superClass || HTMLElement;

    return class extends superClass implements ComponentInstance {

        public static selector = selector;


        private fn = functionComponent;


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
        public isCDRunning: boolean = false;
        detectChanges = () => detectChanges(this);
        watchers: Watcher[] = [];
        conditionWatchers: Watcher[] = [];


        /**
         * A web component connectedCallback hook
         */
        connectedCallback() {

            if (!this.fn.childrenDefined) {
                (this.fn.children || []).forEach(child => defineComponent(child));
            }
            this.fn.childrenDefined = true;

            const element = this.fn(this.props, this);
            this.appendChild(element);


            /**
             * Add style to header
             * should add style only once
             */
            if (this.fn.styles) {
                const styles = this.fn.styles;
                this.fn.styles = null;
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


        /**
         * A web component disconnectedCallback hook
         */
        disconnectedCallback() {
            this.hooks.run(HookKeys.onDestroy);
        }

    }
}