import { removeDuplicates } from '../utils/remove-duplicates';
import { getSelector } from '../utils/get-selector';
import { ClassModuleInterface } from './interfaces/class-module.interface';
import { defineModuleComponent } from './utils/define-module-component';

function defineComponents(module: ClassModuleInterface): void {
    const components = module.config.components || [];
    const root = module.config.root;
    const exportedComponents = module.exports.components || [];
    const combinedComponents = removeDuplicates([...exportedComponents, ...components]);

    combinedComponents.forEach(component => defineModuleComponent(component, module));
    if (root) defineModuleComponent(root, module);
}

function setupChildModules(module: ClassModuleInterface) {
    (module.config.modules || []).forEach(item => {
        const mod = bootstrapModule(item);
        const setExports = (key: string) => module.childrenExports[key].push(...(mod.exports[key] || []));
        setExports('directives');
        setExports('services');
        setExports('components');
        setExports('pipes');
    });

    module.childrenExports.components.forEach(item => module.definedComponents.components[getSelector(item)] = true);
}

export function bootstrapModule(module: ClassModuleInterface): ClassModuleInterface {

    if (module.defined) return module;

    module.defined = true;
    module.exports = module.config.exports || {};
    module.definedComponents = { name: module.name, components: {} };
    module.dataSource = { data: new Map(), name: module.name };
    module.childrenExports = {
        directives: [],
        services: [],
        components: [],
        pipes: []
    };

    setupChildModules(module);
    defineComponents(module);

    return module;
}