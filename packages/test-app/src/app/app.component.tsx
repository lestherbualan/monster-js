import './app.component.scss';
import { Component } from '@monster-js/core';

declare const $event: any;

@Component('app-root')
export class AppComponent {

    onClick(event) {
        console.log('hello world', event);
    }

    public render() {
        return <div>
            <h1>Hello world</h1>
            <button on:click={this.onClick($event)}>Click Me</button>
        </div>
    }
}
