import '@monster-js/core/polyfill';
import { ComponentInterface } from "@monster-js/core";
import { ComponentTester } from '../component/component-tester';

export interface ComponentTesterConfigInterface {
    components?: ComponentInterface[];
    externalComponents?: string[];
}

export function createTester<T = any>(component: ComponentInterface, config: ComponentTesterConfigInterface = {}) {
    return new ComponentTester<T>(component, config);
}
