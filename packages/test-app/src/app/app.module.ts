import { PropsService } from "@monster-js/core";
import { Module } from "@monster-js/core/module";
import { AppComponent } from "./app.component";
import { ChildComponent } from "./child.component";
import { GreetingService } from "./greeting.service";

@Module({
    components: [ChildComponent],
    services: [PropsService, GreetingService],
    root: AppComponent
})
export class AppModule { }
