import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { DevTool } from "../utils/dev-tool";

interface ChangeDetection {
    isConnected: () => boolean;
    changeDetection: () => void;
};

let state = {};
let changeDetections: ChangeDetection[] = [];


/**
 * Devtool
 */
const devTool = new DevTool();
devTool.subscribe((message) => {
    if (message.type === 'DISPATCH' && message.state) {
        const newSate = JSON.parse(message.state);

        for (const key in newSate) {
            state[key] = newSate[key];
        }

        runChangeDetections();
    }
});
devTool.init(state);

/**
 * Devtool [end]
 */


export function createSharedState<T>(name: string, value?: T) {
    state[name] = value;
    devTool.send(`Init : ${name}`, state);

    return function(context: ComponentInstance): [() => T, (value: T) => void] {
        changeDetections.push({
            isConnected: () => (context as unknown as HTMLElement).isConnected,
            changeDetection: () => context.detectChanges()
        });

        const getter = () => state[name];
        const setter = (value: T) => {
            if (value !== state[name]) {
                state[name] = value;
                runChangeDetections();

                devTool.send(`SET : ${name}`, state);

            }
        }

        return [getter, setter];
    }
}

function runChangeDetections() {
    changeDetections = changeDetections.filter(item => item.isConnected());
    changeDetections.forEach(item => item.changeDetection());
}