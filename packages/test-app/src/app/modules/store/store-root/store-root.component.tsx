import { component } from '@monster-js/core';
import './store-root.component.scss';

export function storeRoot(): any {
    return <h1>Store Root</h1>
}
component(storeRoot, 'app-store-root');
