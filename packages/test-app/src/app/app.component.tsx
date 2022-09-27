import './app.component.scss';
import { component, inject } from "@monster-js/core";
import { StoreService } from './modules/store/store.service';

export function app(): any {
    const service = inject(this, StoreService);
    service.count++;
    service.count++;
    service.count++;
    const service2 = inject(this, StoreService);
    console.log(service.count);
    console.log(service2.count);

    return <h1>App component</h1>
}
component(app, 'app-root');