import './dependency-injection/reflect';
import { componentFactory } from './component/component-factory';
import { ComponentInterface } from './interfaces/component-interface';
import { GlobalDataSource } from './dependency-injection/global-data-source';

declare const globalThis: any;
globalThis.GlobalDataSource = new GlobalDataSource();

/**
 * Polyfill customElements.define method
 */
const originalDefine = customElements.define;
customElements.define = function(name: string, constructor: CustomElementConstructor | any, options?: ElementDefinitionOptions) {
    const monster: ComponentInterface = constructor;
    if (monster.isMonsterComponent) constructor = componentFactory(constructor);
    originalDefine.apply(this, [name, constructor, options]);
}
