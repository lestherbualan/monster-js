import { Service } from "@monster-js/core";
import { InternalService } from "./internal.service";

@Service()
export class RouterService {

    private internalService = new InternalService();

    public navigate = this.internalService.navigate;

    public onRouteChange = this.internalService.onRouteChange;
}