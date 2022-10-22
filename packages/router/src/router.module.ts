import { Module } from "@monster-js/core/module";
import { Route } from "./route.component";
import { RouterDirective } from "./router.directive";
import { RouterService } from "./router.service";

@Module({
    exports: {
        directives: [RouterDirective],
        services: [RouterService],
        components: [Route]
    }
})
export class RouterModule {}