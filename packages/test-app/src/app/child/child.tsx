import { component, inject, registerServices } from '@monster-js/core';
import { AuthService, HttpService } from '../services/auth.service';

function child() {
    const service = inject(this, AuthService);
    console.log(service);
    return <h1>child component</h1>
}

registerServices(child, [HttpService]);
export default component(child, 'app-child');
