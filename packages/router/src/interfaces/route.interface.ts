import { MonsterWebComponent } from "@monster-js/core";
import { FunctionGuard } from "../types/function-guard.type";

export interface Route {
    component: MonsterWebComponent;
    lazyComponent: () => Promise<MonsterWebComponent>;
    path: string;
    exact: boolean;
    redirectTo: string;
    guards: FunctionGuard[];
}
