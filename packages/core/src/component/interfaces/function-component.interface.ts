type FunctionComponentType = (props?: { [key: string]: any; }) => HTMLElement;

export interface FunctionComponent extends FunctionComponentType {
    selector?: string;
    super?: CustomElementConstructor;
}