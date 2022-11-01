import './app.component.scss';
import { Component } from '@monster-js/core';
import { GreetingService } from './greeting.service';

declare const $event: any;

@Component('app-root')
export class AppComponent {

    constructor(private greetingService: GreetingService) {
        console.log(this.greetingService);
    }

    onClick(event) {
        console.log('hello world', event instanceof Event);
    }

    public render() {
        return <div>
            <h1>Hello world</h1>
            <button on:click={this.onClick($event)}>Click Me</button>
        </div>
    }
}
