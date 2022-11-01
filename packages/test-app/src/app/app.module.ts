import { PropsService } from "@monster-js/core";
import { Module } from "@monster-js/core/module";
import { RouterModule } from "@monster-js/router";
import { AppComponent } from "./app.component";
import { ChildComponent } from "./child.component";
import { GreetingService } from "./greeting.service";

@Module({
    modules: [RouterModule],
    components: [ChildComponent],
    services: [PropsService, GreetingService],
    root: AppComponent
})
export class AppModule { }
