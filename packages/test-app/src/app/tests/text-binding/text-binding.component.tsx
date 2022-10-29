import './text-binding.component.scss';
import { Component } from '@monster-js/core';

@Component('app-text-binding')
export class TextBindingComponent {
    greeting = 'Hello World';

    render() {
        return <h1>{this.greeting}</h1>
    }
}
