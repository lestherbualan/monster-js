import { ClassModuleInterface } from "@monster-js/core/module";
import { defineTestModule, TestModuleConfigInterface } from "./define-test-module";

export interface CreateTestModuleConfigInterface {
    externalComponents?: string[];
}

export function createTestModule(module: ClassModuleInterface, config: CreateTestModuleConfigInterface = {}) {
    const finalConfig: TestModuleConfigInterface = {
        ...(module.config),
        ...config
    };
    defineTestModule(finalConfig);
}
