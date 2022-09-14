import { component, defineComponent } from '@monster-js/core';

function child() {
    return <h1>Child</h1>
}

defineComponent(component(child, 'app-child'));

function app() {
    let id = 100;
    return <div>
        <h1 id={id}>Hello World!</h1>
        <app-child></app-child>
    </div>
}

export default component(app, 'app-root');
