import { PropsService } from "@monster-js/core";
import { Module } from "@monster-js/core/module";
import { AppComponent } from "./app.component";
import { ChildComponent } from "./child.component";

@Module({
    components: [ChildComponent],
    services: [PropsService],
    root: AppComponent
})
export class AppModule { }
