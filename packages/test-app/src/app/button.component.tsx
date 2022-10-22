import { Attr, Component, CustomElement, PropsService, Services } from "@monster-js/core";

@Services(PropsService)
@CustomElement(HTMLButtonElement, 'button')
@Component('app-button')
export class ButtonComponent {
    @Attr
    date: number;

    constructor(private propsService: PropsService) {}

    render() {
        return <div>
            <h1>Props {this.propsService.get('date')}</h1>
            <h1>Attr {this.date}</h1>
        </div>
    }
}