import './app.component.scss';
import { Component } from '@monster-js/core';
import { GreetingService } from './greeting.service';

declare const $event: any;

@Component('app-root')
export class AppComponent {

    onClick(event) {
        console.log('hello world', event instanceof Event);
    }

    public render() {
        return <div>
            <h1>Hello world</h1>
            <button on:click={this.onClick($event)}>Click Me</button>
            <app-route
                prop:path="/login"
                prop:module={import('./modules/login/login.module').then(m => m.LoginModule)}
            ></app-route>
        </div>
    }
}
