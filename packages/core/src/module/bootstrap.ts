import { createComponent } from "../component/create-component";
import { ServiceConstructor } from "../service/interfaces/service-constructor.interface";
import { Module } from "./interfaces/module.interface";

export function bootstrap(module: Module) {
    if (module.init) return;

    module.init = true;
    module.diSource = new Map();

    (module.services || []).forEach(service => {
        let serviceCls: ServiceConstructor = service as ServiceConstructor;
        let config: any;
        if (Array.isArray(service)) {
            [ serviceCls, config ] = service;
        }
        module.diSource.set(serviceCls, {
            target: serviceCls,
            config: config,
            singleton: serviceCls.singleton
        });
    });

    (module.components || []).forEach(component => customElements.define(component.selector, createComponent(component, module)));
    customElements.define(module.root.selector, createComponent(module.root, module));
}