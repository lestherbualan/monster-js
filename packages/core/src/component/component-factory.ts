import { applyReactivity } from "../change-detection/apply-reactivity";
import { ChangeDetection } from "../change-detection/change-detection";
import { AttributeTypeEnum } from "../enums/attribute-type.enum";
import { HooksEnum } from "../enums/hooks.enum";
import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ComponentInterface } from "../interfaces/component-interface";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../interfaces/object.interface";
import { kebabToCamel } from "../utils/kebab-to-camel";
import { setGetterProp } from "../utils/set-getter-prop";
import { autoResolveComponent } from "./utils/auto-resolve-component";

export function componentFactory(component: ComponentInterface) {

    return class extends (component.superClass || HTMLElement) implements ComponentWrapperInstanceInterface {

        public componentInstance: ComponentInstanceInterface = null!;
        public component: ComponentInterface = component;
        public changeDetection: ChangeDetection = new ChangeDetection(this);
        public isMonsterComponent: boolean = true;

        public runningHooks: ObjectInterface<boolean> = {};
        public hooksWatchers: ObjectInterface<Function[]> = {};

        public initialObservedAttributeValue: ObjectInterface = {};
        public failedToRunAttributeChangeFunctions: Function[] = [];

        public $propsData: { [key: string]: any } = {};

        constructor() {
            super();
            this.setupComponent();
        }

        public setProps(props: { [key: string]: any }) {
            this.$propsData = props;
            this.hooksCaller(HooksEnum.onPropsChange);
            this.changeDetection.detectChanges();
        }

        public addHookWatcher(type: HooksEnum, callback: Function): void {
            if (!this.hooksWatchers[type]) this.hooksWatchers[type] = [];
            this.hooksWatchers[type].push(callback);
        }

        public buildComponent() {

            this.hooksCaller(HooksEnum.onInit);
            this.hooksCaller(HooksEnum.beforeViewInit);


            /**
             * Apply reactivity to component properties
             */
            applyReactivity(this.componentInstance, () => this.changeDetection.detectChanges());


            this.appendElement(this.componentInstance.render());
            this.hooksCaller(HooksEnum.afterViewInit);
            this.changeDetection.connected();
        }

        public appendElement(element: HTMLElement) {
            let root: HTMLElement | ShadowRoot = this;
            if (this.component.shadowMode) {
                root = this.attachShadow({ mode: this.component.shadowMode });
                this.applyShadowStyle(root);
            }

            root.appendChild(element);
        }

        public applyShadowStyle(root: ShadowRoot) {
            if (this.component.shadowStyle) {
                const style = document.createElement('style');
                style.innerHTML = this.component.shadowStyle;
                root.appendChild(style);
            }
        }

        public setupComponent() {
            this.componentInstance = autoResolveComponent(this.component);
            this.applyInitialObservedAttributeValue();
            setGetterProp(this.componentInstance, '$wrapper', () => this);
        }

        static get observedAttributes() {
            return component.observedAttributesArray || [];
        }

        public hooksCaller(type: HooksEnum, args: any[] = []) {
            if (this.runningHooks[type]) return;

            this.runningHooks[type] = true;

            const instance: ObjectInterface = this.componentInstance;
            if (instance[type]) instance[type]?.bind(instance)(...args);

            (this.hooksWatchers[type] || []).forEach(item => item());

            this.runningHooks[type] = false;
        }

        connectedCallback() {
            this.buildComponent();
            this.failedToRunAttributeChangeFunctions.forEach(item => item());
            this.hooksCaller(HooksEnum.connectedCallback);
        }

        disconnectedCallback() {
            this.hooksCaller(HooksEnum.onDestroy);
            this.hooksCaller(HooksEnum.disconnectedCallback);
        }

        adoptedCallback() {
            this.hooksCaller(HooksEnum.adoptedCallback);
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
            const observedAttributesObject: {[key: string]: AttributeTypeEnum} = component.observedAttributesObject || {};
            const camelCaseName = kebabToCamel(name);
            let convertedNewValue: any;
            let convertedOldValue: any;

            switch(observedAttributesObject[name]) {
                case AttributeTypeEnum.normal: {
                    convertedNewValue = newValue;
                    convertedOldValue = oldValue;
                    break;
                }
                case AttributeTypeEnum.boolean: {
                    convertedNewValue = Boolean(JSON.parse(newValue));
                    convertedOldValue = Boolean(JSON.parse(oldValue));
                    break;
                }
                case AttributeTypeEnum.number: {
                    convertedNewValue = Number(newValue);
                    convertedOldValue = Number(oldValue);
                    break;
                }
            }

            if (this.componentInstance) {
                const instance: ObjectInterface = this.componentInstance;
                instance[camelCaseName] = convertedNewValue;
                this.hooksCaller(HooksEnum.attributeChangedCallback, [name, convertedOldValue, convertedNewValue, camelCaseName]);
            } else {
                this.initialObservedAttributeValue[camelCaseName] = convertedNewValue;
                this.failedToRunAttributeChangeFunctions.push(() => this.hooksCaller(HooksEnum.attributeChangedCallback, [name, convertedOldValue, convertedNewValue, camelCaseName]));
            }
        }

        public applyInitialObservedAttributeValue() {
            const instance: ObjectInterface = this.componentInstance;
            for (const key in this.initialObservedAttributeValue) {
                instance[key] = this.initialObservedAttributeValue[key];
            }
        }
    }
}