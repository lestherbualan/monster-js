import { ObjectInterface, OnReceiveParent, Service } from "@monster-js/core";
import { Observable } from "rxjs";
import { InternalService } from "./utils/internal.service";

@Service()
export class RouterService implements OnReceiveParent {

    private internalService: InternalService = new InternalService();

    public navigate = this.internalService.navigate;
    public onRouteChange: Observable<any> = this.internalService.onRouteChange;

    constructor() {
        this.params = this.params.bind(this);
    }

    /**
     * For component props
     */
    private parentInstance: any;
    onReceiveParent(parent: any): void {
        this.parentInstance = parent;
    }

    public params(): ObjectInterface<string>;
    public params(key?: string): string;
    public params(key?: string) {
        const paramCaller = this.parentInstance?.$wrapper?.$propsData?.params;
        if (paramCaller) {
            if (key) {
                return paramCaller()[key];
            } else {
                return paramCaller();
            }
        } else {
            return null;
        }
    }

}