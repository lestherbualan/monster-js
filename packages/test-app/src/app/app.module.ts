import { Module } from "@monster-js/core";
import { app } from "./app.component";
import { uppercasePipe } from "./modules/store/pipes/uppercase.pipe";
import { StoreModule } from "./modules/store/store.module";

export const AppModule: Module = {
    modules: [StoreModule],
    root: app,
};