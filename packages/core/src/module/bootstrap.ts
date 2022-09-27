import { createComponent } from "../component/create-component";
import { FunctionDirective } from "../directives/function-directive.interface";
import { FunctionPipe } from "../pipes/interfaces/function-pipe.interface";
import { ServiceConstructor } from "../service/interfaces/service-constructor.interface";
import { Module } from "./interfaces/module.interface";

export function bootstrap(module: Module) {
    const definedSelectors: string[] = [];
    const childModuleServices: (ServiceConstructor | [ServiceConstructor, any])[] = [];
    const childModuleDirectives: FunctionDirective[] = [];
    const childModulePipes: FunctionPipe[] = [];

    if (module.init) return;

    module.init = true;
    module.diSource = new Map();


    (module.modules || []).forEach(mod => {
        (mod.exports?.components || []).forEach(comp => {
            definedSelectors.push(comp.selector);
        });
        if (mod.root) {
            definedSelectors.push(mod.root.selector);
        }

        childModuleServices.push(...(mod.exports?.services || []));
        childModuleDirectives.push(...(mod.exports?.directives || []));
        childModulePipes.push(...(mod.exports?.pipes || []));

        bootstrap(mod);
    });


    module.pipes = [...(module.pipes || []), ...childModulePipes];
    module.directives = [...(module.directives || []), ...childModuleDirectives];


    [...(module.services || []), ...childModuleServices].forEach(service => {
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

    (module.components || []).forEach(component => {
        definedSelectors.push(component.selector);
        customElements.define(component.selector, createComponent(component, module));
    });
    
    module.definedSelectors = definedSelectors;

    if (module.root) {
        definedSelectors.push(module.root.selector);
        customElements.define(module.root.selector, createComponent(module.root, module));
    }
}