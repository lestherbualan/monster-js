import { component } from '@monster-js/core';

function childComponent() {
    return <h1>childComponent component</h1>
}

export default component(childComponent, 'child-component');
