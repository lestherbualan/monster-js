import { Module } from "@monster-js/core";
import { route } from "./route";
import { routerDir } from "./router.directive";
import { RouterService } from "./router.service";

export const RouterModule: Module = {
    exports: {
        components: [route],
        directives: [routerDir],
        services: [RouterService]
    }
};