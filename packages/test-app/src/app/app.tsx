import { component, inject, services } from '@monster-js/core';
import { AuthService } from './services/auth.service';

function app() {
    const auth = inject(this, AuthService);
    console.log(auth);
    return <div>
        <h1>Hello World!</h1>
    </div>
}

services(app, [AuthService]);
export default component(app, 'app-root');

<style>{``}</style>