import { FunctionComponent } from "../interfaces/function-component.interface";

export function _StyleFn(styles: string, fnComponent: FunctionComponent) {
    fnComponent.styles = styles;
}
