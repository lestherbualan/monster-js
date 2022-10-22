export interface AttributeChangeCallback {
    attributeChangedCallback(name: string, convertedOldValue: any, convertedNewValue: any, camelCaseName: string): void;
}