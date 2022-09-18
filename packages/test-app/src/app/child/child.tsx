import { component, inject } from '@monster-js/core';
import { AuthService } from '../services/auth.service';

function child() {
    const service = inject(this, AuthService);
    console.log(service);
    return <h1>child component</h1>
}

export default component(child, 'app-child');
