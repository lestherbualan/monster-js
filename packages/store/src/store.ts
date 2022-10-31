import { ObjectInterface, OnReceiveConfig, Service } from '@monster-js/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DevToolActionInterface } from './interfaces/dev-tool-action.interface';
import { RawActionInterface } from './interfaces/raw-action.interface';
import { StoreConfigInterface } from './interfaces/store-config.interface';
import { StoreModuleConfigInterface } from './interfaces/store-module-config.interface';
import { objectToObservables } from './utils/object-to-observables';

const NORMAL_SET_DEVTOOL_KEY = '@STORE_SET';

@Service({ singleton: true })
export class Store<T> implements OnReceiveConfig {

    /**
     * Contains the state of the store
     * the properties of the state objects are observables
     */
    private resetData: string = '';
    private state: { [key in keyof T]: BehaviorSubject<T[key]> } = null!;
    private values: T = null!;


    private actions: ObjectInterface<(() => any)[]> = {};
    private actionKeys: ObjectInterface<keyof T> = {};

    private static enableDevTools: boolean;
    private devTool: any;

    private setupDevTool() {
        if (this.isDevToolsEnabled()) {
            this.devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
            this.devTool.subscribe((message: DevToolActionInterface) => {
                if (message.type === 'DISPATCH' && message.state) {
                    // set state here
                    const state = JSON.parse(message.state);

                    for (const key in state) {
                        this.doSet(key as any, state[key]);
                    }
                }
            });
            this.devTool.init(this.values);
        }
    }

    private isDevToolsEnabled() {
        return !!Store.enableDevTools;
    }

    public static config(config: StoreModuleConfigInterface) {
        Store.enableDevTools = !!config.enableDevTools;
        return Store;
    }

    public reset<K extends keyof T>(key?: K) {
        if (key) {
            this.set(key, JSON.parse(this.resetData)[key]);
        } else {
            this.state = objectToObservables<T>(JSON.parse(this.resetData));
        }
    }

    public onReceiveConfig(config: StoreConfigInterface<T>) {
        this.resetData = JSON.stringify(config.state);
        this.state = objectToObservables<T>(config.state as any);
        this.values = config.state;
        this.actions = config.actions || {};
        this.setupActions();
        this.setupDevTool();
    }

    private setupActions(): void {
        for (const key in this.actions) {
            this.actions[key].forEach(action => {
                const actionResult: RawActionInterface = action();
                this.actionKeys[actionResult.type] = key as keyof T;
            });
        }
    }

    public action(action: RawActionInterface) {
        const key = this.actionKeys[action.type];
        if (key === undefined) throw new Error(`The action '${action.type}' is not registered in the action array.`);
        this.doSet(key, action.reducer(this.get(key), action.data));
        this.devToolSet(action.type);
    }

    public select<K extends keyof T>(key: K): Observable<T[K]> {
        return this.state[key];
    }

    public doSet<K extends keyof T>(key: K, value: T[K]): void {
        this.values[key] = value;
        this.state[key].next(this.values[key]);
    }

    private devToolSet(actionType: string) {
        if (this.isDevToolsEnabled()) {
            this.devTool.send(actionType, this.values);
        }
    }

    public set<K extends keyof T>(key: K, value: T[K]): void {
        this.doSet(key, value);
        this.devToolSet(NORMAL_SET_DEVTOOL_KEY);
    }

    public get(key: keyof T) {
        return this.values[key];
    }
}

/**
 * action [done]
 * reducer [done]
 * store [done]
 * selector
 * async pipe
 * effects [in progress]
 */

/**
 * Added time travel debugging using redux dev tools
 */