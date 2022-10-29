import './event-handling.component.scss';
import { Component } from '@monster-js/core';

@Component('app-event-handling')
export class EventHandlingComponent {

    onClick() {
        console.log('hello world 124');
    }

    render() {
        return <div>
            <button id="on-click" on:click={this.onClick()}>Click Me</button>
            <button id="on-prevent-click" on-prevent:click={this.onClick()}>Click Me</button>
        </div>
    }
}
