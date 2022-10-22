import { ComponentInterface, Container } from "@monster-js/core";

export function mockInjection(component: ComponentInterface, target: new (...args: any[]) => any, mock: any) {
    const container = new Container(component.dataSource!)
    container.mock(target, mock);
}
