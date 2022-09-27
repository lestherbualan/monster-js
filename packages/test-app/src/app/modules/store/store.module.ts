import { Module } from "@monster-js/core";
import { uppercasePipe } from "./pipes/uppercase.pipe";
import { storeRoot } from "./store-root/store-root.component";
import { StoreService } from "./store.service";

export const StoreModule: Module = {
    components: [storeRoot],
    exports: {
        components: [storeRoot],
        services: [StoreService],
        pipes: [uppercasePipe],
    }
};
