import { ComponentInterface } from "@monster-js/core";
import { ClassModuleInterface } from "@monster-js/core/module";

export interface RouteInterface {
    path: string;
    component?: ComponentInterface;
    exact?: boolean;
    redirectTo?: string;
    module?: () => Promise<ClassModuleInterface>;
    guards?: any[];
}
