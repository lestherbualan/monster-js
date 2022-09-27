import './app.component.scss';
import { component } from "@monster-js/core";

export function app(): any {
    return <div>
        <h1>App component {'Sample Text' | uppercase}</h1>
        <app-store-root></app-store-root>
    </div>
}
component(app, 'app-root');