import { Attr, Component, PropsService } from "@monster-js/core";

@Component('app-child')
export class ChildComponent {
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