import './attribute-binding.component.scss';
import { Component } from '@monster-js/core';

@Component('app-attribute-binding')
export class AttributeBindingComponent {

    public id: number = 100;

    render() {
        return <h1 id={this.id}>AttributeBinding component</h1>
    }
}
