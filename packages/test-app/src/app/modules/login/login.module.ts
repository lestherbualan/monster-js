import { Module } from "@monster-js/core/module";
import { LoginComponent } from "./components/login/login.component";

@Module({
    root: LoginComponent
})
export class LoginModule { }
