import './event-handling.component.scss';
import { Component } from '@monster-js/core';

declare const $event: any;

@Component('app-event-handling')
export class EventHandlingComponent {

    param = null;

    onClickWithParam(param: any) {
        this.param = param;
    }

    onClick() {
        console.log('hello world 124');
    }

    render() {
        return <div>
            <button id="on-click" on:click={this.onClick()}>Click Me</button>
            <button id="on-prevent-click" on-prevent:click={this.onClick()}>Click Me</button>
            <button id="with-param" on-prevent:click={this.onClickWithParam('hello world')}>Click Me</button>
            <button id="event-param" on-prevent:click={this.onClickWithParam($event)}>Click Me</button>
        </div>
    }
}
