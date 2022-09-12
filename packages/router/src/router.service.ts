import { InternalService } from "./internal.service";

export class RouterService {

    private internalService = new InternalService();

    public navigate = this.internalService.navigate;

    public onRouteChange = this.internalService.onRouteChange;
}