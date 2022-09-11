import { CustomObject } from "../interfaces/custom-object.interface";

export class DevTool {
    private static instance;

    private devTool;

    constructor() {
        if (DevTool.instance) {
            return DevTool.instance;
        }

        if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
            this.devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
        }

        DevTool.instance = this;
    }

    subscribe(handler: (message?: any) => void) {
        if (this.devTool) {
            this.devTool.subscribe(handler);
        }
    }

    init(state: CustomObject) {
        if (this.devTool) {
            this.devTool.init(state);
        }
    }

    send(action: string, state: CustomObject) {
        if (this.devTool) {
            this.devTool.send(action, state);
        }
    }
}