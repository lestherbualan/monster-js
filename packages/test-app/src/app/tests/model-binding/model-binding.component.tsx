import './model-binding.component.scss';
import { Component, Directives, ViewModelDirective } from '@monster-js/core';

@Directives(ViewModelDirective)
@Component('app-model-binding')
export class ModelBindingComponent {
    model: string = 'initial value';

    render() {
        return <div>
            <h1>{this.model}</h1>
            <input v:model={this.model} />
        </div>
    }
}
