import { ComponentInstance } from "@monster-js/core";

interface FunctionGuardReturn {
    canActivate?: () => boolean | Promise<boolean>;
    canDeactivate?: () => boolean | Promise<boolean>;
}

export type FunctionGuard = (context: ComponentInstance) => FunctionGuardReturn;