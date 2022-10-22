import { PropsService } from "@monster-js/core";
import { Module } from "@monster-js/core/module";
import { AppComponent } from "./app.component";
import { ButtonComponent } from "./button.component";
import { ChildComponent } from "./child.component";

@Module({
    components: [ChildComponent, ButtonComponent],
    services: [PropsService],
    root: AppComponent
})
export class AppModule { }
