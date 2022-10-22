import { GlobalComponents } from '@monster-js/core';
import '@monster-js/core/polyfill';
import { Module, ModuleConfigInterface } from "@monster-js/core/module";
import { CreateTestModuleConfigInterface } from './create-test-module';

export interface TestModuleConfigInterface extends ModuleConfigInterface, CreateTestModuleConfigInterface { }

export function defineTestModule(config: TestModuleConfigInterface) {
    const testModule = class {};
    Module(config)(testModule);
    new testModule();

    /**
     * define external components
     */
    const gc = new GlobalComponents();
    (config.externalComponents || []).forEach(key => {
        gc.add(key);
    });
}
