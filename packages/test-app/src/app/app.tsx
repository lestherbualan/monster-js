import { component, defineComponent } from '@monster-js/core';
import { environment } from '../environments/environment';

function child() {
    return <h1>Child</h1>
}

defineComponent(component(child, 'app-child'));

function app() {
    let id = 100;
    return <div>
        <h1 id={id}>Hello World!</h1>
        {environment.title} xx
        <app-child></app-child>
    </div>
}

export default component(app, 'app-root');
