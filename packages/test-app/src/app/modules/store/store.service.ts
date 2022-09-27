import { Service } from "@monster-js/core";

@Service({ singleton: true })
export class StoreService {
    count: number = 100;
}
