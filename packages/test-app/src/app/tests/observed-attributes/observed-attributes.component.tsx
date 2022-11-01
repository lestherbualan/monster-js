import './observed-attributes.component.scss';
import { Attr, AttrBoolean, AttributeChangeCallback, AttrNumber, Component } from '@monster-js/core';

@Component('app-observed-attributes')
export class ObservedAttributesComponent implements AttributeChangeCallback {

    @Attr
    stringAttr: string = 'initial value';

    @AttrBoolean
    booleanAttr: boolean = true;

    @AttrNumber
    numberAttr: number = 0;

    name: string = '';
    camelCaseName: string = '';
    convertedOldValue: any = null;
    convertedNewValue: any = null;

    attributeChangedCallback(name: string, convertedOldValue: any, convertedNewValue: any, camelCaseName: string): void {
        
    }

    render() {
        return <h1>ObservedAttributes component</h1>
    }
}
