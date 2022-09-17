import { childComponents, component, inject, registerServices } from '@monster-js/core';
import child from './child/child';
import { AuthService } from './services/auth.service';

function app() {
    return <div>
        <h1>Hello World!</h1>
        <app-child></app-child>
    </div>
}

registerServices(app, [AuthService]);
childComponents(app, [child]);
export default component(app, 'app-root');

<style>{``}</style>