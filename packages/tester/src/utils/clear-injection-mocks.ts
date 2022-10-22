import { ComponentInterface, Container } from "@monster-js/core";

export function clearInjectionMocks(component: ComponentInterface) {
    const di = new Container(component.dataSource!);
    for (let [key] of component.dataSource!.data) {
        const source = di.getSource(key);
        di.update(key, {
            ...source,
            mock: null
        });
    }
}
