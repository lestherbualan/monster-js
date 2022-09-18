import { globalDi, MonsterWebComponent } from "@monster-js/core";
import { DIDataSource } from "@monster-js/core/src/interfaces/di-data-source.interface";
import { ServiceInterface } from "@monster-js/core/src/interfaces/service.interface";

function setMock(dataSource: Map<any, DIDataSource>, mockData: any, service: any) {
    const data = (dataSource || new Map()).get(service);
    if (data) {
        data.mock = mockData;
        dataSource.set(service, data);
    }
}

export function provideMock(service: ServiceInterface, mockData: any, component?: MonsterWebComponent) {
    if (component) {
        setMock(component.dataSource, mockData, service);
        setMock(component.parentDataSource, mockData, service);
    }

    setMock(globalDi.dataSource, mockData, service);
}
